import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import SearchBar from '@/pages/components/SearchBar';
import Loading from '@/pages/components/load/DefaultLoad';
import axios from 'axios';

export default function Home({ SSLists }) {
  const router = useRouter();
  const id = router.query.id;

  const [isLoading, setIsLoading] = useState(true);
  const [loadedHistory, setLoadedHistory] = useState([]);
  const [remainingHistory, setRemainingHistory] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (id) {
      const fetchHistory = async () => {
        try {
          const resList = await axios.get(`/api/list/callListHistoryLDB/${id}`);
          const list = resList.data.result;

          list.sort((a, b) => {
            const timeA = new Date(a.timeAt);
            const timeB = new Date(b.timeAt);
            return timeB - timeA;
          });

          const loaded = list.slice(0, 15);
          const remaining = list.slice(15);
          setLoadedHistory(loaded);
          setRemainingHistory(remaining);
        } catch (error) {
          console.log(error);
        }
      };

      fetchHistory();
      setIsLoading(false);
    }
  }, [id]);

  const handleSearch = query => {
    setQuery(query);

    if (query === '') {
      setLoadedHistory([]);
      setRemainingHistory([]);
      const fetchHistory = async () => {
        try {
          const resList = await axios.get(`/api/list/callListHistoryLDB/${id}`);
          const list = resList.data.result;

          list.sort((a, b) => {
            const timeA = new Date(a.timeAt);
            const timeB = new Date(b.timeAt);
            return timeB - timeA;
          });

          const loaded = list.slice(0, 15);
          const remaining = list.slice(15);
          setLoadedHistory(loaded);
          setRemainingHistory(remaining);
        } catch (error) {
          console.log(error);
        }
      };

      fetchHistory();
      return;
    }

    const filteredRemainingHistory = remainingHistory.filter(item => {
      const lowerCaseQuery = query.toLowerCase();
      const isMatch =
        item.id && (item.id.toLowerCase().includes(lowerCaseQuery) || item.user.toLowerCase().includes(lowerCaseQuery));

      return isMatch;
    });

    setLoadedHistory(prevLoadedHistory => [...prevLoadedHistory, ...filteredRemainingHistory.slice(0, 15)]);
    setRemainingHistory(filteredRemainingHistory.slice(15));
  };

  const filteredItems = loadedHistory.filter(item => {
    const lowerCaseQuery = query.toLowerCase();
    const isMatch =
      item.id && (item.id.toLowerCase().includes(lowerCaseQuery) || item.user.toLowerCase().includes(lowerCaseQuery));

    return query === '' || isMatch;
  });

  const loadMoreHistory = () => {
    setLoadedHistory(prevLoadedHistory => [...prevLoadedHistory, ...remainingHistory.slice(0, 15)]);
    setRemainingHistory(prevRemainingHistory => prevRemainingHistory.slice(15));
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;

      if (isScrolledToBottom && remainingHistory.length > 0) {
        loadMoreHistory();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingHistory]);

  return (
    <>
      <Head>
        <title>{SSLists && SSLists.length > 0 ? `${SSLists[0].name} (히스토리) - 마인독스` : '마인독스'}</title>
        <meta
          name="og:title"
          content={SSLists && SSLists.length > 0 ? `${SSLists[0].name} (히스토리) - 마인독스` : '마인독스'}
        />
        <meta name="og:description" content="마인크래프트 서버의 플레이를 도와줍니다." />
      </Head>

      <SearchBar onSearch={handleSearch} placeholder="ID, 유저를 검색해보세요!" />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-4 mobile:mx-0">
          <main className="mb-12">
            {filteredItems.length > 0 ? (
              <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-3">
                {filteredItems.map(item => (
                  <div key={item._id} className="bg-[#202026] rounded-lg p-5">
                    <h1 className="text-xl font-bold truncate">
                      {item.timeAt
                        ? new Date(item.timeAt).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })
                        : item.timeAt}
                    </h1>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-lg font-bold text-blue-600 truncate">{item.user}</p>
                      <p className="text-lg font-bold text-gray-600 truncate">
                        {item.type === 'edit_list' ? '리스트 편집' : '리스트 삭제'}
                      </p>
                    </div>

                    <div className="flex justify-start items-center mt-4">
                      <div className="mr-auto">
                        <p
                          className="text-xs text-gray-600 font-bold truncate cursor-pointer hover:text-white transition-all"
                          onClick={() => router.push(`/lists/${item.id}`)}
                        >
                          {item.id}
                        </p>
                      </div>
                      <div className="flex">
                        <button
                          className="font-bold text-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-all rounded-lg"
                          onClick={() => router.push(`/history/lists/${item._id}`)}
                        >
                          보기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <h1 className="text-2xl font-bold">검색 결과가 없습니다.</h1>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/list/callListDB/${id}`);
  const SSLists = res.data.result;
  return {
    props: {
      SSLists,
    },
  };
}
