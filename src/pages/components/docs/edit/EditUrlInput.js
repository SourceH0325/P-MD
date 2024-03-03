import React, { useState, useEffect } from 'react'

const UrlInput = ({ docs }) => {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    if (docs.length > 0) {
      const initialUrls = docs.map((doc) => {
        return doc.url.map((url) => {
          return { name: url.name, link: url.link }
        })
      })

      const flattenedUrls = initialUrls.flat()

      setUrls(flattenedUrls)
    }
  }, [docs])

  const handleAddUrl = () => {
    if (urls.length >= 5) {
      alert('링크는 최대 5개까지 추가할 수 있습니다!')
      return
    }

    setUrls((prevUrls) => [...prevUrls, { name: '', link: '' }])
  }

  const handleRemoveUrl = () => {
    if (urls.length === 0) {
      return
    }

    setUrls((prevUrls) => prevUrls.slice(0, prevUrls.length - 1))
  }

  const handleUrlChange = (index, field, value) => {
    setUrls((prevUrls) =>
      prevUrls.map((url, i) =>
        i === index ? { ...url, [field]: value } : url,
      ),
    )
  }

  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">링크를 설정해 주세요!</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">
        상세 설명에 링크를 설정합니다.
      </p>
      <div id="UrlList" className="grid gap-0 grid-rows-auto grid-cols-1">
        {urls.map((url, index) => (
          <div
            key={index}
            id="UrlID"
            className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-2"
          >
            <input
              id="UrlName"
              maxLength="5"
              className="mt-4 px-2.5 pb-1 w-full h-12 bg-[#17171b] text-left text-white rounded-lg"
              type="text"
              placeholder="예: 마인독스"
              value={url.name}
              onChange={(e) => handleUrlChange(index, 'name', e.target.value)}
            />
            <input
              id="UrlLink"
              className="mt-4 px-2.5 pb-1 w-full h-12 bg-[#17171b] text-left text-white rounded-lg"
              type="text"
              placeholder="예: https://example.com"
              value={url.link}
              onChange={(e) => handleUrlChange(index, 'link', e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-start">
        <button
          className="font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
          onClick={handleAddUrl}
        >
          추가하기
        </button>
        <button
          className="font-bold text-lg bg-gray-600 hover:bg-gray-700 rounded-lg px-4 py-2 transition-all mr-2"
          onClick={handleRemoveUrl}
        >
          제거하기
        </button>
      </div>
    </div>
  )
}

export default UrlInput
