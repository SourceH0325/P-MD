import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import axios from 'axios'
import VerEx from 'verbal-expressions'
import NameInput from '@/pages/components/docs/add/AddNameInput'
import AddressInput from '@/pages/components/docs/add/AddAddressInput'
import ExplanationInput from '@/pages/components/docs/add/AddExplanationInput'
import VersionInput from '@/pages/components/docs/add/AddVersionInput'
import UrlInput from '@/pages/components/docs/add/AddUrlInput'
import TagInput from '@/pages/components/docs/add/AddTagInput'

export default function Add_Docs() {
  const router = useRouter()

  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('discord')
    }
  }, [status])

  const handleTagChange = (selectedTags) => {
    setTag(selectedTags)
  }

  const [tag, setTag] = useState([])
  const [edition, setEdition] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false)

  // URL 정규식
  const Web = VerEx()
    .startOfLine()
    .then('http')
    .maybe('s')
    .then('://')
    .maybe('www.')
    .anythingBut(' ')
    .endOfLine()

  const getMultipleVersionsLabel = () => {
    if (selectedVersion?.type === 'multiple') {
      const selectedVersions = selectedVersion.multipleVersions.map(
        (version) => version.label,
      )
      const additionalCount = selectedVersion.multipleVersions.length - 1
      return `${selectedVersions[0]} 외 ${additionalCount}개`
    }
    return ''
  }

  const handleComplete = () => {
    setIsSaveButtonDisabled(true)

    if (status === 'unauthenticated') {
      alert('로그인이 필요합니다!')
      setIsSaveButtonDisabled(false)
      return
    }

    let check_version = false
    let check_edition = false
    let check_tag = false
    let check_url = false
    let check_name = false
    let check_explanation = false
    let check_address = false
    let url = []
    let errMessages = []

    // 버전 확인
    if (selectedVersion == null) {
      errMessages.push('버전')
      check_version = false
    } else {
      check_version = true
    }

    // 에디션 확인
    if (edition == null) {
      errMessages.push('에디션')
      check_edition = false
      setIsSaveButtonDisabled(false)
    } else {
      check_edition = true
    }

    // 태그 확인
    if (tag == null) {
      errMessages.push('태그')
      check_tag = false
      setIsSaveButtonDisabled(false)
    } else {
      check_tag = true
    }

    // URL 확인
    if (document.querySelector('#UrlList').children.length == 0) {
      check_url = true
    } else if (document.querySelector('#UrlName').value == '') {
      errMessages.push('링크 이름')
      check_url = false
      setIsSaveButtonDisabled(false)
    } else if (Web.test(document.querySelector('#UrlLink').value) == false) {
      errMessages.push('링크 주소')
      check_url = false
      setIsSaveButtonDisabled(false)
    } else {
      check_url = true
      let url_name = Array.from(document.querySelectorAll('#UrlName')).map(
        (url) => url.value,
      )
      let url_link = Array.from(document.querySelectorAll('#UrlLink')).map(
        (url) => url.value,
      )
      for (let i = 0; i < url_name.length; i++) {
        url.push({ name: url_name[i], link: url_link[i] })
      }
    }

    // 이름 확인
    if (document.querySelector('#Name').value == '') {
      errMessages.push('이름')
      check_name = false
      setIsSaveButtonDisabled(false)
    } else {
      check_name = true
    }

    // 설명 확인
    if (document.querySelector('#Explanation').value == '') {
      errMessages.push('설명')
      check_explanation = false
      setIsSaveButtonDisabled(false)
    } else {
      check_explanation = true
    }

    // 주소 확인
    if (document.querySelector('#Address').value == '') {
      errMessages.push('주소')
      check_address = false
      setIsSaveButtonDisabled(false)
    } else {
      check_address = true
    }

    if (errMessages.length > 0) {
      alert(`${errMessages.join(', ')}를 입력해주세요!`)
      setIsSaveButtonDisabled(false)
    }

    // 최종 확인
    if (
      check_version &&
      check_edition &&
      check_tag &&
      check_url &&
      check_name &&
      check_explanation &&
      check_address
    ) {
      let versionLabel
      let multipleVersions

      if (selectedVersion.type === 'single') {
        versionLabel = selectedVersion.singleVersion.label
        multipleVersions = null
      } else if (selectedVersion.type === 'multiple') {
        multipleVersions = selectedVersion.multipleVersions.map(
          (version) => version.label,
        )
        versionLabel = getMultipleVersionsLabel()
      } else if (selectedVersion.type === 'range') {
        versionLabel = `${selectedVersion.minVersion.label} ~ ${selectedVersion.maxVersion.label}`
        multipleVersions = null
      }

      const doc = {
        name: document.querySelector('#Name').value,
        explanation: document.querySelector('#Explanation').value,
        address: document.querySelector('#Address').value,
        version: versionLabel,
        multiple: multipleVersions,
        edition: edition,
        tag: tag.map((t) => t.value),
        url: url,
      }

      axios
        .post('/api/docs/addDocsDB', doc)
        .then((response) => {
          console.log(response)
          alert('독스 추가가 완료되었습니다!')
          return axios.post('/api/addHistoryDB', {
            type: 'add_docs',
            data: {
              docs: doc,
            },
            user: session.user.name,
          })
        })
        .then((response) => {
          console.log(response)
          router.replace('/')
        })
        .catch((error) => {
          console.log(error)
          alert('독스 추가에 실패했습니다!')
        })
        .finally(() => {
          setIsSaveButtonDisabled(false)
        })
    }
  }

  return (
    <>
      <Head>
        <title>독스 추가하기</title>
        <meta
          name="description"
          content="마인크래프트 서버의 플레이를 도와줍니다."
        />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div className="grid gap-4 grid-rows-auto grid-cols-1">
            <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
              <NameInput />
              <AddressInput />
            </div>

            <ExplanationInput />

            <div className="grid gap-4 grid-cols-1 mobile:grid-cols-2 grid-rows-auto">
              <VersionInput
                selectedVersion={selectedVersion}
                setSelectedVersion={setSelectedVersion}
                edition={edition}
                setEdition={setEdition}
              />
              <TagInput onTagChange={handleTagChange} />
            </div>

            <UrlInput />

            <div className="flex justify-end items-center mt-8 w-auto">
              <div className="flex items-center">
                <button
                  className="font-bold text-lg bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
                  onClick={() => router.replace('/')}
                >
                  취소
                </button>
                <button
                  className="font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 transition-all rounded-lg"
                  onClick={handleComplete}
                  disabled={isSaveButtonDisabled}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
