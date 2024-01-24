import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Loading from '@/pages/components/load/ListLoad';
import 'react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Home({ SSLists }) {
  const router = useRouter();
  const id = router.query.id;

  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/list/callListDB/${id}`)
        .then(res => {
          console.log('API Response:', res.data);
          setLists(res.data.result);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching list:', err);
          setIsLoading(false);
        });
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>{SSLists && SSLists.length > 0 ? SSLists[0].name : '마인독스'}</title>
        <meta name="og:title" content={SSLists && SSLists.length > 0 ? SSLists[0].name : '마인독스'} />
        <meta name="og:description" content="마인크래프트 서버의 플레이를 도와줍니다." />
      </Head>

      {isLoading ? (
        <Loading />
      ) : lists.length > 0 ? (
        <RenderLists lists={lists} router={router} id={id} />
      ) : (
        <p>데이터가 없습니다!</p>
      )}
    </>
  );
}

function RenderLists({ lists, router, id }) {
  if (!lists || lists.length === 0) {
    return <p>데이터가 없습니다!</p>;
  }

  const layout = lists[0].result_location?.map(location => ({
    i: location.i,
    x: location.x,
    y: location.y,
    w: location.w,
    h: location.h,
  }));

  if (!layout) {
    return <p>데이터가 없습니다!</p>;
  }

  return (
    <div className="mx-4 mobile:mx-0">
      <ResponsiveGridLayout
        className="layout"
        layout={layout}
        isDraggable={false}
        isResizable={false}
        onLayoutChange={layout => console.log(layout)}
        layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
        breakpoints={{ lg: 1140, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 1, xs: 1, xxs: 1 }}
        containerPadding={[0, 10]}
        rowHeight={30}
        width={1140}
      >
        {lists[0]?.result_content?.map((result, index) => (
          <div
            key={result.i || index}
            className="bg-[#202026] rounded-lg p-5 flex flex-col"
            data-grid={lists[0]?.result_location[index]}
          >
            <h1 className="text-2xl text-white font-bold">{result.title}</h1>
            <br />
            <textarea
              className="text-xl text-white font-medium bg-transparent -mt-3 w-full h-full resize-none"
              value={result.content}
              readOnly
              rows={result.content.split('\n').length}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
      <div className="flex justify-end items-center mt-8 w-auto">
        <div className="flex items-center">
          <button
            className="font-bold text-lg bg-green-600 hover:bg-green-700 px-4 py-2 transition-all rounded-lg mr-4"
            onClick={() => {
              router.push(`/edit_list/${id}`);
            }}
          >
            편집하기
          </button>
          {lists.map(list => (
            <button
              key={list._id}
              className="font-bold text-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-all rounded-lg"
              onClick={() => {
                router.push(`/docs/${list.linkDocs}`);
              }}
            >
              돌아가기
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/list/callListDB/${id}`);
  const SSLists = res.data.result;
  return {
    props: {
      SSLists,
    },
  };
}
