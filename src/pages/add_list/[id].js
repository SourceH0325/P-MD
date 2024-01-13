import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import 'react-grid-layout/css/styles.css';
import { BiX } from 'react-icons/bi';
import NameInput from '@/pages/components/list/add/AddListNameInput';
import TagInput from '@/pages/components/list/add/AddListTagInput';

export default function Add_List() {
  const router = useRouter();
  const id = router.query.id;

  let showAlert = true;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('discord');
    }
  }, [status]);

  useEffect(() => {
    if (window.innerWidth <= 1140) {
      if (showAlert == true) {
        alert('화면 크기가 너무 작습니다.');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        showAlert = false;
        router.back();
      }
    } else {
      showAlert = true;
    }
  }, []);

  const onLayoutChange = newLayout => {
    setLayout(newLayout);
  };

  const writing_a = useRef(null);
  const writing_b = useRef(null);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);

  const edit_list = () => {
    setIsDraggable(!isDraggable);
  };

  const [isCheck, setIsCheck] = useState(false);

  const check = () => {
    setIsCheck(!isCheck);
  };

  const [tagSetA, settagSetA] = useState('');
  const [tagSetB, settagSetB] = useState('');

  const handletagSetA = event => {
    const value = event.target.value;
    const trimmedValue = value.trim();

    if (trimmedValue.length <= 5 && !trimmedValue.includes(' ')) {
      settagSetA(trimmedValue);
    }
  };

  const handletagSetB = event => {
    const value = event.target.value;
    const trimmedValue = value.trim();

    if (trimmedValue.length <= 5 && !trimmedValue.includes(' ')) {
      settagSetB(trimmedValue);
    }
  };

  useEffect(() => {
    if (isDraggable) {
      if (writing_a.current?.getAttribute('disabled') === null) {
        writing_a.current.setAttribute('disabled', true);
      }
      if (writing_b.current?.getAttribute('disabled') === null) {
        writing_b.current.setAttribute('disabled', true);
      }
    } else {
      if (writing_a.current?.getAttribute('disabled') !== null) {
        writing_a.current.removeAttribute('disabled', false);
      }
      if (writing_b.current?.getAttribute('disabled') !== null) {
        writing_b.current.removeAttribute('disabled', false);
      }
    }
  }, [isDraggable, writing_a, writing_b]);

  useEffect(() => {
    const placing = document.querySelector('#placing');
    if (placing) {
      if (isCheck) {
        placing.classList.add('bg-blue-700');
        placing.classList.remove('bg-blue-600');
      } else {
        placing.classList.remove('bg-blue-700');
        placing.classList.add('bg-blue-600');
      }
    }
  }, [isCheck]);

  const PreNext = () => {
    const PreNextP = document.querySelector('#StepP');
    PreNextP.classList.toggle('hidden');
    PreNextP.classList.toggle('block');

    const PreNextN = document.querySelector('#StepN');
    PreNextN.classList.toggle('hidden');
    PreNextN.classList.toggle('block');

    const ChName = document.querySelector('#PreNext');
    if (ChName.innerHTML === '다음 단계') {
      ChName.innerHTML = '이전 단계';
    } else {
      ChName.innerHTML = '다음 단계';
    }

    const Complete = document.querySelector('#Complete');
    if (Complete.classList.contains('hidden')) {
      Complete.classList.remove('hidden');
      Complete.classList.add('block');
    } else {
      Complete.classList.remove('block');
      Complete.classList.add('hidden');
    }
  };

  const initialLayout = [
    {
      i: uuidv4(),
      x: 0,
      y: Infinity,
      w: 10,
      h: 4,
      minH: 4,
    },
  ];

  const [layout, setLayout] = useState(initialLayout);

  const add_list_block = () => {
    const newLayout = layout.concat({
      i: uuidv4(),
      x: 0,
      y: Infinity,
      w: 10,
      h: 4,
      minH: 4,
    });
    console.log(newLayout);
    setLayout(newLayout);
  };

  const handleComplete = () => {
    if (layout.length === 0) {
      alert('리스트를 추가해주세요!');
      return;
    }

    const name = document.querySelector('#Name').value;
    const tagA = document.querySelector('#TagA').value;
    const tagB = document.querySelector('#TagB').value;

    const result_content = [];
    let errMessages = [];

    for (let i = 0; i < layout.length; i++) {
      const title = document.querySelector(`#writing_a_${layout[i].i}`).value;
      const content = document.querySelector(`#writing_b_${layout[i].i}`).value;

      if (title === '' || content === '') {
        errMessages.push('내용');
        break;
      }

      result_content.push({
        title: title,
        content: content,
      });
    }

    const result_location = layout.map(item => {
      return {
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      };
    });

    if (name === '') {
      errMessages.push('이름');
    }

    if (tagA === '' || tagB === '') {
      errMessages.push('태그');
    }

    if (errMessages.length > 0) {
      alert(`${errMessages.join(', ')}을 추가해주세요!`);
      setIsSaveButtonDisabled(false);
      return;
    }

    const list = {
      name: name,
      tagA: tagA,
      tagB: tagB,
      result_content: result_content,
      result_location: result_location,
      linkDocs: id,
    };

    setIsSaveButtonDisabled(true);

    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다!');
      setIsSaveButtonDisabled(false);
      return;
    }

    axios
      .post('/api/list/addListDB', list)
      .then(res => {
        console.log(res);
        alert('리스트 추가가 완료되었습니다!');
        return axios.post('/api/addLogsDB', {
          type: 'add_list',
          data: {
            list,
          },
          session: session,
        });
      })
      .then(res => {
        console.log(res);
        router.replace(`/docs/${id}`);
      })
      .catch(err => {
        alert('리스트 추가에 실패했습니다');
        console.log(err);
      })
      .finally(() => {
        setIsSaveButtonDisabled(false);
      });
  };

  return (
    <>
      <Head>
        <title>리스트 추가하기</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div id="StepP">
            <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-2">
              <NameInput />
              <TagInput
                tagSetA={tagSetA}
                tagSetB={tagSetB}
                handletagSetA={handletagSetA}
                handletagSetB={handletagSetB}
              />
            </div>
          </div>
          <div id="StepN" className="hidden">
            <div className="flex justify-start items-center mb-1">
              <label
                id="placing"
                className="flex items-center relative w-max cursor-pointer select-none p-2 rounded-lg mr-3 bg-blue-600 transition-all px-4 py-2 hover:bg-blue-700"
              >
                <span className="text-lg font-bold text-center">배치하기</span>

                <input
                  type="checkbox"
                  className="appearance-none"
                  onClick={() => {
                    edit_list();
                    check();
                  }}
                />
              </label>
              <button
                className="font-bold text-lg bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
                onClick={add_list_block}
              >
                리스트 추가하기
              </button>
            </div>
            <ReactGridLayout
              className="layout select-none"
              layout={layout}
              cols={6}
              onLayoutChange={onLayoutChange}
              containerPadding={[0, 10]}
              isDraggable={isDraggable}
              isResizable={isDraggable}
              rowHeight={30}
              width={1140}
            >
              {layout.map(item => (
                <div key={item.i} className="bg-[#202026] rounded-lg p-5 flex flex-col">
                  <input
                    id={`writing_a_${item.i}`}
                    ref={writing_a}
                    className="title text-2xl text-white font-bold bg-[#202026]"
                    placeholder="타이틀을 적어주세요!"
                  />
                  <br />
                  <textarea
                    id={`writing_b_${item.i}`}
                    ref={writing_b}
                    rows="1"
                    className="content text-xl text-white font-bold bg-transparent -mt-3 w-full h-full resize-none"
                    placeholder="내용을 적어주세요!"
                  />
                  {/* x 버튼 */}
                  <div className="absolute top-0 right-0">
                    <button
                      className="text-xl text-gray-500 font-bold"
                      onClick={() => {
                        const newLayout = layout.filter(layoutItem => layoutItem.i !== item.i);
                        console.log(newLayout);
                        setLayout(newLayout);
                      }}
                    >
                      <BiX className="fill-gray-500 hover:fill-white transition-all" />
                    </button>
                  </div>
                </div>
              ))}
            </ReactGridLayout>
          </div>
          <div className="flex justify-between items-center mt-5">
            <button
              id="PreNext"
              className="font-bold text-lg bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 transition-all mr-2"
              onClick={PreNext}
            >
              다음 단계
            </button>
            <div id="Complete" className="flex justify-end items-center hidden">
              <button
                className="font-bold text-lg bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
                onClick={() => {
                  router.replace(`/docs/${id}`);
                }}
              >
                취소
              </button>
              <button
                className="font-bold text-lg bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
                onClick={handleComplete}
                disabled={isSaveButtonDisabled}
              >
                완료
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
