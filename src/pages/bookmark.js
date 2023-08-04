import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/pages/components/SearchBar';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Bookmark() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [lists, setLists] = useState([]);
  const [query, setQuery] = useState('');
  const [hoveredDocs, setHoveredDocs] = useState([]);
  const [hoveredLists, setHoveredLists] = useState([]);
  const [clickedDocs, setClickedDocs] = useState([]);
  const [clickedLists, setClickedLists] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('discord');
    }
  }, [status]);

  useEffect(() => {
    axios
      .get('/api/docs/callDocsDB')
      .then(res => {
        setDocs(res.data.result);
        setHoveredDocs(Array(res.data.result.length).fill(false));
        setClickedDocs(Array(res.data.result.length).fill(false));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('/api/list/callListDB')
      .then(res => {
        setLists(res.data.result);
        setHoveredLists(Array(res.data.result.length).fill(false));
        setClickedLists(Array(res.data.result.length).fill(false));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (session) {
      axios
        .post('/api/calluserDB', {
          name: session.user.name,
          email: session.user.email,
        })
        .then(res => {
          const bookmarkedDocs = res.data.result[0].bookmark.docs;
          const bookmarkedLists = res.data.result[0].bookmark.lists;
          const updatedClickedDocs = [...clickedDocs];
          const updatedClickedLists = [...clickedLists];

          bookmarkedDocs.forEach(bookmarkedDoc => {
            const index = docs.findIndex(doc => doc._id === bookmarkedDoc);
            if (index !== -1) {
              updatedClickedDocs[index] = true;
            }
          });

          bookmarkedLists.forEach(bookmarkedList => {
            const index = lists.findIndex(list => list._id === bookmarkedList);
            if (index !== -1) {
              updatedClickedLists[index] = true;
            }
          });

          setClickedDocs(updatedClickedDocs);
          setClickedLists(updatedClickedLists);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, docs, lists]);

  const handleSearch = query => {
    setQuery(query);
  };

  const filteredDocs = docs.filter((doc, index) => {
    if (query === '') {
      return clickedDocs[index];
    } else if (
      (doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.version.toLowerCase().includes(query.toLowerCase()) ||
        doc.edition.toLowerCase().includes(query.toLowerCase()) ||
        doc.tag[0].toLowerCase().includes(query.toLowerCase())) &&
      clickedDocs[index]
    ) {
      return doc;
    }
  });

  const filteredLists = lists.filter((list, index) => {
    if (query === '') {
      return clickedLists[index];
    } else if (
      (list.name.toLowerCase().includes(query.toLowerCase()) ||
        list.tagA.toLowerCase().includes(query.toLowerCase()) ||
        list.tagB.toLowerCase().includes(query.toLowerCase())) &&
      clickedLists[index]
    ) {
      return list;
    }
  });

  const handleMouseEnter = (index, type) => {
    if (type === 'doc') {
      setHoveredDocs(prevHoveredDocs => {
        const newHoveredDocs = [...prevHoveredDocs];
        newHoveredDocs[index] = true;
        return newHoveredDocs;
      });
    } else if (type === 'list') {
      setHoveredLists(prevHoveredLists => {
        const newHoveredLists = [...prevHoveredLists];
        newHoveredLists[index] = true;
        return newHoveredLists;
      });
    }
  };

  const handleMouseLeave = (index, type) => {
    if (type === 'doc') {
      setHoveredDocs(prevHoveredDocs => {
        const newHoveredDocs = [...prevHoveredDocs];
        newHoveredDocs[index] = false;
        return newHoveredDocs;
      });
    } else if (type === 'list') {
      setHoveredLists(prevHoveredLists => {
        const newHoveredLists = [...prevHoveredLists];
        newHoveredLists[index] = false;
        return newHoveredLists;
      });
    }
  };

  const handleDocClick = index => {
    if (session) {
      if (clickedDocs[index]) {
        axios
          .post('/api/docs/removeDocsBookmarkDB', {
            name: session.user.name,
            email: session.user.email,
            docID: docs[index]._id,
          })
          .then(res => {
            console.log(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .post('/api/docs/addDocsBookmarkDB', {
            name: session.user.name,
            email: session.user.email,
            docID: docs[index]._id,
          })
          .then(res => {
            console.log(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    setClickedDocs(prevClickedDocs => {
      const newClickedDocs = [...prevClickedDocs];
      newClickedDocs[index] = !newClickedDocs[index];
      return newClickedDocs;
    });
  };

  const handleListClick = index => {
    if (session) {
      if (clickedLists[index]) {
        axios
          .post('/api/list/removeListBookmarkDB', {
            name: session.user.name,
            email: session.user.email,
            docID: lists[index]._id,
          })
          .then(res => {
            console.log(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .post('/api/list/addListBookmarkDB', {
            name: session.user.name,
            email: session.user.email,
            docID: lists[index]._id,
          })
          .then(res => {
            console.log(res.data.message);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }

    setClickedLists(prevClickedLists => {
      const newClickedLists = [...prevClickedLists];
      newClickedLists[index] = !newClickedLists[index];
      return newClickedLists;
    });
  };

  return (
    <>
      <Head>
        <title>즐겨찾기</title>
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
          <main className="mb-12">
            <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-3">
              {filteredDocs.map((doc, index) => (
                <div key={doc._id} className="bg-[#202026] rounded-lg p-5">
                  <h1 className="text-2xl font-bold truncate">{doc.name}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{doc.version}</p>
                    </div>
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{doc.edition}</p>
                    </div>
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{doc.tag[0]}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      className="text-2xl pt-1.5"
                      onMouseEnter={() => handleMouseEnter(index, 'doc')}
                      onMouseLeave={() => handleMouseLeave(index, 'doc')}
                      onClick={() => handleDocClick(index)}
                    >
                      {clickedDocs[index] || hoveredDocs[index] ? <FaStar /> : <FaRegStar />}
                    </button>
                    <button
                      className="font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 transition-all rounded-lg"
                      onClick={() => router.push(`/docs/${doc._id}`)}
                    >
                      더보기
                    </button>
                  </div>
                </div>
              ))}
              {filteredLists.map((list, index) => (
                <div key={list._id} className="bg-[#202026] rounded-lg p-5">
                  <h1 className="text-2xl font-bold truncate">{list.name}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{list.tagA}</p>
                    </div>
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{list.tagB}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button
                      className="text-2xl pt-1.5"
                      onMouseEnter={() => handleMouseEnter(index, 'list')}
                      onMouseLeave={() => handleMouseLeave(index, 'list')}
                      onClick={() => handleListClick(index)}
                    >
                      {clickedLists[index] || hoveredLists[index] ? <FaStar /> : <FaRegStar />}
                    </button>
                    <button
                      className="font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 transition-all rounded-lg"
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
