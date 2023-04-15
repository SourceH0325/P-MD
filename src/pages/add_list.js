import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import ReactGridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import { BiX } from 'react-icons/bi'

export default function Add_Docs() {
  const router = useRouter()

  let showAlert = true

  useEffect(() => {
    // 화면 크기가 1140px 이하일 때 사용이 불가능하게 함
    if (window.innerWidth <= 1140) {
      if (showAlert==true) {
        alert('화면 크기가 너무 작습니다.')
        showAlert = false
        router.back()
      } 
    } else {
      showAlert = true
    }
  }, [])

  

  const [isDraggable, setIsDraggable] = useState(false)
  const writing_a = useRef(null)
  const writing_b = useRef(null)

  const edit_list = () => {
    setIsDraggable(!isDraggable)
  }

  useEffect(() => {
    if (isDraggable) {
      if (writing_a.current?.getAttribute('disabled') === null) {
        writing_a.current.setAttribute('disabled', true)
      }
      if (writing_b.current?.getAttribute('disabled') === null) {
        writing_b.current.setAttribute('disabled', true)
      }
    } else {
      if (writing_a.current?.getAttribute('disabled') !== null) {
        writing_a.current.removeAttribute('disabled')
      }
      if (writing_b.current?.getAttribute('disabled') !== null) {
        writing_b.current.removeAttribute('disabled')
      }
    }
  }, [isDraggable, writing_a, writing_b])

  const [isCheck, setIsCheck] = useState(false)

  const check = () => {
    setIsCheck(!isCheck)
  }

  useEffect(() => {
    const placing = document.querySelector('#placing')
    if (placing) {
      if (isCheck) {
        placing.classList.add('border-blue-600')
        placing.classList.remove('border-gray-600')
      } else {
        placing.classList.remove('border-blue-600')
        placing.classList.add('border-gray-600')
      }
    }
  }, [isCheck])

  const [layout, setLayout] = useState([{ i: '1', x: 0, y: 0, w: 10, h: 4, minH: 4 }])

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout)
  }

  const add_list_block = () => {
    const newLayout = layout.concat({
      i: String(layout.length + 1),
      x: 0,
      y: Infinity,
      w: 10,
      h: 4,
      minH: 4,
    })
    setLayout(newLayout)
    console.log(layout)
  }

  return (
    <>
      <Head>
        <title>리스트 추가하기</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div className="flex justify-start items-center mb-1">
            <label
              id="placing"
              className="flex items-center relative w-max cursor-pointer select-none p-2 rounded-lg mr-3 border-2 border-gray-600 transition-all px-4 py-2 hover:border-blue-600"
            >
              <span className="text-lg font-bold text-center">배치하기</span>
              <input
                type="checkbox"
                className="appearance-none"
                onClick={() => {
                  edit_list()
                  check()
                }}
              />
            </label>
            <button
              className="text-lg font-bold border-2 border-gray-600 hover:border-blue-600 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
              onClick={add_list_block}
            >
              리스트 추가하기
            </button>
          </div>
          <ReactGridLayout
            className="layout select-none"
            layout={layout}
            cols={5}
            onLayoutChange={onLayoutChange}
            isDraggable={isDraggable}
            rowHeight={30}
            width={1160}
          >
            {layout.map((item) => (
              <div key={item.i} className="bg-[#141920] rounded-lg p-5 -ml-2.5 flex flex-col">
                <input
                  id={`writing_a_${item.i}`}
                  ref={writing_a}
                  className="text-2xl text-white font-bold bg-[#141920]"
                  placeholder="타이틀을 적어주세요!"
                />
                <br />
                <textarea
                  id={`writing_b_${item.i}`}
                  ref={writing_b}
                  rows="1"
                  className="text-xl text-white font-semibold bg-[#141920] -mt-3 w-full h-full resize-none"
                  placeholder="내용을 적어주세요!"
                />
                {/* x 버튼 */}
                <div className="absolute top-0 right-0">
                  <button
                    className="text-xl text-gray-500 font-bold"
                    onClick={() => {
                      const newLayout = layout.filter((i) => i.i !== item.i)
                      setLayout(newLayout)
                    }}
                  >
                    <BiX className="fill-gray-500 hover:fill-white transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </ReactGridLayout>
          <div className="flex justify-end items-center mt-1">
            <button
              className="text-lg font-bold border-2 border-gray-600 hover:border-rose-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
              onClick={() => {
                router.back()
              }}
            >
              취소
            </button>
            <button
              className="text-lg font-bold border-2 border-gray-600 hover:border-blue-600 transition-all px-4 py-2 transition-all rounded-lg"
              onClick={() => {
                router.back()
              }}
            >
              저장
            </button>
          </div>
        </main>
      </div>
    </>
  )
}
