import React from 'react'

import {selectModeQuery, selectCSV} from "./modeSlice";
import {useSelector} from "react-redux";
import {readString} from "react-papaparse";

const Results = () => {

    console.log(selectModeQuery)
    const {mode, query, search, active}  = useSelector(selectModeQuery)

    const csv = useSelector(selectCSV)
    console.log(csv)

    const csv_read = readString(csv);
    const [headers, ...csv_content] = csv_read.data
    console.log(csv_content)


    const MAX_LENGTH = 250;
    return (

        <div className=" flex flex-row flex-wrap w-full">

            <div className="w-72  bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                <div>
                    <div className="text-2xl font-medium mb-8 text-gray-800 dark:text-white">
                        Mode: {mode}
                    </div>
                    <div className="leading-loose text-sm font-light text-gray-700 dark:text-gray-50 mb-10">
                        <div className="font-bold">
                            dataset preview:

                            <div>

                                {csv.length > MAX_LENGTH ?
                                    (
                                        <div className="text-gray-500">
                                            {`${csv.substring(0, MAX_LENGTH)}...`}
                                            <div className="text-blue-700"> CSV exceeds length</div>
                                        </div>
                                    ) :
                                    <p>{csv}</p>
                                }
                            </div>

                        </div>
                        <div className="font-bold">
                            search {search}
                        </div>
                        <div>
                            Query: {query}
                        </div>
                    </div>
                    <div className="px-4 mt-8">
                        <button type="button"
                                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                            FLIP
                        </button>
                    </div>
                </div>
            </div>

            <div
                    className="overflow-scroll w-96 h-96 bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                    <div className="overflow-hidden">

                        <div className="container mx-auto px-4 sm:px-8 overflow-auto max-w-3xl max-h-full object-cover">
                            <div className="py-8">
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-auto">
                                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                        <table className="min-w-full leading-normal">
                                            <thead>
                                            <tr>
                                                {headers.map(header=>(

                                                    <th scope="col"
                                                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                                        {header}
                                                    </th>
                                                ) )}
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {csv_content.map(thread=> (
                                                    <tr>
                                                        {thread.map(thread_data => (
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {thread_data}
                                                                </p>
                                                            </td>
                                                        ))}
                                                    </tr>

                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <iframe src="https://embed.deepnote.com/22344813-5c7a-4a97-ab33-49ce3f826a29/1b1fa759-aa3b-4a45-b755-1473c43e8814/00013-77cb1b8e-d4a1-4d60-9dc5-395928be09f2?height=653" height="653" width="500"/>
                </div>
        </div>


    )
}
export default Results