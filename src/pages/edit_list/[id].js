import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import NameInput from '@/pages/components/list/edit/EditListNameInput';
import TagInput from '@/pages/components/list/edit/EditListTagInput';
import GridInput from '@/pages/components/list/edit/EditListGridInput';

export default function Edit_List() {
  const router = useRouter();
  const id = router.query.id;

  let showAlert = true;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('discord');
    }
  }, [status]);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

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

  const [isDraggable, setIsDraggable] = useState(false);
  const writing_a = useRef(null);
  const writing_b = useRef(null);

  const edit_list = () => {
    setIsDraggable(!isDraggable);
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
      if (writing_a.current?.getAttribute('disabled') === 'true') {
        writing_a.current.removeAttribute('disabled');
      }
      if (writing_b.current?.getAttribute('disabled') === 'true') {
        writing_b.current.removeAttribute('disabled');
      }
    }
  }, [isDraggable, writing_a, writing_b]);

  const [isCheck, setIsCheck] = useState(false);

  const check = () => {
    setIsCheck(!isCheck);
  };

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

  const [lists, setLists] = useState([]);

  const [tagSetA, setTagSetA] = useState('');
  const [tagSetB, setTagSetB] = useState('');

  useEffect(() => {
    if (lists.length > 0) {
      setTagSetA(lists[0]?.tagA);
      setTagSetB(lists[0]?.tagB);
    }
  }, [lists]);

  const handletagSetA = event => {
    const value = event.target.value;
    const trimmedValue = value.trim();

    if (trimmedValue.length <= 5 && !trimmedValue.includes(' ')) {
      setTagSetA(trimmedValue);
    }
  };

  const handletagSetB = event => {
    const value = event.target.value;
    const trimmedValue = value.trim();

    if (trimmedValue.length <= 5 && !trimmedValue.includes(' ')) {
      setTagSetB(trimmedValue);
    }
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/list/callListDB/${id}`)
        .then(res => {
          setLists(res.data.result);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const layoutA = lists[0]?.result_location
    ? lists[0]?.result_location.map(location => ({
        i: location.i,
        x: location.x,
        y: location.y,
        w: location.w,
        h: location.h,
      }))
    : [];

  const [layout, setLayout] = useState([]);

  useEffect(() => {
    if (layoutA.length > 0 && layout.length === 0) {
      setLayout(layoutA);
    }
  }, [layoutA, layout]);

  const onLayoutChange = newLayout => {
    setLayout(newLayout);
  };

  const add_list_block = () => {
    const newItem = {
      i: layout.length.toString(),
      x: 0,
      y: Infinity,
      w: 10,
      h: 4,
      minH: 4,
    };

    const newLayout = [...layout, newItem];
    setLayout(newLayout);

    const newLists = [...lists];
    newLists[0].result_location.push(newItem);
    setLists(newLists);

    console.log(layout);
  };

  const handleComplete = () => {
    const name = document.querySelector('#Name').value;
    const tagA = document.querySelector('#TagA').value;
    const tagB = document.querySelector('#TagB').value;
    const title = document.querySelector('.title').value;
    const content = document.querySelector('.content').value;

    const result_content = [];

    for (let i = 0; i < layout.length; i++) {
      const title = document.querySelector(`#writing_a_${i}`).value;
      const content = document.querySelector(`#writing_b_${i}`).value;

      result_content.push({
        i: `${i}`,
        title: title,
        content: content,
      });
    }

    const result_location = layout.map(location => ({
      i: location.i,
      x: location.x,
      y: location.y,
      w: location.w,
      h: location.h,
    }));

    if (title === '' || content === '') {
      alert('내용을 추가해주세요!');
      return;
    }

    const list = {
      name: name,
      tagA: tagA,
      tagB: tagB,
      result_content: result_content,
      result_location: result_location,
    };

    if (result_location.length === 0) {
      alert('리스트를 추가해주세요!');
      return;
    }

    setIsSaveButtonDisabled(true);
    axios
      .put(`/api/list/editListDB/${id}`, list)
      .then(res => {
        console.log(res);
        alert('리스트가 수정되었습니다!');
        return axios.post('/api/addLogsDB', {
          type: 'edit_list',
          data: {
            list,
          },
          session: session,
        });
      })
      .then(res => {
        console.log(res);
        router.replace(`/lists/${id}`);
      })
      .catch(err => {
        console.log(err);
        alert('리스트 수정에 실패했습니다.');
      })
      .finally(() => {
        setIsSaveButtonDisabled(false);
      });
  };

  const handleDelete = () => {
    const result = confirm('정말로 삭제하시겠습니까?');
    const name = document.querySelector('#Name').value;
    const tagA = document.querySelector('#TagA').value;
    const tagB = document.querySelector('#TagB').value;

    const result_content = [];

    for (let i = 0; i < layout.length; i++) {
      const title = document.querySelector(`#writing_a_${i}`).value;
      const content = document.querySelector(`#writing_b_${i}`).value;

      result_content.push({
        i: `${i}`,
        title: title,
        content: content,
      });
    }

    const result_location = layout.map(location => ({
      i: location.i,
      x: location.x,
      y: location.y,
      w: location.w,
      h: location.h,
    }));

    const LinkDocs = lists[0]?.linkDocs;

    const list = {
      id: id,
      name: name,
      tagA: tagA,
      tagB: tagB,
      result_content: result_content,
      result_location: result_location,
      link_docs: LinkDocs,
    };

    if (result) {
      setIsSaveButtonDisabled(true);
      axios
        .delete(`/api/list/deleteListDB/${id}`)
        .then(res => {
          console.log(res);
          alert('리스트가 삭제되었습니다!');
          return axios.post('/api/addLogsDB', {
            type: 'delete_list',
            data: {
              list,
            },
            session: session,
          });
        })
        .then(res => {
          console.log(res);
          router.replace(`/docs/${LinkDocs}`);
        })
        .catch(err => {
          console.log(err);
          alert('리스트 삭제에 실패했습니다.');
        })
        .finally(() => {
          setIsSaveButtonDisabled(false);
        });
    }
  };

  return (
    <>
      <Head>
        <title>리스트 편집하기</title>
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
            <div id="StepP">
              <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-2">
                <NameInput defaultValue={lists[0]?.name} />
                <TagInput tagSetA={tagSetA} tagSetB={tagSetB} onChangeA={handletagSetA} onChangeB={handletagSetB} />
              </div>
            </div>
            <div id="StepN" className="hidden">
              <div className="flex justify-between items-center mb-1">
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
                <button
                  className="font-bold text-lg bg-red-600 hover:bg-red-700 transition-all px-4 py-2 transition-all rounded-lg"
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </div>
              <GridInput
                layout={layout}
                setLayout={setLayout}
                isDraggable={isDraggable}
                onLayoutChange={onLayoutChange}
                lists={lists}
                setLists={setLists}
                writing_a={writing_a}
                writing_b={writing_b}
              />
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
                  className="font-bold text-lg bg-gray-600 hover:bg-gray-700 px-4 py-2 transition-all mr-2 rounded-lg"
                  onClick={() => {
                    router.replace(`/lists/${id}`);
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
      )}
    </>
  );
}
