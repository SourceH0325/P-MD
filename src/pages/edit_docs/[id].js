import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Select from 'react-tailwindcss-select';
import axios from 'axios';
import VerEx from 'verbal-expressions';
import DocsNameInput from '@/pages/components/docs/edit/DocsNameInput';
import TagInput from '@/pages/components/docs/edit/TagInput';
import UrlInput from '@/pages/components/docs/edit/UrlInput';
import VersionInput from '../components/docs/edit/VersionInput';

export default function Edit_Docs() {
  const router = useRouter();

  const id = router.query.id;
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('discord');
    }
  }, [status]);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/docs/callDocsDB/${id}`)
        .then(res => {
          setDocs(res.data.result);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  const versionLabel = docs.map(doc => doc.version);

  const tagVaBel = docs.map(doc => doc.tag);

  const editionValue = docs.map(doc => doc.edition);

  useEffect(() => {
    setTag(tagVaBel.map(tag => tag.map(t => ({ value: t, label: t }))).flat());
    setSelectedVersion({ label: versionLabel[0] });
    setEdition(editionValue[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docs]);

  // 태그, 버전 선택
  const [tag, setTag] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [edition, setEdition] = useState(null);

  const handleChange_tag = value => {
    setTag(value);
  };

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
      setIsSaveButtonDisabled(false);
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
        multipleVersions = null;
      } else if (selectedVersion.type === 'multiple') {
        multipleVersions = selectedVersion.multipleVersions.map(version => version.label);
        versionLabel = getMultipleVersionsLabel();
      } else if (selectedVersion.type === 'range') {
        versionLabel = `${selectedVersion.minVersion.label} ~ ${selectedVersion.maxVersion.label}`;
        multipleVersions = null;
      }

      const doc = {
        name: document.querySelector('#Name').value,
        version: versionLabel,
        multiple: multipleVersions,
        edition: edition,
        tag: tag.map(t => t.value),
        url: url,
      };

      setIsSaveButtonDisabled(true);
      axios
        .put(`/api/docs/editDocsDB/${id}`, doc)
        .then(res => {
          console.log(res);
          alert('독스 편집이 완료되었습니다!');
          return axios.post('/api/addLogsDB', {
            type: 'edit_docs',
            data: {
              doc,
            },
            session: session,
          });
        })
        .then(res => {
          console.log(res);
          router.replace(`/docs/${id}`);
        })
        .catch(err => {
          console.log(err);
          alert('독스 편집에 실패했습니다!');
        })
        .finally(() => {
          setIsSaveButtonDisabled(false);
        });
    }
  };

  const handleDelete = () => {
    const result = prompt('독스 삭제 신청을 하시려면 이유를 적어주세요!');

    if (result == null) {
      return;
    } else if (result == '') {
      alert('독스 삭제 신청을 하시려면 이유를 적어주세요!');
      return;
    } else {
      axios
        .post(`/api/docs/deleteDocsDB/${id}`, {
          reason: result,
          session: session,
        })
        .then(res => {
          console.log(res);
          alert('독스 삭제 신청이 완료되었습니다!');
        })
        .then(res => {
          console.log(res);
          router.replace(`/docs/${id}`);
        })
        .catch(err => {
          console.log(err);
          alert('독스 삭제 신청에 실패했습니다!');
        });
    }
  };

  return (
    <>
      <Head>
        <title>독스 편집하기</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading ? (
        <div className="loader-container">
          <div className="loader" />
        </div>
      ) : (
        <div className="mx-4 mobile:mx-0">
          <main className="mb-12">
            <div className="grid gap-4 grid-rows-auto grid-cols-1">
              <DocsNameInput defaultValue={docs.map(doc => doc.name)} />

              <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
                <VersionInput
                  selectedVersion={selectedVersion}
                  setSelectedVersion={setSelectedVersion}
                  edition={edition}
                  setEdition={setEdition}
                />

                <TagInput tag={tag} setTag={setTag} onTagChange={handleChange_tag} />
              </div>

              <UrlInput docs={docs} />
              <div className="flex justify-between items-center mt-4 w-auto">
                <div>
                  <button
                    className="font-bold text-lg bg-red-600 hover:bg-red-700 transition-all px-4 py-2 transition-all rounded-lg"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    className="font-bold text-lg bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
                    onClick={() => router.replace(`/docs/${id}`)}
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
      )}
    </>
  );
}
