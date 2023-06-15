import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>개인정보처리방침</title>
        <meta name="description" content="개인정보처리방침" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <h1 className="text-start font-bold text-2xl">마인 독스 개인정보처리방침</h1>
          <p className="mt-2">
            MINE DOCS (&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;)은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를
            보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을
            수립·공개합니다.
          </p>

          <div className="mt-20">
            <h2 className="text-start font-bold text-xl">제1조(개인정보의 처리 목적)</h2>
            <p className="mt-2">
              MINE DOCS (&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;)은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
              개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」
              제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">목적</th>
                  <th className="border border-gray-600 px-4 py-2">항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">홈페이지 회원가입 및 관리</td>
                  <td className="border border-gray-600 px-4 py-2">
                    회원자격 유지·관리, 서비스 부정이용 방지, 고충처리 목적으로 개인정보를 처리합니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제2조(개인정보의 처리 및 보유 기간)</h2>
            <p className="mt-2">
              ① MINE DOCS (&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;)은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
              개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <p className="mt-2">② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">항목</th>
                  <th className="border border-gray-600 px-4 py-2">보유근거</th>
                  <th className="border border-gray-600 px-4 py-2">보유기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">홈페이지 회원가입 및 관리</td>
                  <td className="border border-gray-600 px-4 py-2">서비스 이용약관</td>
                  <td className="border border-gray-600 px-4 py-2">회원 탈퇴 후 최대 1개월</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제3조(처리하는 개인정보의 항목)</h2>
            <p className="mt-2">① MINE DOCS 은(는) 다음의 개인정보 항목을 처리하고 있습니다.</p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">항목</th>
                  <th className="border border-gray-600 px-4 py-2">필수/선택</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">로그인ID</td>
                  <td className="border border-gray-600 px-4 py-2">필수</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">이메일</td>
                  <td className="border border-gray-600 px-4 py-2">필수</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">접속 IP 정보</td>
                  <td className="border border-gray-600 px-4 py-2">필수</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">쿠키</td>
                  <td className="border border-gray-600 px-4 py-2">필수</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">접속 로그</td>
                  <td className="border border-gray-600 px-4 py-2">필수</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">서비스 이용 기록</td>
                  <td className="border border-gray-600 px-4 py-2">필수</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제4조(개인정보의 제3자 제공에 관한 사항)</h2>
            <p className="mt-2">
              ① MINE DOCS 은(는) 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는
              경우에만 개인정보를 제3자에게 제공합니다.
            </p>
            <p className="mt-2">② MINE DOCS 은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">제공받는 자</th>
                  <th className="border border-gray-600 px-4 py-2">제공받는 자의 개인정보 이용목적</th>
                  <th className="border border-gray-600 px-4 py-2">제공하는 개인정보 항목</th>
                  <th className="border border-gray-600 px-4 py-2">제공받는 자의 보유.이용기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">MongoDB, Inc.</td>
                  <td className="border border-gray-600 px-4 py-2">서비스 제공</td>
                  <td className="border border-gray-600 px-4 py-2">
                    로그인ID, 이메일, 접속 IP 정보, 쿠키, 접속 로그, 서비스 이용 기록
                  </td>
                  <td className="border border-gray-600 px-4 py-2">회원 탈퇴 후 최대 1개월</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제5조(개인정보의 파기절차 및 파기방법)</h2>
            <p className="mt-2">
              ① MINE DOCS 은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
              파기의 절차, 기한 및 방법은 다음과 같습니다.
            </p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">파기절차</th>
                  <th className="border border-gray-600 px-4 py-2">파기기한</th>
                  <th className="border border-gray-600 px-4 py-2">파기방법</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">
                    MINE DOCS 은(는) 파기 사유가 발생한 개인정보를 선정하고, MINE DOCS 의 개인정보 보호책임자의 승인을
                    받아 개인정보를 파기합니다.
                  </td>
                  <td className="border border-gray-600 px-4 py-2">회원 탈퇴 후 최대 1개월</td>
                  <td className="border border-gray-600 px-4 py-2">
                    전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">
              제6조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)
            </h2>
            <p className="mt-2">
              ① 정보주체는 MINE DOCS에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수
              있습니다.
            </p>
            <p className="mt-2">
              ② 제1항에 따른 권리 행사는MINE DOCS에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편,
              모사전송(FAX) 등을 통하여 하실 수 있으며 MINE DOCS은(는) 이에 대해 지체 없이 조치하겠습니다.
            </p>
            <p className="mt-2">
              ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이
              경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            </p>
            <p className="mt-2">
              ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의
              권리가 제한 될 수 있습니다.
            </p>
            <p className="mt-2">
              ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그
              삭제를 요구할 수 없습니다.
            </p>
            <p className="mt-2">
              ⑥ MINE DOCS은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한
              자가 본인이거나 정당한 대리인인지를 확인합니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제7조(개인정보의 안전성 확보조치에 관한 사항)</h2>
            <p className="mt-2">MINE DOCS은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">항목</th>
                  <th className="border border-gray-600 px-4 py-2">내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">개인정보 취급 직원의 최소화 및 교육</td>
                  <td className="border border-gray-600 px-4 py-2">
                    개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을
                    시행하고 있습니다.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">개인정보에 대한 접근 제한</td>
                  <td className="border border-gray-600 px-4 py-2">
                    개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한
                    접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단접근을
                    통제하고 있습니다.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">접속기록의 보관 및 위변조 방지</td>
                  <td className="border border-gray-600 px-4 py-2">
                    개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관,관리하고 있으며,다만, 5만명 이상의
                    정보주체에 관하여 개인정보를 추가하거나, 고유식별정보 또는 민감정보를 처리하는 경우에는 2년이상
                    보관,관리하고 있습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">
              제8조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)
            </h2>
            <p className="mt-2">
              ① MINE DOCS은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는
              &#39;쿠키(cookie)&#39;를 사용합니다.
            </p>
            <p className="mt-2">
              ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(HTTP)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며
              이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
            </p>
            <p className="mt-2">
              가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어,
              보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
            </p>
            <p className="mt-2">
              나. 쿠키의 설치·운영 및 거부 : 웹브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 메뉴의 옵션 설정을
              통해 쿠키 저장을 거부 할 수 있습니다.
            </p>
            <p className="mt-2">다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제9조 (개인정보 보호책임자)</h2>
            <p className="mt-2">
              ① MINE DOCS(&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
              있습니다.
            </p>

            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">성명</th>
                  <th className="border border-gray-600 px-4 py-2">직책</th>
                  <th className="border border-gray-600 px-4 py-2">이메일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">손근원</td>
                  <td className="border border-gray-600 px-4 py-2">운영 책임자</td>
                  <td className="border border-gray-600 px-4 py-2">zizark4040@gmail.com</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">
              ② 정보주체께서는 MINE DOCS(&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;) 의 서비스(또는 사업)을 이용하시면서 발생한 모든
              개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자로 문의하실 수 있습니다.
              MINE DOCS(&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴
              것입니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제10조(개인정보 열람청구)</h2>
            <p className="mt-2">
              정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. MINE
              DOCS(&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;) 은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록
              노력하겠습니다.
            </p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">부서</th>
                  <th className="border border-gray-600 px-4 py-2">개인정보 보호책임자</th>
                  <th className="border border-gray-600 px-4 py-2">이메일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">개인정보 보호 담당부서</td>
                  <td className="border border-gray-600 px-4 py-2">손근원</td>
                  <td className="border border-gray-600 px-4 py-2">zizark4040@gmail.com</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">
              정보주체께서는 MINE DOCS(&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;) 의 서비스(또는 사업)을 이용하시면서 발생한 모든
              개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자로 문의하실 수 있습니다.
              MINE DOCS(&#39;minedocs.xyz&#39;이하 &#39;MINE DOCS&#39;) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴
              것입니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제11조(권익침해 구제방법)</h2>
            <p className="mt-2">
              정보주체는 아래의 기관에 대해 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
            </p>
            <table className="mt-4 table-auto border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="border border-gray-600 px-4 py-2">기관</th>
                  <th className="border border-gray-600 px-4 py-2">전화번호</th>
                  <th className="border border-gray-600 px-4 py-2">홈페이지</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">개인정보 침해신고센터</td>
                  <td className="border border-gray-600 px-4 py-2">(국번없이) 118</td>
                  <td className="border border-gray-600 px-4 py-2">privacy.kisa.or.kr</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">개인정보 분쟁조정위원회</td>
                  <td className="border border-gray-600 px-4 py-2">(국번없이) 1833-6972</td>
                  <td className="border border-gray-600 px-4 py-2">www.kopico.go.kr</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">대검찰청</td>
                  <td className="border border-gray-600 px-4 py-2">(국번없이) 1301</td>
                  <td className="border border-gray-600 px-4 py-2">www.spo.go.kr</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2">경찰청</td>
                  <td className="border border-gray-600 px-4 py-2">(국번없이) 182</td>
                  <td className="border border-gray-600 px-4 py-2">cyberbureau.police.go.kr</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">
              「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의
              규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은
              자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
            </p>
            <p className="mt-2">
              ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-start font-bold text-xl">제12조(개인정보 처리방침 변경)</h2>
            <p className="mt-2">① 이 개인정보처리방침은 2023년 6월 15부터 적용됩니다.</p>
            <p className="mt-2">② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</p>
          </div>
        </main>
      </div>
    </>
  );
}
