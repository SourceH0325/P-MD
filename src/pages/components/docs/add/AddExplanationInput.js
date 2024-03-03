import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import markdownit from 'markdown-it'
import rehypeRaw from 'rehype-raw'

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  gfm: true, // Enable GitHub Flavored Markdown
})

const ExplanationInput = () => {
  const [text, setText] = useState('')
  const textAreaRef = useRef(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }, [text])

  const RenderImage = (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        {...props}
        style={{ maxWidth: '100%', height: 'auto' }}
        alt={props.alt}
      />
    )
  }

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const markdown = md.render(text)

  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">설명을 적어주세요!</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">
        서버에 대한 설명을 설정합니다.
      </p>
      <textarea
        ref={textAreaRef}
        className="mt-4 p-2.5 w-full bg-[#17171b] text-left text-white rounded-lg resize-none outline-none min-h-[200px]"
        id="Explanation"
        type="text"
        placeholder="예: 마인독스는 사이트입니다."
        value={text}
        onChange={handleChange}
      />
      <p className="mt-3 text-lg text-gray-500 font-bold">미리보기</p>
      <ReactMarkdown
        className="mt-3 p-2.5 w-full bg-[#17171b] text-left text-white rounded-lg markdown-content min-h-[200px]"
        components={{ img: RenderImage }}
        rehypePlugins={[rehypeRaw]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default ExplanationInput
