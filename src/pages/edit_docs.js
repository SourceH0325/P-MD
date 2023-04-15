import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-tailwindcss-select'
import VerEx from 'verbal-expressions'

export default function Add_Docs() {
  const router = useRouter()

  // 태그 옵션
  const tag_options = [
    {
      label: '장르',
      options: [
        { value: 'wild', label: '야생' },
        { value: 's-wild', label: '반야생' },
        { value: 'build', label: '건축' },
        { value: 'pvp', label: 'PVP' },
        { value: 'towny', label: '타우니' },
        { value: 'minigame', label: '미니게임' },
        { value: 'economy', label: '경제' },
        { value: 'minefarm', label: '마인팜' },
        { value: 'skyblock', label: '스카이블럭' },
        { value: 'rpg', label: 'RPG' },
        { value: 'plunder', label: '약탈' },
        { value: 'mcmmo', label: 'mcMMO' },
      ],
    },
  ]

  // 최소 버전 옵션
  const min_version_options = [
    {
      label: '버전',
      options: [
        { value: 1, label: '1.5' },
        { value: 2, label: '1.6' },
        { value: 3, label: '1.7' },
        { value: 4, label: '1.8' },
        { value: 5, label: '1.9' },
        { value: 6, label: '1.10' },
        { value: 7, label: '1.11' },
        { value: 8, label: '1.12' },
        { value: 9, label: '1.13' },
        { value: 10, label: '1.14' },
        { value: 11, label: '1.15' },
        { value: 12, label: '1.16' },
        { value: 13, label: '1.17' },
        { value: 14, label: '1.18' },
        { value: 15, label: '1.19' },
      ],
    },
  ]

  // 최대 버전 옵션
  const max_version_options = [
    {
      label: '버전',
      options: [
        { value: 1, label: '1.5' },
        { value: 2, label: '1.6' },
        { value: 3, label: '1.7' },
        { value: 4, label: '1.8' },
        { value: 5, label: '1.9' },
        { value: 6, label: '1.10' },
        { value: 7, label: '1.11' },
        { value: 8, label: '1.12' },
        { value: 9, label: '1.13' },
        { value: 10, label: '1.14' },
        { value: 11, label: '1.15' },
        { value: 12, label: '1.16' },
        { value: 13, label: '1.17' },
        { value: 14, label: '1.18' },
        { value: 15, label: '1.19' },
      ],
    },
  ]

  // 태그, 버전 선택
  const [tag, settag] = useState(null)
  const [min_version, setmin_version] = useState(null)
  const [max_version, setmax_version] = useState(null)

  const handleChange_min_version = (value) => {
    setmin_version(value)
  }

  const handleChange_max_version = (value) => {
    setmax_version(value)
  }

  const handleChange_tag = (value) => {
    settag(value)
  }

  // 링크 추가
  const handleAddUrl = () => {
    const url = document.getElementById('UrlList')
    const url_input = document.createElement('input')
    url_input.setAttribute('type', 'text')
    url_input.setAttribute('id', 'Url')
    url_input.setAttribute('class', 'mt-4 px-2.5 pb-1 w-full h-12 bg-[#0d1117] text-left text-white rounded-lg')
    url_input.setAttribute('placeholder', '기타 링크')
    url.appendChild(url_input)
  }

  const handleRemoveUrl = () => {
    const url = document.getElementById('UrlList')
    const url_input = document.getElementById('Url')
    url.removeChild(url_input)
  }

  // URL 정규식
  const Web = VerEx().startOfLine().then('http').maybe('s').then('://').maybe('www.').anythingBut(' ').endOfLine()

  const handleComplete = () => {
    // 버전 확인
    if (min_version == null || max_version == null) {
      alert('버전을 설정해주세요!')
    } else if (min_version.value > max_version.value) {
      alert('최소 버전이 최대 버전보다 큽니다!')
    } else {
      console.log('version check success')
    }

    // 태그 확인
    if (tag == null) {
      alert('장르를 설정해주세요!')
    } else {
      console.log('tag check success')
    }

    // URL 확인
    if (document.getElementById('Url').value == '') {
      console.log('url check success')
    } else if (Web.test(document.getElementById('Url').value) == true) {
      console.log('url check success')
    } else {
      alert('URL을 확인해주세요!')
    }

    // 이름 확인
    if (document.getElementById('Name').value == '') {
      alert('이름을 입력해주세요!')
    } else {
      console.log('name check success')
    }
  }

  return (
    <>
      <Head>
        <title>독스 편집하기</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <buttonnk rel="icon" href="/favicon.ico" />
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
                placeholder="스텔라 레전드"
              />
            </div>

            <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
              <div className="bg-[#141920] rounded-lg p-5">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold">버전을 설정해 주세요!</h1>
                  <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 2</h1>
                </div>
                <p className="mt-3 text-lg text-gray-500 font-bold">최소 버전부터 최대 버전까지 선택해 주세요!</p>
                <div className="mt-4 grid grid-rows-auto grid-cols-1 mobile:grid-cols-2 gap-4">
                  <div>
                    <Select
                      placeholder="최소 버전을 설정해 주세요!"
                      searchInputPlaceholder="검색"
                      value={min_version}
                      onChange={handleChange_min_version}
                      options={min_version_options}
                      isMultiple={false}
                      isClearable={true}
                      isSearchable={true}
                      noOptionsMessage="어떻게 보신거죠?"
                      classNames={{
                        searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg',
                        searchIcon: 'hidden',
                        menu: 'bg-[#0d1117] rounded-lg mt-3',
                        tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
                        menuButton: (state) =>
                          'bg-[#0d1117] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
                        tagItem: (state) => 'bg-gray-600 rounded-lg flex pl-1',
                        tagItemIconContainer:
                          'flex items-center px-1 cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
                      }}
                      formatGroupLabel={(data) => (
                        <span className="text-gray-500 font-bold text-lg px-1">{data.label}</span>
                      )}
                      formatOptionLabel={(data) => (
                        <button className="text-left w-full rounded-md px-2 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
                          {data.label}
                        </button>
                      )}
                    />
                  </div>
                  <div>
                    <Select
                      placeholder="최대 버전을 설정해 주세요!"
                      searchInputPlaceholder="검색"
                      value={max_version}
                      onChange={handleChange_max_version}
                      options={max_version_options}
                      isMultiple={false}
                      isClearable={true}
                      isSearchable={true}
                      noOptionsMessage="어떻게 보신거죠?"
                      classNames={{
                        searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg',
                        searchIcon: 'hidden',
                        menu: 'bg-[#0d1117] rounded-lg mt-3',
                        tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
                        menuButton: (state) =>
                          'bg-[#0d1117] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
                        tagItem: (state) => 'bg-gray-600 rounded-lg flex pl-1',
                        tagItemIconContainer:
                          'flex items-center px-1 cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
                      }}
                      formatGroupLabel={(data) => (
                        <span className="text-gray-500 font-bold text-lg px-1">{data.label}</span>
                      )}
                      formatOptionLabel={(data) => (
                        <button className="text-left w-full rounded-md px-2 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
                          {data.label}
                        </button>
                      )}
                    />
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
                    placeholder="태그를 선택해주세요!"
                    searchInputPlaceholder="검색"
                    value={tag}
                    onChange={handleChange_tag}
                    options={tag_options}
                    isMultiple={true}
                    isClearable={true}
                    isSearchable={true}
                    noOptionsMessage="이걸 전부 다 쓰시다니.."
                    classNames={{
                      searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg',
                      searchIcon: 'hidden',
                      menu: 'bg-[#0d1117] rounded-lg mt-3',
                      tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
                      menuButton: (state) =>
                        'bg-[#0d1117] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
                      tagItem: (state) => 'bg-gray-600 rounded-lg flex pl-1',
                      tagItemIconContainer:
                        'flex items-center px-1 cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
                    }}
                    formatGroupLabel={(data) => (
                      <span className="text-gray-500 font-bold text-lg px-1">{data.label}</span>
                    )}
                    formatOptionLabel={(data) => (
                      <button className="text-left w-full rounded-md px-2 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
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
              <div id="UrlList">
                <input
                  type="text"
                  id="Url"
                  className="mt-4 px-2.5 pb-1 w-full h-12 bg-[#0d1117] text-left text-white rounded-lg"
                  placeholder="https://discord.gg/cq3TeTtNxt"
                />
              </div>
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
                  onClick={() => router.push('/')}
                >
                  취소
                </button>
                <button
                  className="text-lg font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all"
                  onClick={handleComplete}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
