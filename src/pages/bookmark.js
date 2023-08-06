import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/pages/components/SearchBar';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

export default function Bookmark() {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState([]);
  const [lists, setLists] = useState([]);
  const [query, setQuery] = useState('');
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
        setClickedDocs(Array(res.data.result.length).fill(false));
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get('/api/list/callListDB')
      .then(res => {
        setLists(res.data.result);
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
          const updatedClickedDocs = Array(docs.length).fill(false);
          const updatedClickedLists = Array(lists.length).fill(false);

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
  }, [session, docs, lists]);

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
      return true;
    }
    return false;
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
      return true;
    }
    return false;
  });

  const handleSearch = query => {
    setQuery(query);
  };

  const handleDocsRemove = index => {
    if (session) {
      axios
        .post('/api/docs/removeDocsBookmarkDB', {
          name: session.user.name,
          email: session.user.email,
          docID: docs[index]._id,
        })
        .then(res => {
          console.log(res.data.message);
          setClickedDocs(prevClickedDocs => {
            const newClickedDocs = [...prevClickedDocs];
            newClickedDocs[index] = false; // Reset the bookmark status
            return newClickedDocs;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleListRemove = index => {
    if (session) {
      axios
        .post('/api/list/removeListBookmarkDB', {
          name: session.user.name,
          email: session.user.email,
          docID: lists[index]._id,
        })
        .then(res => {
          console.log(lists[index]._id);
          console.log(res.data.message);
          setClickedLists(prevClickedLists => {
            const newClickedLists = [...prevClickedLists];
            newClickedLists[index] = false; // Reset the bookmark status
            return newClickedLists;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Head>
        <title>즐겨찾기</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
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
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-bold truncate">{doc.name}</h1>
                    <h1 className="text-xl text-gray-500 pt-1 font-bold">독스</h1>
                  </div>
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
                    <button className="text-2xl pt-1.5" onClick={() => handleDocsRemove(index)}>
                      <FaStar className="hover:fill-gray-600 fill-[#f1f1f1] transition-all" />
                    </button>
                    <button
                      className="font-bold text-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-all rounded-lg"
                      onClick={() => router.push(`/docs/${doc._id}`)}
                    >
                      더보기
                    </button>
                  </div>
                </div>
              ))}
              {filteredLists.map((list, index) => (
                <div key={list._id} className="bg-[#202026] rounded-lg p-5">
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-bold truncate">{list.name}</h1>
                    <h1 className="text-xl text-gray-500 pt-1 font-bold">리스트</h1>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{list.tagA}</p>
                    </div>
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                      <p className="font-bold">{list.tagB}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <button className="text-2xl pt-1.5" onClick={() => handleListRemove(index)}>
                      <FaStar className="hover:fill-gray-600 fill-[#f1f1f1] transition-all" />
                    </button>
                    <button
                      className="font-bold text-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-all rounded-lg"
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
