import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import VerEx from 'verbal-expressions';
import NameInput from '@/pages/components/docs/add/DocsNameInput';
import VersionInput from './components/docs/add/VersionInput';
import UrlInput from './components/docs/add/UrlInput';
import TagInput from './components/docs/add/TagInput';

export default function Add_Docs() {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('discord');
    }
  }, [status]);

  const handleTagChange = selectedTags => {
    setTag(selectedTags);
  };

  const [tag, setTag] = useState([]);
  const [edition, setEdition] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  // URL 정규식
  const Web = VerEx().startOfLine().then('http').maybe('s').then('://').maybe('www.').anythingBut(' ').endOfLine();

  const getMultipleVersionsLabel = () => {
    if (selectedVersion?.type === 'multiple') {
      const selectedVersions = selectedVersion.multipleVersions.map(version => version.label);
      const additionalCount = selectedVersion.multipleVersions.length - 1;
      return `${selectedVersions[0]} 외 ${additionalCount}개`;
    }
    return '';
  };

  const handleComplete = () => {
    setIsSaveButtonDisabled(true);
    let check_version = false;
    let check_edition = false;
    let check_tag = false;
    let check_url = false;
    let check_name = false;
    let url = [];

    // 버전 확인
    if (selectedVersion == null) {
      alert('버전을 설정해주세요!');
      check_version = false;
    } else {
      // Check for "multiple" case
      if (selectedVersion.type === 'multiple') {
        if (selectedVersion.multipleVersions.length < 2) {
          alert('다중 버전을 선택할 때는 최소 2개 이상을 선택해주세요!');
          check_version = false;
          setIsSaveButtonDisabled(false);
        } else {
          check_version = true;
        }
      }
      // Check for "range" case
      else if (selectedVersion.type === 'range') {
        const minVersionValue = parseInt(selectedVersion.minVersion.value);
        const maxVersionValue = parseInt(selectedVersion.maxVersion.value);
        if (minVersionValue >= maxVersionValue) {
          alert('최소 버전이 최대 버전보다 높거나 같을 수 없습니다!');
          check_version = false;
          setIsSaveButtonDisabled(false);
        } else {
          check_version = true;
        }
      }

      // Check for "single" case
      else {
        check_version = true;
      }
    }

    // 에디션 확인
    if (edition == null) {
      alert('에디션을 설정해주세요!');
      check_edition = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_edition = true;
    }

    // 태그 확인
    if (tag == null) {
      alert('장르를 설정해주세요!');
      check_tag = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_tag = true;
    }

    // URL 확인
    if (document.querySelector('#UrlList').children.length == 0) {
      check_url = true;
    } else if (document.querySelector('#UrlName').value == '') {
      alert('링크 이름을 입력해주세요!');
      check_url = false;
      setIsSaveButtonDisabled(false);
    } else if (Web.test(document.querySelector('#UrlLink').value) == false) {
      alert('링크 주소를 URL 형식으로 입력해주세요!');
      check_url = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_url = true;
      let url_name = Array.from(document.querySelectorAll('#UrlName')).map(url => url.value);
      let url_link = Array.from(document.querySelectorAll('#UrlLink')).map(url => url.value);
      for (let i = 0; i < url_name.length; i++) {
        url.push({ name: url_name[i], link: url_link[i] });
      }
    }

    // 이름 확인
    if (document.querySelector('#Name').value == '') {
      alert('이름을 입력해주세요!');
      check_name = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_name = true;
    }

    // 최종 확인
    if (check_version && check_edition && check_tag && check_url && check_name) {
      let versionLabel;
      let multipleVersions;

      if (selectedVersion.type === 'single') {
        versionLabel = selectedVersion.singleVersion.label;
      } else if (selectedVersion.type === 'multiple') {
        multipleVersions = selectedVersion.multipleVersions.map(version => version.label);
        versionLabel = getMultipleVersionsLabel();
      } else if (selectedVersion.type === 'range') {
        versionLabel = `${selectedVersion.minVersion.label} ~ ${selectedVersion.maxVersion.label}`;
      }

      const doc = {
        name: document.querySelector('#Name').value,
        version: versionLabel,
        multiple: multipleVersions,
        edition: edition,
        tag: tag.map(t => t.value),
        url: url,
      };

      axios
        .post('/api/docs/addDocsDB', doc)
        .then(response => {
          console.log(response);
          alert('독스 추가가 완료되었습니다!');
          return axios.post('/api/addLogsDB', {
            type: 'add_docs',
            data: {
              doc,
            },
            session: session,
          });
        })
        .then(response => {
          console.log(response);
          router.replace('/');
        })
        .catch(error => {
          console.log(error);
          alert('독스 추가에 실패했습니다!');
        })
        .finally(() => {
          setIsSaveButtonDisabled(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>독스 추가하기</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div className="grid gap-4 grid-rows-auto grid-cols-1">
            <NameInput />

            <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
              <VersionInput
                selectedVersion={selectedVersion}
                setSelectedVersion={setSelectedVersion}
                edition={edition}
                setEdition={setEdition}
              />
              <TagInput onTagChange={handleTagChange} />
            </div>

            <UrlInput />

            <div className="flex justify-end items-center mt-8 w-auto">
              <div className="flex items-center">
                <button
                  className="font-bold text-lg bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
                  onClick={() => router.replace('/')}
                >
                  취소
                </button>
                <button
                  className="font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 transition-all rounded-lg"
                  onClick={handleComplete}
                  disabled={isSaveButtonDisabled}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
