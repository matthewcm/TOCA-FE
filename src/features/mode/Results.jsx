import React, {useEffect, useState} from 'react'

import {selectModeQuery, selectCSV} from "./modeSlice";
import {useSelector} from "react-redux";
import {readString} from "react-papaparse";
import ReactLoading from 'react-loading';
import LineGraph from "../../components/LineGraph";

const Results = () => {

    const [sentimentData, setSentimentData] = useState(null)


    console.log(selectModeQuery)
    const {mode, query, active}  = useSelector(selectModeQuery)

    // const csv = useSelector(selectCSV)
    // console.log(csv)
    //
    // const csv_read = readString(csv);
    // const [headers, ...csv_content] = csv_read.data
    // console.log(csv_content)

    // const csv_c_preview = csv_content.slice(0, 20)
    //
    // useEffect(() => {
    //     fetch('/do', {
    //         method: 'POST',
    //         body: csv
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setSentimentData(data)
    //         })
    // }, [csv])


    const MAX_LENGTH = 250;
    return (

        <div className=" flex flex-row flex-wrap w-full">

            <div className="w-full bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-2 mb-5">
                <div>
                    <div className="text-2xl font-medium mb-2 text-gray-800 dark:text-white">
                        Mode: {mode[0]}
                    </div>
                    <div className="leading-loose text-sm font-light text-gray-700 dark:text-gray-50 mb-2">
                        <div>
                            Query: {query}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="m-4 overflow-scroll h-96 bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                <div className="overflow-hidden">
                    <div className="text-2xl font-medium mb-2 text-gray-800 dark:text-white">
                        CSV Preview
                    </div>
                </div>
            </div>

            {/*        <div className="container mx-auto px-4 sm:px-8 overflow-auto max-w-4xl max-h-full object-cover">*/}
            {/*            <div className="py-8">*/}
            {/*                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-auto">*/}
            {/*                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">*/}
            {/*                        <table className="min-w-full leading-normal">*/}
            {/*                            <thead>*/}
            {/*                            <tr>*/}
            {/*                                {headers.map(header=>(*/}

            {/*                                    <th scope="col"*/}
            {/*                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">*/}
            {/*                                        {header}*/}
            {/*                                    </th>*/}
            {/*                                ) )}*/}
            {/*                            </tr>*/}
            {/*                            </thead>*/}
            {/*                            <tbody>*/}
            {/*                            {csv_c_preview.map(thread=> (*/}
            {/*                                <tr>*/}
            {/*                                    {thread.map(thread_data => (*/}
            {/*                                        <td className="max-w-2xl px-5 py-5 border-b border-gray-200 bg-white text-sm">*/}
            {/*                                            <p className="text-gray-900 whitespace-no-wrap">*/}
            {/*                                                {thread_data}*/}
            {/*                                            </p>*/}
            {/*                                        </td>*/}
            {/*                                    ))}*/}
            {/*                                </tr>*/}
            {/*                            ))}*/}
            {/*                            </tbody>*/}
            {/*                        </table>*/}
            {/*                        <p>Loaded max 20 results in preview</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div*/}
            {/*    className="m-4 overflow-hidden bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">*/}
            {/*    <div className="overflow-hidden">*/}
            {/*        <div className="text-2xl font-medium mb-2 text-gray-800 dark:text-white">*/}
            {/*            LDA Iframe*/}
            {/*        </div>*/}
            {/*        <iframe className="overflow-hidden" src="https://embed.deepnote.com/22344813-5c7a-4a97-ab33-49ce3f826a29/1b1fa759-aa3b-4a45-b755-1473c43e8814/00013-77cb1b8e-d4a1-4d60-9dc5-395928be09f2?height=1253&width=1000" height="753" width="1000"/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*{sentimentData ? (*/}

            {/*    <div*/}
            {/*        className="m-4 overflow-scroll h-96 bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">*/}
            {/*        <div className="overflow-hidden">*/}
            {/*            <div className="text-2xl font-medium text-gray-800 dark:text-white">*/}
            {/*                Sentiment Analysis Table*/}
            {/*            </div>*/}

            {/*        <div className="container mx-auto px-4 sm:px-8 overflow-auto max-w-7xl max-h-full object-cover">*/}
            {/*            <div className="py-8">*/}
            {/*                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-auto">*/}
            {/*                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">*/}
            {/*                        <table className="min-w-full leading-normal">*/}
            {/*                            <thead>*/}
            {/*                            <tr>*/}
            {/*                                {sentimentData.headers.map(header=>(*/}

            {/*                                    <th scope="col"*/}
            {/*                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">*/}
            {/*                                        {header}*/}
            {/*                                    </th>*/}
            {/*                                ) )}*/}
            {/*                                {Object.keys(sentimentData.data[0].sentiment).map(key => (*/}
            {/*                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">*/}
            {/*                                        <p className="text-gray-900 whitespace-no-wrap">*/}
            {/*                                            {key}*/}
            {/*                                        </p>*/}
            {/*                                    </td>*/}
            {/*                                ))}*/}
            {/*                            </tr>*/}
            {/*                            </thead>*/}
            {/*                            <tbody>*/}
            {/*                            {sentimentData.data.map(dt=> {*/}

            {/*                                let styllez = "bg-white"*/}
            {/*                                if (dt.sentiment['compound'] > 0){*/}
            {/*                                    styllez = "bg-green-50"*/}
            {/*                                }else if (dt.sentiment['compound'] < 0){*/}
            {/*                                    styllez = "bg-red-50"*/}
            {/*                                }*/}

            {/*                                return (*/}


            {/*                                    <tr className={styllez}>*/}
            {/*                                        {dt.content.map(thread_data => (*/}
            {/*                                            <td className="max-w-xl px-5 py-5 border-b border-gray-200 text-sm">*/}
            {/*                                                <p className="text-gray-900 whitespace-no-wrap">*/}
            {/*                                                    {thread_data}*/}
            {/*                                                </p>*/}
            {/*                                            </td>*/}
            {/*                                        ))}*/}

            {/*                                        {Object.keys(dt.sentiment).map(key => (*/}
            {/*                                            <td className="px-5 py-5 border-b border-gray-200  text-sm">*/}
            {/*                                                <p className="text-gray-900 whitespace-no-wrap">*/}
            {/*                                                    {dt.sentiment[key]}*/}
            {/*                                                </p>*/}
            {/*                                            </td>*/}
            {/*                                        ))}*/}
            {/*                                    </tr>*/}
            {/*                                )*/}
            {/*                            })}*/}

            {/*                            </tbody>*/}
            {/*                        </table>*/}
            {/*                        <p>Loaded max 50 results in preview</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*): (*/}
            {/*    <div className="m-4 overflow-scroll h-96 w-96 border-t-4 rounded border-indigo-500 shadow text-center p-4">*/}
            {/*        <div className="text-2xl font-medium text-white dark:text-white">*/}
            {/*            Sentiment Analysis Table Loading...*/}
            {/*        </div>*/}
            {/*        <ReactLoading type={'spin'} color={'blue'} height={'20%'} width={'20%'} />*/}
            {/*    </div>*/}
            {/*)*/}
            {/*}*/}
            {/*{sentimentData ? (*/}

            {/*    <div*/}
            {/*        className="m-4 overflow-scroll h-96 bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">*/}
            {/*        <div className="overflow-hidden">*/}
            {/*            <div className="text-2xl font-medium text-gray-800 dark:text-white">*/}
            {/*                Sentiment Analysis Graph*/}
            {/*            </div>*/}

            {/*            <div className="container mx-auto px-4 sm:px-8 overflow-auto max-w-7xl max-h-full object-cover">*/}
            {/*                <div className="py-8">*/}
            {/*                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-auto">*/}
            {/*                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">*/}
            {/*                            <LineGraph data={sentimentData} />*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*): (*/}
            {/*    <div className="m-4 overflow-scroll h-96 w-96 border-t-4 rounded border-indigo-500 shadow text-center p-4">*/}
            {/*        <div className="text-2xl font-medium text-white dark:text-white">*/}
            {/*            Sentiment Analysis Graph Loading...*/}
            {/*        </div>*/}
            {/*        <ReactLoading type={'spin'} color={'blue'} height={'20%'} width={'20%'} />*/}
            {/*    </div>*/}
            {/*)*/}
            {/*}*/}
            <div
                className="m-4 overflow-scroll h-96 bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                <div className="overflow-hidden">
                    <div className="text-2xl font-medium text-gray-800 dark:text-white">
                        Sentiment analysis with Search/topic Query  WIP
                    </div>
                </div>
            </div>

            <div
                className="m-4 overflow-scroll h-96 bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                <div className="overflow-hidden">
                    <div className="text-2xl font-medium text-gray-800 dark:text-white">
                        Cluster growth of a specific topic over time.
                    </div>
                </div>
            </div>
            <div
                className="m-4 overflow-scroll h-96 bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                <div className="overflow-hidden">
                    <div className="text-2xl font-medium text-gray-800 dark:text-white">
                        LDA Notebook based on query
                    </div>
                </div>
        </div>
        </div>


                )
                }
export default Results