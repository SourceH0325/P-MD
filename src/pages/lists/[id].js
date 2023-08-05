import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);
import 'react-grid-layout/css/styles.css';

export default function Home() {
    const router = useRouter();
    const id = router.query.id;

    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const layout = lists[0]?.result_location?.map((location) => ({
        i: location.i,
        x: location.x,
        y: location.y,
        w: location.w,
        h: location.h,
    }));

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/list/callListDB/${id}`)
                .then((res) => {
                    setLists(res.data.result);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    return (
        <>
            <Head>
                {lists.map((list) => (
                    <title key={list._id}>{list.name}</title>
                ))}
                <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isLoading ? (
                <div className="loader-container">
                    <div className="loader" />
                </div>
            ) : (
                <div className="mx-4 mobile:mx-0">
                    <ResponsiveGridLayout
                        className="layout"
                        layout={layout}
                        isDraggable={false}
                        isResizable={false}
                        onLayoutChange={(layout) => console.log(layout)}
                        layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
                        breakpoints={{ lg: 1140, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 5, md: 5, sm: 1, xs: 1, xxs: 1 }}
                        containerPadding={[0, 0]}
                        rowHeight={30}
                        width={1140}
                    >
                        {lists[0]?.result_content?.map((result, index) => (
                            <div
                                key={lists[0].result_location[index].i}
                                className="bg-[#202026] rounded-lg p-5"
                                data-grid={lists[0]?.result_location[index]}
                            >
                                <h1 className="text-2xl text-white font-bold">{result.title}</h1>
                                <br />
                                <p className="text-xl text-white font-bold -mt-3 w-full h-full">{result.content}</p>
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
                            {lists.map((list) => (
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
            )}
        </>
    );
}
