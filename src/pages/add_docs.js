import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import Select from 'react-tailwindcss-select';
import axios from 'axios';
import VerEx from 'verbal-expressions';

export default function Add_Docs() {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('discord');
    }
  }, [status]);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  // 태그 옵션
  const tag_options = [
    {
      label: '장르',
      options: [
        { value: '건축', label: '건축' },
        { value: '경제', label: '경제' },
        { value: '마인팜', label: '마인팜' },
        { value: 'mcMMO', label: 'mcMMO' },
        { value: '미니게임', label: '미니게임' },
        { value: '바닐라', label: '바닐라' },
        { value: '반야생', label: '반야생' },
        { value: 'PVP', label: 'PVP' },
        { value: '스카이블럭', label: '스카이블럭' },
        { value: '약탈', label: '약탈' },
        { value: '야생', label: '야생' },
        { value: '타우니', label: '타우니' },
        { value: '포켓몬', label: '포켓몬' },
        { value: 'RPG', label: 'RPG' },
      ],
    },
  ];

  // 최대 버전 옵션
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
        { value: 161, label: '1.6.1' },
        { value: 162, label: '1.6.2' },
        { value: 164, label: '1.6.4' },
        { value: 172, label: '1.7.2' },
        { value: 173, label: '1.7.3' },
        { value: 174, label: '1.7.4' },
        { value: 175, label: '1.7.5' },
        { value: 176, label: '1.7.6' },
        { value: 177, label: '1.7.7' },
        { value: 178, label: '1.7.8' },
        { value: 179, label: '1.7.9' },
        { value: 1710, label: '1.7.10' },
        { value: 180, label: '1.8' },
        { value: 181, label: '1.8.1' },
        { value: 182, label: '1.8.2' },
        { value: 183, label: '1.8.3' },
        { value: 184, label: '1.8.4' },
        { value: 185, label: '1.8.5' },
        { value: 186, label: '1.8.6' },
        { value: 187, label: '1.8.7' },
        { value: 188, label: '1.8.8' },
        { value: 189, label: '1.8.9' },
        { value: 190, label: '1.9' },
        { value: 191, label: '1.9.1' },
        { value: 192, label: '1.9.2' },
        { value: 193, label: '1.9.3' },
        { value: 194, label: '1.9.4' },
        { value: 1100, label: '1.10' },
        { value: 1101, label: '1.10.1' },
        { value: 1102, label: '1.10.2' },
        { value: 1110, label: '1.11' },
        { value: 1111, label: '1.11.1' },
        { value: 1112, label: '1.11.2' },
        { value: 1120, label: '1.12' },
        { value: 1121, label: '1.12.1' },
        { value: 1122, label: '1.12.2' },
        { value: 1130, label: '1.13' },
        { value: 1131, label: '1.13.1' },
        { value: 1132, label: '1.13.2' },
        { value: 1140, label: '1.14' },
        { value: 1141, label: '1.14.1' },
        { value: 1142, label: '1.14.2' },
        { value: 1143, label: '1.14.3' },
        { value: 1144, label: '1.14.4' },
        { value: 1150, label: '1.15' },
        { value: 1151, label: '1.15.1' },
        { value: 1152, label: '1.15.2' },
        { value: 1161, label: '1.16.1' },
        { value: 1162, label: '1.16.2' },
        { value: 1163, label: '1.16.3' },
        { value: 1164, label: '1.16.4' },
        { value: 1165, label: '1.16.5' },
        { value: 1170, label: '1.17' },
        { value: 1171, label: '1.17.1' },
        { value: 1180, label: '1.18' },
        { value: 1181, label: '1.18.1' },
        { value: 1182, label: '1.18.2' },
        { value: 1190, label: '1.19' },
        { value: 1191, label: '1.19.1' },
        { value: 1192, label: '1.19.2' },
        { value: 1193, label: '1.19.3' },
        { value: 1194, label: '1.19.4' },
        { value: 1201, label: '1.20.1' },
      ],
    },
  ];

  // 태그, 버전 선택
  const [tag, settag] = useState(null);
  const [version, setversion] = useState(null);
  const [edition, setedition] = useState(null);

  const handleChange_version = value => {
    setversion(value);
  };

  const handleChange_tag = value => {
    settag(value);
  };

  // 링크 추가
  const handleAddUrl = () => {
    const url = document.querySelector('#UrlList');
    const url_div = document.createElement('div');
    const url_link = document.createElement('input');
    const url_name = document.createElement('input');

    if (url.childElementCount >= 5) {
      alert('링크는 최대 5개까지 추가할 수 있습니다!');
      return;
    }

    url_div.setAttribute('id', 'UrlID');
    url_div.setAttribute('class', 'grid gap-0 grid-rows-auto grid-cols-1 mobile:grid-cols-2 mobile:gap-4');

    url_name.setAttribute('type', 'text');
    url_name.setAttribute('id', 'UrlName');
    url_name.setAttribute('maxlength', '5');
    url_name.setAttribute('class', 'mt-4 px-2.5 pb-1 w-full h-12 bg-[#0d1117] text-left text-white rounded-lg');
    url_name.setAttribute('placeholder', '예: 마인독스');

    url_link.setAttribute('type', 'text');
    url_link.setAttribute('id', 'UrlLink');
    url_link.setAttribute('class', 'mt-4 px-2.5 pb-1 w-full h-12 bg-[#0d1117] text-left text-white rounded-lg');
    url_link.setAttribute('placeholder', '예: https://example.com');

    url_name.addEventListener('input', () => {
      const inputText = url_name.value.trim();
      const validText = inputText.replace(/\s/g, ''); // 공백 제거

      if (validText.length > 5) {
        url_name.value = validText.slice(0, 5);
      } else {
        url_name.value = validText;
      }
    });

    if (url) {
      url.appendChild(url_div);
      url_div.appendChild(url_name);
      url_div.appendChild(url_link);
    }
  };

  const handleRemoveUrl = () => {
    const url = document.querySelector('#UrlList');
    if (url.childElementCount == 0) {
      return;
    } else {
      url.removeChild(url.lastChild);
    }
  };

  const handleEditionChange = event => {
    setedition(event.target.value);
  };

  // URL 정규식
  const Web = VerEx().startOfLine().then('http').maybe('s').then('://').maybe('www.').anythingBut(' ').endOfLine();

  const handleComplete = () => {
    setIsSaveButtonDisabled(true);
    let check_version = false;
    let check_edition = false;
    let check_tag = false;
    let check_url = false;
    let check_name = false;
    let url = [];

    // 버전 확인
    if (version == null) {
      alert('버전을 설정해주세요!');
      check_version = false;
    } else {
      check_version = true;
    }

    // 에디션 확인
    if (edition == null) {
      alert('에디션을 설정해주세요!');
      check_edition = false;
    } else {
      check_edition = true;
    }

    // 태그 확인
    if (tag == null) {
      alert('장르를 설정해주세요!');
      check_tag = false;
    } else {
      check_tag = true;
    }

    // URL 확인
    if (document.querySelector('#UrlList').children.length == 0) {
      check_url = true;
    } else if (document.querySelector('#UrlName').value == '') {
      alert('링크 이름을 입력해주세요!');
      check_url = false;
    } else if (Web.test(document.querySelector('#UrlLink').value) == false) {
      alert('링크 주소를 URL 형식으로 입력해주세요!');
      check_url = false;
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
    } else {
      check_name = true;
    }

    // 최종 확인
    if (
      check_version == true &&
      check_edition == true &&
      check_tag == true &&
      check_url == true &&
      check_name == true
    ) {
      const doc = {
        name: document.querySelector('#Name').value,
        version: version.label,
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
            <div className="bg-[#141920] rounded-lg p-5">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">이름을 설정해 주세요!</h1>
                <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 1</h1>
              </div>
              <p className="mt-3 text-lg text-gray-500 font-bold">메인에 뜰 이름을 설정합니다.</p>
              <input
                className="mt-4 px-2.5 pb-1 w-full h-12 bg-[#0d1117] text-left text-white rounded-lg"
                id="Name"
                type="text"
                placeholder="예시: 마인 독스"
              />
            </div>

            <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
              <div className="bg-[#141920] rounded-lg p-5">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold">버전을 설정해 주세요!</h1>
                  <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 2</h1>
                </div>
                <p className="mt-3 text-lg text-gray-500 font-bold">대표 버전과 에디션을 설정해주세요!</p>
                <div className="mt-4 grid grid-rows-auto grid-cols-1 mobile:grid-cols-2 gap-4">
                  <div>
                    <Select
                      placeholder="대표 버전을 설정해 주세요!"
                      searchInputPlaceholder="검색"
                      value={version}
                      onChange={handleChange_version}
                      options={version_options}
                      isMultiple={false}
                      isClearable={true}
                      isSearchable={true}
                      noOptionsMessage="일치하는 버전이 없습니다!"
                      classNames={{
                        searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg',
                        searchIcon: 'hidden',
                        menu: 'bg-[#0d1117] rounded-lg mt-3',
                        tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
                        menuButton: () =>
                          'bg-[#0d1117] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
                        tagItem: () => 'bg-gray-600 rounded-lg flex pl-1',
                        tagItemIconContainer:
                          'flex items-center cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
                      }}
                      formatGroupLabel={data => (
                        <span className="text-gray-500 font-bold text-lg hidden">{data.label}</span>
                      )}
                      formatOptionLabel={data => (
                        <button className="text-left w-full rounded-md px-2.5 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
                          {data.label}
                        </button>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 grid-cols-2 grid-rows-auto">
                    <div className="text-center">
                      <input
                        type="radio"
                        id="java"
                        name="option"
                        value="자바"
                        checked={edition === '자바'}
                        onChange={handleEditionChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="java"
                        className={`block bg-[#0d1117] text-lg font-bold text-center rounded-lg w-full py-1.5 cursor-pointer hover:bg-blue-600 transition-all ${
                          edition === '자바' && 'bg-blue-600'
                        }`}
                      >
                        자바
                      </label>
                    </div>
                    <div className="text-center">
                      <input
                        type="radio"
                        id="bedrock"
                        name="option"
                        value="베드락"
                        checked={edition === '베드락'}
                        onChange={handleEditionChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="bedrock"
                        className={`block bg-[#0d1117] text-lg font-bold text-center rounded-lg px-6 py-1.5 cursor-pointer hover:bg-blue-600 transition-all ${
                          edition === '베드락' && 'bg-blue-600'
                        }`}
                      >
                        베드락
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#141920] rounded-lg p-5">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold">태그를 설정해 주세요!</h1>
                  <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 3</h1>
                </div>
                <p className="mt-3 text-lg text-gray-500 font-bold">이름 밑에 뜰 태그를 설정합니다.</p>
                <div className="mt-4">
                  <Select
                    placeholder="태그를 설정해 주세요!"
                    searchInputPlaceholder="검색"
                    value={tag}
                    onChange={handleChange_tag}
                    options={tag_options}
                    isMultiple={true}
                    isClearable={true}
                    isSearchable={true}
                    noOptionsMessage="일치하는 태그가 없습니다!"
                    classNames={{
                      searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg',
                      searchIcon: 'hidden',
                      menu: 'bg-[#0d1117] rounded-lg mt-3',
                      tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
                      menuButton: () =>
                        'bg-[#0d1117] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
                      tagItem: () => 'bg-gray-600 rounded-lg flex pl-1',
                      tagItemIconContainer:
                        'flex items-center px-1 cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
                    }}
                    formatGroupLabel={data => (
                      <span className="text-gray-500 font-bold text-lg hidden">{data.label}</span>
                    )}
                    formatOptionLabel={data => (
                      <button className="text-left w-full rounded-md px-2.5 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
                        {data.label}
                      </button>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#141920] rounded-lg p-5">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">링크를 설정해 주세요!</h1>
                <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 4</h1>
              </div>
              <p className="mt-3 text-lg text-gray-500 font-bold">상세 설명에 링크를 설정합니다.</p>
              <div id="UrlList" className="grid gap-0 grid-rows-auto grid-cols-1"></div>
              <div className="mt-4 flex justify-start">
                <button
                  className="text-lg font-bold border-2 border-gray-600 hover:border-blue-600 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
                  onClick={handleAddUrl}
                >
                  추가하기
                </button>
                <button
                  className="text-lg font-bold border-2 border-gray-600 hover:border-red-600 rounded-lg px-4 py-2 transition-all mr-2"
                  onClick={handleRemoveUrl}
                >
                  제거하기
                </button>
              </div>
            </div>

            <div className="flex justify-end items-center mt-8 w-auto">
              <div className="flex items-center">
                <button
                  className="text-lg font-bold border-2 border-gray-600 hover:border-rose-700 rounded-lg px-4 py-2 transition-all mr-2"
                  onClick={() => router.replace('/')}
                >
                  취소
                </button>
                <button
                  className="text-lg font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all"
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
