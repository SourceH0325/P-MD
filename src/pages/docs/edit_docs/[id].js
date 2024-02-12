import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import VerEx from 'verbal-expressions';
import Loading from '@/pages/components/load/EditDocsLoad';
import NameInput from '@/pages/components/docs/edit/EditNameInput';
import AddressInput from '../../components/docs/edit/EditAddressInput';
import ExplanationInput from '@/pages/components/docs/edit/EditExplanationInput';
import TagInput from '@/pages/components/docs/edit/EditTagInput';
import UrlInput from '@/pages/components/docs/edit/EditUrlInput';
import VersionInput from '@/pages/components/docs/edit/EditVersionInput';

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
          console.log(res.data.result);
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
    setIsSaveButtonDisabled(true);

    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다!');
      setIsSaveButtonDisabled(false);
      return;
    }

    let check_version = false;
    let check_edition = false;
    let check_tag = false;
    let check_url = false;
    let check_name = false;
    let check_explanation = false;
    let check_address = false;
    let url = [];
    let errMessages = [];

    // 버전 확인
    if (selectedVersion == null) {
      errMessages.push('버전');
      check_version = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_version = true;
    }

    // 에디션 확인
    if (edition == null) {
      errMessages.push('에디션');
      check_edition = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_edition = true;
    }

    // 태그 확인
    if (tag == null) {
      errMessages.push('태그');
      check_tag = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_tag = true;
    }

    // URL 확인
    if (document.querySelector('#UrlList').children.length == 0) {
      check_url = true;
    } else if (document.querySelector('#UrlName').value == '') {
      errMessages.push('링크 이름');
      check_url = false;
      setIsSaveButtonDisabled(false);
    } else if (Web.test(document.querySelector('#UrlLink').value) == false) {
      errMessages.push('링크 주소');
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
      errMessages.push('이름');
      check_name = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_name = true;
    }

    // 설명 확인
    if (document.querySelector('#Explanation').value == '') {
      errMessages.push('설명');
      check_explanation = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_explanation = true;
    }

    // 주소 확인
    if (document.querySelector('#Address').value == '') {
      errMessages.push('주소');
      check_address = false;
      setIsSaveButtonDisabled(false);
    } else {
      check_address = true;
    }

    if (errMessages.length > 0) {
      alert(`${errMessages.join(', ')}를 입력해주세요!`);
      setIsSaveButtonDisabled(false);
    }

    // 최종 확인
    if (check_version && check_edition && check_tag && check_url && check_name && check_explanation && check_address) {
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
        id: id,
        name: document.querySelector('#Name').value,
        explanation: document.querySelector('#Explanation').value,
        address: document.querySelector('#Address').value,
        version: versionLabel,
        multiple: multipleVersions,
        edition: edition,
        tag: tag.map(t => t.value),
        url: url,
      };

      axios
        .put(`/api/docs/editDocsDB/${id}`, doc)
        .then(res => {
          console.log(res);
          alert('독스 편집이 완료되었습니다!');
          return axios.post('/api/addHistoryDB', {
            type: 'edit_docs',
            data: {
              docs: doc,
            },
            user: session.user.name,
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
      </Head>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-4 mobile:mx-0">
          <main className="mb-12">
            <div className="grid gap-4 grid-rows-auto grid-cols-1">
              <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
                <NameInput defaultValue={docs.map(doc => doc.name)} />
                <AddressInput defaultValue={docs.map(doc => doc.address)} />
              </div>

              <ExplanationInput defaultValue={docs.map(doc => doc.explanation)} />

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
                    className="font-bold text-lg bg-red-600 hover:bg-red-700 px-4 py-2 transition-all rounded-lg"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    className="font-bold text-lg bg-gray-600 hover:bg-gray-700 px-4 py-2 transition-all mr-2 rounded-lg"
                    onClick={() => router.replace(`/docs/${id}`)}
                  >
                    취소
                  </button>
                  <button
                    className="font-bold text-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-all rounded-lg"
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
