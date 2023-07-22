import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/pages/components/SearchBar';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [hoveredBlocks, setHoveredBlocks] = useState([]);
  const [clickedBlocks, setClickedBlocks] = useState([]);
  const [loadedDocs, setLoadedDocs] = useState([]);
  const [remainingDocs, setRemainingDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get('/api/docs/callDocsDB');
        const loaded = res.data.result.slice(0, 15);
        const remaining = res.data.result.slice(15);
        setLoadedDocs(loaded);
        setRemainingDocs(remaining);
        setHoveredBlocks(Array(loaded.length).fill(false));
        setClickedBlocks(Array(loaded.length).fill(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocs();

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (session) {
      const fetchBookmarkedDocs = async () => {
        try {
          const res = await axios.post('/api/callBookmarkDB', {
            name: session.user.name,
            email: session.user.email,
          });
          const bookmarkedDocs = res.data.result[0].bookmark.docs;
          setClickedBlocks(prevClickedBlocks => {
            const newClickedBlocks = [...prevClickedBlocks];
            bookmarkedDocs.forEach(bookmarkedDoc => {
              const index = loadedDocs.findIndex(doc => doc._id === bookmarkedDoc);
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

      fetchBookmarkedDocs();
    }
  }, [session, loadedDocs]);

  const handleSearch = query => {
    setQuery(query);

    if (query === '') {
      setLoadedDocs([]);
      setRemainingDocs([]);
      const fetchDocs = async () => {
        try {
          const res = await axios.get('/api/docs/callDocsDB');
          const loaded = res.data.result.slice(0, 15);
          const remaining = res.data.result.slice(15);
          setLoadedDocs(loaded);
          setRemainingDocs(remaining);
          setHoveredBlocks(Array(loaded.length).fill(false));
          setClickedBlocks(Array(loaded.length).fill(false));
        } catch (error) {
          console.log(error);
        }
      };

      fetchDocs();
      return;
    }

    const filteredRemainingDocs = remainingDocs.filter(doc => {
      if (
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.version.toLowerCase().includes(query.toLowerCase()) ||
        doc.edition.toLowerCase().includes(query.toLowerCase()) ||
        doc.tag[0].toLowerCase().includes(query.toLowerCase())
      ) {
        return doc;
      }
    });

    setLoadedDocs(prevLoadedDocs => [...prevLoadedDocs, ...filteredRemainingDocs.slice(0, 15)]);
    setRemainingDocs(filteredRemainingDocs.slice(15));
  };

  const filteredDocs = loadedDocs.filter(doc => {
    if (query === '') {
      return doc;
    } else if (
      doc.name.toLowerCase().includes(query.toLowerCase()) ||
      doc.version.toLowerCase().includes(query.toLowerCase()) ||
      doc.edition.toLowerCase().includes(query.toLowerCase()) ||
      doc.tag[0].toLowerCase().includes(query.toLowerCase())
    ) {
      return doc;
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
      const docID = loadedDocs[index]._id;
      const clicked = clickedBlocks[index];

      const handleBookmarkDoc = async () => {
        try {
          if (clicked) {
            await axios.post('/api/docs/removeDocsBookmarkDB', {
              name: session.user.name,
              email: session.user.email,
              docID: docID,
            });
          } else {
            await axios.post('/api/docs/addDocsBookmarkDB', {
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

  const loadMoreDocs = () => {
    setLoadedDocs(prevLoadedDocs => [...prevLoadedDocs, ...remainingDocs.slice(0, 15)]);
    setRemainingDocs(prevRemainingDocs => prevRemainingDocs.slice(15));
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight;

      if (isScrolledToBottom && remainingDocs.length > 0) {
        loadMoreDocs();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingDocs]);

  return (
    <>
      <Head>
        <title>MINE DOCS</title>
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
                      onClick={() => router.push(`/docs/${doc._id}`)}
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
