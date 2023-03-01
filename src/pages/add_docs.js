import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-tailwindcss-select'

export default function Add_Docs() {
  const router = useRouter()

  const options = [
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
    {
      label: '버전',
      options: [
        { value: '1.5', label: '1.5' },
        { value: '1.6', label: '1.6' },
        { value: '1.7', label: '1.7' },
        { value: '1.8', label: '1.8' },
        { value: '1.9', label: '1.9' },
        { value: '1.10', label: '1.10' },
        { value: '1.11', label: '1.11' },
        { value: '1.12', label: '1.12' },
        { value: '1.13', label: '1.13' },
        { value: '1.14', label: '1.14' },
        { value: '1.15', label: '1.15' },
        { value: '1.16', label: '1.16' },
        { value: '1.17', label: '1.17' },
        { value: '1.18', label: '1.18' },
        { value: '1.19', label: '1.19' },
      ],
    },
  ]

  const [tag, settag] = useState(null)

  const handleChange = (value) => {
    console.log('value:', value)
    settag(value)
  }

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
                <h1 className="text-2xl font-bold">이름을 설정해주세요!</h1>
                <h1 className="text-1xl text-gray-500 font-bold">STEP 1</h1>
              </div>
              <p className="mt-3 text-lg text-gray-500 font-bold">홈에 뜰 이름을 설정합니다.</p>
              <input
                className="mt-4 px-2.5 pb-1 w-full h-12 bg-[#0d1117] text-left text-white rounded-lg"
                type="text"
                placeholder="예시: 마인독스"
              />
            </div>

            <div className="bg-[#141920] rounded-lg p-5">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">태그를 설정해주세요!</h1>
                <h1 className="text-xl text-gray-500 font-bold">STEP 2</h1>
              </div>
              <p className="mt-3 text-lg text-gray-500 font-bold">이름 밑에 뜰 태그를 설정합니다.</p>
              <div className="mt-4">
                <Select
                  placeholder="태그를 선택해주세요!"
                  searchInputPlaceholder="검색"
                  value={tag}
                  onChange={handleChange}
                  options={options}
                  isMultiple={true}
                  isClearable={true}
                  isSearchable={true}
                  classNames={{
                    searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg',
                    searchIcon: 'hidden',
                    menu: 'bg-[#0d1117] rounded-lg mt-3',
                    tagItemText: 'inline-block bg-gray-600/60 rounded-lg px-2 py-1 my-1 mr-1',
                    menuButton: (state) => 'bg-[#0d1117] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
                    tagItem: (state) => 'bg-gray-600 rounded-lg flex pl-1',
                    tagItemIconContainer: 'flex items-center px-1 cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
                  }}
                  formatGroupLabel={(data) => <span className="text-[#f1f1f1] font-bold text-lg">{data.label}</span>}
                  formatOptionLabel={(data) => (
                    <li className="inline-block bg-gray-600/60 rounded-lg px-2 py-1 my-1 cursor-pointer hover:bg-blue-600 transition-all">
                      {data.label}
                    </li>
                  )}
                />
              </div>
            </div>

            <div className="bg-[#141920] rounded-lg p-5">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">링크를 설정해주세요!</h1>
                <h1 className="text-xl text-gray-500 font-bold">STEP 3</h1>
              </div>
              <p className="mt-3 text-lg text-gray-500 font-bold">상세 설명에 링크를 설정합니다.</p>
              <input
                className="mt-4 px-2.5 pb-1 w-full h-12 bg-[#0d1117] text-left text-white rounded-lg"
                type="text"
                placeholder="예시: https://example.com"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="font-semibold bg-gray-600 hover:bg-gray-700 rounded-lg px-4 py-2 transition-all mr-2"
              onClick={() => router.push('/')}
            >
              취소
            </button>
            <button
              className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
              onClick={() => router.push('/')}
            >
              완료
            </button>
          </div>
        </main>
      </div>
    </>
  )
}
