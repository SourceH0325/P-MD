import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import axios from 'axios';
import VerEx from 'verbal-expressions';
import NameInput from '@/pages/components/docs/add/AddNameInput';
import AddressInput from '@/pages/components/docs/add/AddAddressInput';
import ExplanationInput from '@/pages/components/docs/add/AddExplanationInput';
import VersionInput from '@/pages/components/docs/add/AddVersionInput';
import UrlInput from '@/pages/components/docs/add/AddUrlInput';
import TagInput from '@/pages/components/docs/add/AddTagInput';

export default function Add_Docs() {
  const version_options = [
    {
      label: '버전',
      options: [
        { value: 100, label: '1.0' },
        { value: 101, label: '1.1' },
        { value: 125, label: '1.2.5' },
        { value: 131, label: '1.3.1' },
        { value: 132, label: '1.3.2' },
        { value: 142, label: '1.4.2' },
        { value: 144, label: '1.4.4' },
        { value: 145, label: '1.4.5' },
        { value: 146, label: '1.4.6' },
        { value: 147, label: '1.4.7' },
        { value: 151, label: '1.5.1' },
        { value: 152, label: '1.5.2' },
        { value: 160, label: '1.6.x' },
        { value: 161, label: '1.6.1' },
        { value: 162, label: '1.6.2' },
        { value: 164, label: '1.6.4' },
        { value: 170, label: '1.7.x' },
        { value: 172, label: '1.7.2' },
        { value: 173, label: '1.7.3' },
        { value: 174, label: '1.7.4' },
        { value: 175, label: '1.7.5' },
        { value: 176, label: '1.7.6' },
        { value: 177, label: '1.7.7' },
        { value: 178, label: '1.7.8' },
        { value: 179, label: '1.7.9' },
        { value: 1710, label: '1.7.10' },
        { value: 1800, label: '1.8.x' },
        { value: 1810, label: '1.8' },
        { value: 1820, label: '1.8.1' },
        { value: 1830, label: '1.8.2' },
        { value: 1840, label: '1.8.3' },
        { value: 1850, label: '1.8.4' },
        { value: 1860, label: '1.8.5' },
        { value: 1870, label: '1.8.6' },
        { value: 1880, label: '1.8.7' },
        { value: 1890, label: '1.8.8' },
        { value: 1891, label: '1.8.9' },
        { value: 1900, label: '1.9.x' },
        { value: 1910, label: '1.9' },
        { value: 1920, label: '1.9.1' },
        { value: 1930, label: '1.9.2' },
        { value: 1940, label: '1.9.3' },
        { value: 1950, label: '1.9.4' },
        { value: 11000, label: '1.10.x' },
        { value: 11010, label: '1.10' },
        { value: 11020, label: '1.10.1' },
        { value: 11030, label: '1.10.2' },
        { value: 11100, label: '1.11.x' },
        { value: 11110, label: '1.11' },
        { value: 11120, label: '1.11.1' },
        { value: 11130, label: '1.11.2' },
        { value: 11200, label: '1.12.x' },
        { value: 11210, label: '1.12' },
        { value: 11220, label: '1.12.1' },
        { value: 11230, label: '1.12.2' },
        { value: 11300, label: '1.13.x' },
        { value: 11310, label: '1.13' },
        { value: 11320, label: '1.13.1' },
        { value: 11330, label: '1.13.2' },
        { value: 11400, label: '1.14.x' },
        { value: 11410, label: '1.14' },
        { value: 11420, label: '1.14.1' },
        { value: 11430, label: '1.14.2' },
        { value: 11440, label: '1.14.3' },
        { value: 11450, label: '1.14.4' },
        { value: 11500, label: '1.15.x' },
        { value: 11510, label: '1.15' },
        { value: 11520, label: '1.15.1' },
        { value: 11530, label: '1.15.2' },
        { value: 11600, label: '1.16.x' },
        { value: 11610, label: '1.16.1' },
        { value: 11620, label: '1.16.2' },
        { value: 11630, label: '1.16.3' },
        { value: 11640, label: '1.16.4' },
        { value: 11650, label: '1.16.5' },
        { value: 11700, label: '1.17.x' },
        { value: 11710, label: '1.17' },
        { value: 11720, label: '1.17.1' },
        { value: 11800, label: '1.18.x' },
        { value: 11810, label: '1.18' },
        { value: 11820, label: '1.18.1' },
        { value: 11830, label: '1.18.2' },
        { value: 11900, label: '1.19.x' },
        { value: 11910, label: '1.19' },
        { value: 11920, label: '1.19.1' },
        { value: 11930, label: '1.19.2' },
        { value: 11940, label: '1.19.3' },
        { value: 11950, label: '1.19.4' },
        { value: 12000, label: '1.20.x' },
        { value: 12010, label: '1.20' },
        { value: 12020, label: '1.20.1' },
        { value: 12030, label: '1.20.2' },
        { value: 12040, label: '1.20.3' },
        { value: 12050, label: '1.20.4' },
      ],
    },
  ];

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

  const getRangeVersionsLabel = () => {
    if (selectedVersion?.type === 'range') {
      const allVersions = version_options[0].options;

      const minVersion = selectedVersion.minVersion.value;
      const maxVersion = selectedVersion.maxVersion.value;

      const rangeVersions = allVersions.filter(version => {
       
      const rangeVersionsLabel = rangeVersions.map(version => version.label);

      return rangeVersionsLabel;
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
      let rangeVersions;

      if (selectedVersion.type === 'single') {
        versionLabel = selectedVersion.singleVersion.label;
        multipleVersions = null;
      } else if (selectedVersion.type === 'multiple') {
        multipleVersions = selectedVersion.multipleVersions.map(version => version.label);
        versionLabel = getMultipleVersionsLabel();
      } else if (selectedVersion.type === 'range') {
        versionLabel = `${selectedVersion.minVersion.label} ~ ${selectedVersion.maxVersion.label}`;
        rangeVersions = getRangeVersionsLabel();
        multipleVersions = null;
      }

      const doc = {
        name: document.querySelector('#Name').value,
        explanation: document.querySelector('#Explanation').value,
        address: document.querySelector('#Address').value,
        version: versionLabel,
        multiple: multipleVersions,
        range: rangeVersions,
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
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div className="grid gap-4 grid-rows-auto grid-cols-1">
            <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
              <NameInput />
              <AddressInput />
            </div>

            <ExplanationInput />

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
