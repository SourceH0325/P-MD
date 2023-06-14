import Head from 'next/head';
import { MdEdit } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import SearchBar from '@/pages/components/SearchBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const id = router.query.id;

  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [query, setQuery] = useState('');
  const [hoveredBlocks, setHoveredBlocks] = useState([]);
  const [clickedBlocks, setClickedBlocks] = useState([]);
  const [loadedLists, setLoadedLists] = useState([]);
  const [remainingLists, setRemainingLists] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/docs/callDocsDB/${id}`)
        .then(res => {
          setDocs(res.data.result);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await axios.get(`/api/docs/callLinkDocsDB/${id}`);
        const loaded = res.data.result.slice(0, 15);
        const remaining = res.data.result.slice(15);
        setLoadedLists(loaded);
        setRemainingLists(remaining);
        setHoveredBlocks(Array(loaded.length).fill(false));
        setClickedBlocks(Array(loaded.length).fill(false));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLists();
  }, [id]);

  useEffect(() => {
    if (session) {
      const fetchBookmarkedLists = async () => {
        try {
          const res = await axios.post('/api/callBookmarkDB', {
            name: session.user.name,
            email: session.user.email,
          });
          const bookmarkedLists = res.data.result[0].bookmark.lists;
          setClickedBlocks(prevClickedBlocks => {
            const newClickedBlocks = [...prevClickedBlocks];
            bookmarkedLists.forEach(bookmark => {
              const index = loadedLists.findIndex(list => list._id === bookmark);
              if (index !== -1) {
                newClickedBlocks[index] = true;
              }
            });
            return newClickedBlocks;
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetchBookmarkedLists();
    }
  }, [session, loadedLists]);

  const handleSearch = query => {
    setQuery(query);

    if (query === '') {
      setLoadedLists([]);
      setRemainingLists([]);
      const fetchLists = async () => {
        try {
          const res = await axios.get(`/api/docs/callLinkDocsDB/${id}`);
          const loaded = res.data.result.slice(0, 15);
          const remaining = res.data.result.slice(15);
          setLoadedLists(loaded);
          setRemainingLists(remaining);
          setHoveredBlocks(Array(loaded.length).fill(false));
          setClickedBlocks(Array(loaded.length).fill(false));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      fetchLists();
      return;
    }

    const filteredRemainingLists = remainingLists.filter(list => {
      if (
        list.name.toLowerCase().includes(query.toLowerCase()) ||
        list.tagA.toLowerCase().includes(query.toLowerCase()) ||
        list.tagB.toLowerCase().includes(query.toLowerCase())
      ) {
        return list;
      }
    });

    setLoadedLists(prevLoadedLists => [...prevLoadedLists, ...filteredRemainingLists.slice(0, 15)]);
    setRemainingLists(filteredRemainingLists.slice(15));
  };

  const filteredLists = loadedLists.filter(list => {
    if (query === '') {
      return list;
    } else if (
      list.name.toLowerCase().includes(query.toLowerCase()) ||
      list.tagA.toLowerCase().includes(query.toLowerCase()) ||
      list.tagB.toLowerCase().includes(query.toLowerCase())
    ) {
      return list;
    }
  });

  const handleMouseEnter = index => {
    setHoveredBlocks(prevHoveredBlocks => {
      const newHoveredBlocks = [...prevHoveredBlocks];
      newHoveredBlocks[index] = true;
      return newHoveredBlocks;
    });
  };

  const handleMouseLeave = index => {
    setHoveredBlocks(prevHoveredBlocks => {
      const newHoveredBlocks = [...prevHoveredBlocks];
      newHoveredBlocks[index] = false;
      return newHoveredBlocks;
    });
  };

  const handleClick = index => {
    if (session) {
      const docID = loadedLists[index]._id;
      const clicked = clickedBlocks[index];

      const handleBookmarkDoc = async () => {
        try {
          if (clicked) {
            await axios.post('/api/list/removeListBookmarkDB', {
              name: session.user.name,
              email: session.user.email,
              docID: docID,
            });
          } else {
            await axios.post('/api/list/addListBookmarkDB', {
              name: session.user.name,
              email: session.user.email,
              docID: docID,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      handleBookmarkDoc();
    }

    setClickedBlocks(prevClickedBlocks => {
      const newClickedBlocks = [...prevClickedBlocks];
      newClickedBlocks[index] = !newClickedBlocks[index];
      return newClickedBlocks;
    });
  };

  const loadMoreLists = () => {
    setLoadedLists(prevLoadedLists => [...prevLoadedLists, ...remainingLists.slice(0, 15)]);
    setRemainingLists(prevRemainingLists => prevRemainingLists.slice(15));
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

      if (isScrolledToBottom && remainingLists.length > 0) {
        loadMoreLists();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [remainingLists]);

  return (
    <>
      <Head>
        {docs.map(doc => (
          <title key={doc._id}>{doc.name}</title>
        ))}
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        <div className="loader-container">
          <div className="loader" />
        </div>
      ) : (
        <div className="mx-4 mobile:mx-0">
          <div className="flex justify-center items-center h-auto w-full mb-8">
            {docs.map(doc => (
              <div key={doc._id} className="bg-[#141920] rounded-lg p-5 w-full">
                <div className="flex justify-between items-center w-auto">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold">{doc.name}</h1>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="mr-2 rounded-lg text-lg px-4 py-2 font-bold border-2 border-gray-600 hover:border-blue-600 transition-all hidden mobile:block"
                      onClick={() => router.push(`/add_list/${doc._id}`)}
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="rounded-lg text-lg px-4 py-2 font-bold border-2 border-gray-600 hover:border-lime-600 transition-all"
                      onClick={() => router.push(`/edit_docs/${doc._id}`)}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="bg-gray-700/60 rounded-lg px-2 py-1 mt-2">
                    <p className="font-bold">{doc.version}</p>
                  </div>
                  <div className="bg-gray-700/60 rounded-lg px-2 py-1 mt-2">
                    <p className="font-bold">{doc.edition}</p>
                  </div>
                  {doc.tag.map((tag, index) => {
                    return (
                      <div key={index} className="bg-gray-700/60 rounded-lg px-2 py-1 mt-2">
                        <p className="font-bold">{tag}</p>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="flex items-center w-auto mt-4 whitespace-nowrap overflow-auto mobile:justify-end"
                  id="LinkList_Main"
                >
                  {doc.url.map((doc, index) => (
                    <button
                      key={index}
                      className="rounded-lg text-lg px-2 pb-1.5 pt-1 mobile:ml-2 mobile:mr-0 mr-2 ml-0 font-bold border-2 border-gray-600 hover:border-blue-600 hover:bg-blue-600 transition-all relative"
                      onClick={() => router.push(doc.link)}
                    >
                      {doc.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <main className="mb-12">
            <div className="grid gap-4 grid-cols-1 grid-rows-auto mobile:grid-cols-3">
              {filteredLists.map((list, index) => (
                <div key={list._id} className="bg-[#141920] rounded-lg p-5">
                  <h1 className="text-2xl font-bold truncate">{list.name}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{list.tagA}</p>
                    </div>
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{list.tagB}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      className="text-2xl pt-1.5"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={() => handleMouseLeave(index)}
                      onClick={() => handleClick(index)}
                    >
                      {clickedBlocks[index] || hoveredBlocks[index] ? <FaStar /> : <FaRegStar />}
                    </button>
                    <button
                      className="text-lg font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all"
                      onClick={() => router.push(`/lists/${list._id}`)}
                    >
                      더보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
