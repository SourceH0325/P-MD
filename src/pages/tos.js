import Head from 'next/head';

export default function Tos() {
  return (
    <>
      <Head>
        <title>이용약관</title>
        <meta name="description" content="이용약관" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <h1 className="text-start font-bold text-2xl">마인 독스 이용약관</h1>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제1조 (목적)</h2>
            <p className="mt-2">
              본 약관은 MINE DOCS(이하 &#34;회사&#34;)가 운영하는 웹사이트 &#39;MINE DOCS&#39;(이하
              &#34;서비스&#34;)에서 제공하는 서비스의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을
              목적으로 합니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제2조 (용어의 정의)</h2>
            <p className="mt-2">본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2 bg-gray-800">용어</th>
                  <th className="border border-gray-600 px-4 py-2 bg-gray-800">정의</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">서비스</td>
                  <td className="border border-gray-600 px-4 py-2">
                    회사가 제공하는 웹사이트 &#39;MINE DOCS&#39;를 의미합니다.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">이용자</td>
                  <td className="border border-gray-600 px-4 py-2">
                    &#34;서비스&#34;에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">회원</td>
                  <td className="border border-gray-600 px-4 py-2">
                    &#34;서비스&#34;에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제3조 (약관의 게시와 개정)</h2>
            <p className="mt-2">
              회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 &#34;서비스&#34; 초기 화면에 게시합니다. 회사는 필요한
              경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있습니다. 약관이 개정되는 경우 회사는
              개정된 약관의 내용과 개정의 시행일자를 명시하여 &#34;서비스&#34; 초기 화면에 그 적용일자 7일 이전부터
              적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관 내용을 변경하는 경우에는 최소한 30일 이상의
              사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가
              알기 쉽도록 표시합니다. 회사가 약관을 개정할 경우에는 개정 약관의 적용일자 이후에도 &#34;서비스&#34;를
              이용하는 이용자는 개정 약관에 동의한 것으로 간주합니다. 이용자가 개정 약관에 동의하지 않는 경우, 이용자는
              개정 약관의 적용일자 이전까지 회사에 거부의사를 표시하고 이용계약을 해지할 수 있습니다. 이용자가 개정
              약관의 적용일자 이후에도 &#34;서비스&#34;를 계속 사용하는 경우에는 개정 약관에 동의한 것으로 간주합니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제4조 (약관의 해석)</h2>
            <p className="mt-2">
              회사는 이용자가 &#34;서비스&#34;를 이용하고자 할 때 본 약관을 게시하여 이용자가 쉽게 알 수 있도록 합니다.
              회사는 &#34;서비스&#34;를 통해 이용자에게 제공하는 각종 서비스에 대한 별도의 이용약관 및 운영정책(이하
              &#34;개별약관 등&#34;)을 둘 수 있으며, 이 경우 개별약관 등의 내용이 본 약관과 상충할 때에는 개별약관 등이
              우선하여 적용됩니다. 본 약관에서 정하지 아니한 사항이나 해석에 대해서는 개별약관 등 및 관계법령 또는
              상관례에 따릅니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제5조 (이용계약의 체결 및 적용)</h2>
            <p className="mt-2">
              이용계약은 이용자가 디스코드 계정으로 로그인하는 것으로 효력이 발생합니다. 이용자는 본 약관에 동의함으로써
              이용계약을 체결하게 됩니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제6조 (이용계약의 종료)</h2>
            <p className="mt-2">
              이용자는 언제든지 회사에게 이용계약의 해지를 요청할 수 있으며, 회사는 이를 즉시 처리합니다. 이용계약은
              이용자의 해지 요청에 회사가 승낙한 시점에 종료됩니다. 이용계약이 종료되면 이용자의 디스코드 계정에 대한
              접근 권한이 제한됩니다. 이용계약이 종료되면 이용자의 디스코드 계정에 대한 접근 권한이 제한됩니다. 단,
              이용계약 종료 이전에 이미 체결된 서비스 이용계약이 있는 경우에는 서비스 이용계약에 따른 이용기간 동안은
              이용계약이 유지됩니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제7조 (이용자의 의무)</h2>
            <p className="mt-2">이용자는 다음 각 호의 행위를 하여서는 아니 됩니다.</p>
            <p className="mt-2">
              ① 회사의 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제, 유통, 조장하거나 상업적으로 이용하는
              행위
            </p>
            <p className="mt-2">
              ② 회사의 서비스를 이용하여 제3자에게 본인을 가장하거나 타인과의 관계를 허위로 명시하는 행위
            </p>
            <p className="mt-2">
              ③ 회사의 서비스를 이용하여 제3자에게 피해를 주거나 불이익을 가하거나 제3자의 지적재산권을 침해하는 행위
            </p>
            <p className="mt-2">
              ④ 회사의 서비스를 이용하여 음란, 저속한 정보를 교류, 게재하거나 공공질서 및 미풍양속에 위반되는 정보,
              문장, 도형 등을 타인에게 유포하는 행위
            </p>
            <p className="mt-2">⑤ 회사의 서비스를 이용하여 자기 또는 타인에게 재산상의 이익을 발생시키는 행위</p>
            <p className="mt-2">
              ⑥ 회사의 서비스를 이용하여 타인의 명예를 훼손하거나 타인의 지적재산권을 침해하는 행위
            </p>
            <p className="mt-2">⑦ 회사의 서비스를 이용하여 범죄와 결부된다고 객관적으로 판단되는 행위</p>
            <p className="mt-2">⑧ 회사의 서비스를 이용하여 자기 또는 타인에게 재산상의 이익을 발생시키는 행위</p>
            <p className="mt-2">
              ⑨ 회사의 서비스를 이용하여 타인의 명예를 훼손하거나 타인의 지적재산권을 침해하는 행위
            </p>
            <p className="mt-2">⑩ 회사의 서비스를 이용하여 범죄와 결부된다고 객관적으로 판단되는 행위</p>
            <p className="mt-2">⑪ 회사의 서비스를 이용하여 타인의 개인정보를 수집, 저장, 공개하는 행위</p>
            <p className="mt-2">⑫ 회사의 서비스를 이용하여 광고성 정보를 전송하는 행위</p>
            <p className="mt-2">⑬ 회사의 서비스를 이용하여 스토킹(stalking) 등 다른 이용자를 괴롭히는 행위</p>
            <p className="mt-2">⑭ 회사의 서비스를 이용하여 다른 이용자를 희롱하거나, 서비스 이용을 방해하는 행위</p>
            <p className="mt-2">⑮ 회사의 서비스를 이용하여 자신의 계정을 타인에게 매매하거나 양도하는 행위</p>
            <p className="mt-2">⑯ 회사의 서비스를 이용하여 타인의 계정을 도용하는 행위</p>
            <p className="mt-2">⑰ 회사의 서비스를 이용하여 자신의 계정 또는 타인의 계정을 부정하게 사용하는 행위</p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제8조 (회사의 의무)</h2>
            <p className="mt-2">
              회사는 이용자가 안전하게 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안
              시스템을 갖추어야 하며 개인정보취급방침을 공시하고 준수합니다. 회사는 이용자가 수신 동의를 하지 않은
              영리목적의 광고성 전자우편을 발송하지 않습니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제9조 (공개게시물의 삭제 또는 이용제한)</h2>
            <p className="mt-2">
              회사는 이용자가 게시하거나 등록하는 서비스 내의 내용물, 게시 내용물이 다음 각 호에 해당한다고 판단되는
              경우에는 사전통지 없이 삭제하거나 이동 또는 등록을 거부할 수 있습니다.
            </p>

            <p className="mt-2">① 다른 이용자 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우</p>
            <p className="mt-2">② 공공질서 및 미풍양속에 위반되는 내용인 경우</p>
            <p className="mt-2">③ 범죄적 행위에 결부된다고 인정되는 내용일 경우</p>
            <p className="mt-2">④ 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우</p>
            <p className="mt-2">⑤ 서비스 성격에 부합하지 않는 정보의 경우</p>
            <p className="mt-2">⑥ 기타 관계법령에 위배된다고 판단되는 경우</p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제10조 (게시물의 저작권)</h2>
            <p className="mt-2">
              이용자가 서비스 내에 게시한 게시물의 저작권은 게시자 본인에게 귀속됩니다. 이용자가 서비스 내에 게시하는
              게시물은 검색결과 내지 회사의 다른 서비스, 전자우편 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위
              내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 또한 회사는 서비스 운영, 개선 및 새로운 서비스
              개발을 위한 목적으로 이용자가 게시한 게시물을 복제, 수정, 전송할 수 있습니다. 이 경우 회사는 관련 법령을
              준수하며, 이용자는 언제든지 회사에게 복제, 수정, 전송을 거부할 수 있습니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제11조 (권리의 귀속)</h2>
            <p className="mt-2">
              회사가 제공하는 서비스에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단, 이용자가 회사에 제공하는
              게시물 등의 저작권은 제12조에 따릅니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제12조 (개인정보보호)</h2>
            <p className="mt-2">
              회사는 이용자의 정보수집 시 서비스제공을 위하여 필요한 범위에서 최소한의 정보를 수집합니다. 회사는
              관계법령이 정하는 바에 따라 이용자 등록정보를 포함한 이용자의 개인정보를 보호하기 위하여 노력합니다.
              이용자의 개인정보보호에 관해서는 관련법령 및 회사의 개인정보취급방침이 적용됩니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제16조 (재판관할)</h2>
            <p className="mt-2">
              서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 전속관할로
              합니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">부칙</h2>
            <p className="mt-2">이 약관은 2023년 6월 15일부터 적용됩니다.</p>
          </div>
        </main>
      </div>
    </>
  );
}
