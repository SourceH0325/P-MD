import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { v4 as uuidv4 } from 'uuid';
import 'react-grid-layout/css/styles.css';
import { BiX } from 'react-icons/bi';
import Loading from '@/pages/components/load/EditListLoad';
import NameInput from '@/pages/components/list/edit/EditListNameInput';
import TagInput from '@/pages/components/list/edit/EditListTagInput';

export default function Lists() {
  const router = useRouter();
  const id = router.query.id;

  const [isLoading, setIsLoading] = useState(true);

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

  const [listID, setListID] = useState('');
  const [lists, setLists] = useState([]);
  const [tagSetA, settagSetA] = useState('');
  const [tagSetB, settagSetB] = useState('');
  const writing_a = useRef(null);
  const writing_b = useRef(null);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(isDraggable);
  }, [isDraggable]);

  const edit_list = () => {
    setIsDraggable(!isDraggable);
  };

  const [isCheck, setIsCheck] = useState(false);

  const check = () => {
    setIsCheck(!isCheck);
  };

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
      writing_a.current?.setAttribute('disabled', true);
      writing_b.current?.setAttribute('disabled', true);
    } else {
      writing_a.current?.removeAttribute('disabled');
      writing_b.current?.removeAttribute('disabled');
    }
  }, [isDraggable]);

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

  const onLayoutChange = newLayout => {
    setLayout(newLayout);
  };

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

  const [writingA, setWritingA] = useState([]);
  const [writingB, setWritingB] = useState([]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`/api/callHistoryDetailsDB/${id}`)
        .then(res => {
          console.log(res.data.result);
          setListID(res.data.result[0].id);
          setLists(res.data.result[0].list);
          settagSetA(res.data.result[0].list.tagA);
          settagSetB(res.data.result[0].list.tagB);

          const newLayout = res.data.result[0].list.result_location?.map(location => ({
            i: location.i,
            x: location.x,
            y: location.y,
            w: location.w,
            h: location.h,
          }));

          if (newLayout && newLayout.length > 0) {
            setLayout(newLayout);

            const newWritingA = res.data.result[0].list.result_content.map(item => item?.title || '');
            const newWritingB = res.data.result[0].list.result_content.map(item => item?.content || '');

            setWritingA(newWritingA);
            setWritingB(newWritingB);
          }
        })
        .catch(err => {
          console.error('Error fetching list:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

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

    const linkDocs = lists.linkDocs;

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
      linkDocs: linkDocs,
    };

    setIsSaveButtonDisabled(true);

    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다!');
      setIsSaveButtonDisabled(false);
      return;
    }

    axios
      .put(`/api/list/editListDB/${listID}`, list)
      .then(res => {
        console.log(res);
        alert('리스트 히스토리가 편집되었습니다!');
        return axios.post('/api/addHistoryDB', {
          type: 'edit_list',
          data: {
            id: listID,
            list,
          },
          user: session.user.name,
        });
      })
      .then(res => {
        console.log(res);
        router.replace(`/lists/${listID}`);
      })
      .catch(err => {
        console.log(err);
        alert('리스트 히스토리 편집에 실패했습니다.');
      })
      .finally(() => {
        setIsSaveButtonDisabled(false);
      });
  };

  return (
    <>
      <Head>
        <title>리스트 수정하기</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          {isLoading && <Loading />}
          {!isLoading && (
            <>
              <div id="StepP">
                <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-2">
                  <NameInput defaultValue={lists.name} />
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
                  <div className="flex items-center">
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
                  {layout.map((item, index) => (
                    <div key={item.i} className="bg-[#202026] rounded-lg p-5 flex flex-col">
                      <input
                        id={`writing_a_${item.i}`}
                        value={writingA[index] || ''}
                        onChange={e => {
                          const newWritingA = [...writingA];
                          newWritingA[index] = e.target.value;
                          setWritingA(newWritingA);
                        }}
                        disabled={isDisabled}
                        className={`title text-2xl text-white font-bold bg-[#202026] ${
                          isDraggable ? 'pointer-events-none' : ''
                        }`}
                        placeholder="타이틀을 적어주세요!"
                      />
                      <br />
                      <textarea
                        id={`writing_b_${item.i}`}
                        value={writingB[index] || ''}
                        onChange={e => {
                          const newWritingB = [...writingB];
                          newWritingB[index] = e.target.value;
                          setWritingB(newWritingB);
                        }}
                        disabled={isDisabled}
                        rows={writingB[index]?.split('\n').length || 1}
                        className={`content text-xl text-white font-medium bg-transparent -mt-3 w-full h-full resize-none ${
                          isDraggable ? 'pointer-events-none' : ''
                        }`}
                        placeholder="내용을 적어주세요!"
                      />
                      <div className="absolute top-0 right-0">
                        <button
                          className="text-xl text-gray-500 font-bold"
                          onClick={() => {
                            const newLayout = layout.filter(layoutItem => layoutItem.i !== item.i);
                            const newWritingA = writingA.filter(
                              (_, index) => index !== layout.findIndex(layoutItem => layoutItem.i === item.i),
                            );
                            const newWritingB = writingB.filter(
                              (_, index) => index !== layout.findIndex(layoutItem => layoutItem.i === item.i),
                            );

                            console.log(newLayout);
                            setLayout(newLayout);
                            setWritingA(newWritingA);
                            setWritingB(newWritingB);
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
                      router.replace(`/docs/${lists.linkDocs}`);
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
            </>
          )}
        </main>
      </div>
    </>
  );
}
