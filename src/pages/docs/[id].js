import Head from 'next/head'
import { MdEdit } from 'react-icons/md'
import { FaPlus, FaStar, FaHistory } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import SearchBar from '@/pages/components/SearchBar'
import Loading from '@/pages/components/load/DocsLoad'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import axios from 'axios'

export default function Home({ SSDocs }) {
  const router = useRouter()
  const id = router.query.id

  const { data: session } = useSession()

  const textAreaRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [docs, setDocs] = useState([])
  const [query, setQuery] = useState('')
  const [clickedBlocks, setClickedBlocks] = useState([])
  const [loadedLists, setLoadedLists] = useState([])
  const [remainingLists, setRemainingLists] = useState([])

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/docs/callDocsDB/${id}`)
        .then((res) => {
          setDocs(res.data.result)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const fetchLists = async () => {
      try {
        const res = await axios.get(`/api/docs/callLinkDocsDB/${id}`)
        const lists = res.data.result
        lists.sort((a, b) => {
          const tagComparison = a.tagA.localeCompare(b.tagA)
          if (tagComparison !== 0) {
            return tagComparison
          }

          return a.name.localeCompare(b.name)
        })
        const loaded = lists.slice(0, 15)
        const remaining = lists.slice(15)
        setLoadedLists(loaded)
        setRemainingLists(remaining)
        setClickedBlocks(Array(loaded.length).fill(false))
      } catch (error) {
        console.log(error)
      }
    }

    fetchLists()
  }, [id])

  useEffect(() => {
    if (session) {
      const fetchBookmarkedLists = async () => {
        try {
          const res = await axios.post('/api/calluserDB', {
            name: session.user.name,
            email: session.user.email,
          })
          const bookmarkedLists = res.data.result[0].bookmark.lists
          setClickedBlocks((prevClickedBlocks) => {
            const newClickedBlocks = [...prevClickedBlocks]
            bookmarkedLists.forEach((bookmark) => {
              const index = loadedLists.findIndex(
                (list) => list._id === bookmark,
              )
              if (index !== -1) {
                newClickedBlocks[index] = true
              }
            })
            return newClickedBlocks
          })
        } catch (error) {
          console.log(error)
        }
      }

      fetchBookmarkedLists()
    }
  }, [session, loadedLists])

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }, [docs])

  const queryWords = query.split(' ')

  const handleSearch = (query) => {
    setQuery(query)

    if (query === '') {
      setLoadedLists([])
      setRemainingLists([])
      const fetchLists = async () => {
        try {
          const res = await axios.get(`/api/docs/callLinkDocsDB/${id}`)
          const lists = res.data.result
          lists.sort((a, b) => {
            const tagComparison = a.tagA.localeCompare(b.tagA)
            if (tagComparison !== 0) {
              return tagComparison
            }

            return a.name.localeCompare(b.name)
          })
          const loaded = lists.slice(0, 15)
          const remaining = lists.slice(15)
          setLoadedLists(loaded)
          setRemainingLists(remaining)
          setClickedBlocks(Array(loaded.length).fill(false))
          setIsLoading(false)
        } catch (error) {
          console.log(error)
        }
      }

      fetchLists()
      return
    }

    const filteredRemainingLists = remainingLists.filter((list) => {
      return queryWords.every(
        (word) =>
          list.result_content.some(
            (content) =>
              content.title.toLowerCase().includes(word.toLowerCase()) ||
              content.content.toLowerCase().includes(word.toLowerCase()),
          ) ||
          list.name.toLowerCase().includes(word.toLowerCase()) ||
          list.tagA.toLowerCase().includes(word.toLowerCase()) ||
          list.tagB.toLowerCase().includes(word.toLowerCase()),
      )
    })

    setLoadedLists((prevLoadedLists) => [
      ...prevLoadedLists,
      ...filteredRemainingLists.slice(0, 15),
    ])
    setRemainingLists(filteredRemainingLists.slice(15))
  }

  const filteredLists = loadedLists.filter((list) => {
    if (query === '') {
      return list
    } else {
      return queryWords.every(
        (word) =>
          list.result_content.some(
            (content) =>
              content.title.toLowerCase().includes(word.toLowerCase()) ||
              content.content.toLowerCase().includes(word.toLowerCase()),
          ) ||
          list.name.toLowerCase().includes(word.toLowerCase()) ||
          list.tagA.toLowerCase().includes(word.toLowerCase()) ||
          list.tagB.toLowerCase().includes(word.toLowerCase()),
      )
    }
  })

  const handleClick = (index) => {
    if (session) {
      const docID = loadedLists[index]._id
      const clicked = clickedBlocks[index]

      const handleBookmarkDoc = async () => {
        try {
          if (clicked) {
            await axios.post('/api/list/removeListBookmarkDB', {
              name: session.user.name,
              email: session.user.email,
              docID: docID,
            })
          } else {
            await axios.post('/api/list/addListBookmarkDB', {
              name: session.user.name,
              email: session.user.email,
              docID: docID,
            })
          }
        } catch (error) {
          console.log(error)
        }
      }

      handleBookmarkDoc()
    }

    setClickedBlocks((prevClickedBlocks) => {
      const newClickedBlocks = [...prevClickedBlocks]
      newClickedBlocks[index] = !newClickedBlocks[index]
      return newClickedBlocks
    })
  }

  const loadMoreLists = () => {
    setLoadedLists((prevLoadedLists) => [
      ...prevLoadedLists,
      ...remainingLists.slice(0, 15),
    ])
    setRemainingLists((prevRemainingLists) => prevRemainingLists.slice(15))
  }

  const RenderImage = (props) => {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        style={{ maxWidth: '100%', height: 'auto' }}
        alt={props.alt}
      />
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight
      const reachedBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

      if (reachedBottom && remainingLists.length > 0) {
        loadMoreLists()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingLists, docs])

  return (
    <>
      <Head>
        <title>
          {SSDocs && SSDocs.length > 0
            ? `${SSDocs[0].name} - 마인독스`
            : '마인독스'}
        </title>
        <meta
          name="og:title"
          content={
            SSDocs && SSDocs.length > 0
              ? `${SSDocs[0].name} - 마인독스`
              : '마인독스'
          }
        />
        <meta
          property="og:description"
          content="마인크래프트 서버의 플레이를 도와줍니다."
        />
      </Head>

      <SearchBar
        onSearch={handleSearch}
        placeholder="이름, 태그 등을 검색해 보세요!"
      />

      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-4 mobile:mx-0">
          <div className="flex justify-center items-center h-auto w-full mb-8">
            {docs.map((doc) => (
              <div
                key={doc._id}
                className="bg-[#202026] rounded-lg p-5 w-full shadow-lg"
              >
                <div className="flex justify-between items-center w-auto">
                  <div className="flex flex-col mobile:flex-row items-center">
                    <h1 className="text-2xl font-bold text-white mr-0 mobile:mr-3">
                      {doc.name}
                    </h1>
                    <p
                      className="text-lg text-gray-500 font-bold cursor-pointer transition-all rounded-lg px-2 py-1 hover:text-white hover:bg-blue-700"
                      onClick={() => {
                        const serverAddress = doc.address
                        navigator.clipboard.writeText(serverAddress)
                        alert(`${serverAddress}를 클립보드에 복사했습니다!`)
                      }}
                    >
                      {doc.address}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="mr-2 rounded-lg text-lg px-4 py-2 font-bold bg-gray-600 hover:bg-gray-700 transition-all"
                      onClick={() => router.push(`/history/${doc._id}`)}
                    >
                      <FaHistory />
                    </button>
                    <button
                      className="mr-2 rounded-lg text-lg px-4 py-2 font-bold bg-blue-600 hover:bg-blue-700 transition-all hidden mobile:block"
                      onClick={() => router.push(`/lists/add_list/${doc._id}`)}
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="rounded-lg text-lg px-4 py-2 font-bold bg-green-600 hover:bg-green-700 transition-all"
                      onClick={() => router.push(`/docs/edit_docs/${doc._id}`)}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {doc.multiple !== null ? (
                    doc.multiple.map((multiple, index) => (
                      <div
                        key={index}
                        className="bg-gray-700/60 rounded-lg px-2 py-1 mt-2"
                      >
                        <p className="font-medium text-white">{multiple}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-700/60 rounded-lg px-2 py-1 mt-2">
                      <p className="font-medium text-white">{doc.version}</p>
                    </div>
                  )}
                  <div className="bg-gray-700/60 rounded-lg px-2 py-1 mt-2">
                    <p className="font-medium text-white">{doc.edition}</p>
                  </div>
                  {doc.tag.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-700/60 rounded-lg px-2 py-1 mt-2"
                      >
                        <p className="font-medium text-white">{tag}</p>
                      </div>
                    )
                  })}
                </div>

                <ReactMarkdown
                  className="bg-gray-700/60 rounded-lg px-2 py-1 mt-4 markdown-content"
                  components={{ img: RenderImage }}
                  rehypePlugins={[rehypeRaw]}
                >
                  {doc.explanation}
                </ReactMarkdown>

                <div
                  className="flex items-center w-auto mt-4 whitespace-nowrap overflow-auto mobile:justify-end"
                  id="LinkList_Main"
                >
                  {doc.url.map((doc, index) => (
                    <button
                      key={index}
                      className="rounded-lg text-lg px-2 pb-1.5 pt-1 mobile:ml-2 mobile:mr-0 mr-2 ml-0 font-bold bg-blue-600 hover:bg-blue-700 transition-all relative"
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
            {filteredLists.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 grid-rows-auto mobile:grid-cols-3">
                {filteredLists.map((list, index) => (
                  <div key={list._id} className="bg-[#202026] rounded-lg p-5">
                    <h1 className="text-2xl font-bold truncate">{list.name}</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                        <p className="font-medium">{list.tagA}</p>
                      </div>
                      <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                        <p className="font-medium">{list.tagB}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        className="text-2xl pt-1.5"
                        onClick={() => handleClick(index)}
                      >
                        {clickedBlocks[index] ? (
                          <FaStar className="fill-[#f1f1f1] hover:fill-gray-600 transition-all" />
                        ) : (
                          <FaStar className="fill-gray-600 hover:fill-[#f1f1f1] transition-all" />
                        )}
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
            ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <h1 className="text-2xl font-bold">검색 결과가 없습니다.</h1>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id
  const res = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/docs/callDocsDB/${id}`,
  )
  const SSDocs = res.data.result
  return {
    props: {
      SSDocs,
    },
  }
}
