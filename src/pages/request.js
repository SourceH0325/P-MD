import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import SearchBar from '@/pages/components/SearchBar';
import axios from 'axios';

export default function Request() {
    const router = useRouter();

    const { data: session, status } = useSession();

    const [isLoading, setIsLoading] = useState(true);
    const [docs, setDocs] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        axios
            .get('/api/callrequestDB')
            .then((res) => {
                setDocs(res.data.result);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (status === 'unauthenticated') {
            signIn('discord');
        } else if (status === 'authenticated') {
            axios
                .get('/api/callroleDB', {
                    params: {
                        name: session?.user.name,
                        email: session?.user.email,
                    },
                })
                .then((res) => {
                    if (res.data.result[0].role !== 'admin') {
                        router.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [status, session, router]);

    const handleSearch = (query) => {
        setQuery(query);
    };

    const filteredDocs = docs.filter((doc) => {
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

    const handleDelete = (id) => {
        const result = confirm('정말로 삭제하시겠습니까?');
        const deleteData = docs.filter((doc) => doc.data._id === id);

        if (result) {
            axios
                .delete(`/api/deleteRequestDB/${id}`)
                .then((res) => {
                    console.log(res);
                    alert('삭제되었습니다.');
                    return axios.post('/api/addLogsDB', {
                        type: 'delete_request',
                        data: {
                            deleteData,
                        },
                        session: session,
                    });
                })
                .then((res) => {
                    console.log(res);
                    router.reload();
                })
                .catch((err) => {
                    console.log(err);
                    alert('삭제에 실패했습니다.');
                });
        }
    };

    return (
        <>
            <Head>
                <title>요청</title>
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
                        <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-2">
                            {filteredDocs.map((doc) => (
                                <div key={doc._id} className="bg-[#202026] rounded-lg p-5">
                                    <h1 className="text-2xl font-bold truncate">{doc.data.name}</h1>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                                            <p className="font-bold">{doc.data.version}</p>
                                        </div>
                                        <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                                            <p className="font-bold">{doc.data.edition}</p>
                                        </div>
                                        <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                                            <p className="font-bold">{doc.data.tag[0]}</p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center w-auto mt-4 whitespace-nowrap overflow-auto mobile:justify-start"
                                        id="LinkList_Main"
                                    >
                                        {doc.data.url.map((link, index) => (
                                            <button
                                                key={index}
                                                className="rounded-lg text-lg px-2 pb-1.5 pt-1 mr-2 ml-0 font-bold bg-blue-600 hover:bg-blue-700 transition-all relative"
                                                onClick={() => alert(link)}
                                            >
                                                {link.name}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-5">
                                        <button
                                            className="font-bold text-lg bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 transition-all rounded-lg"
                                            onClick={() => alert(doc.reason)}
                                        >
                                            사유 보기
                                        </button>
                                        <button
                                            className="font-bold text-lg bg-red-600 hover:bg-red-700 transition-all px-4 py-2 transition-all rounded-lg"
                                            onClick={() => handleDelete(doc.data._id)}
                                        >
                                            삭제
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
