import React from 'react'

import {selectModeQuery} from "./modeSlice";
import {useSelector} from "react-redux";

const Results = () => {

    console.log(selectModeQuery)
    const {mode, query, search}  = useSelector(selectModeQuery)

    return (

                <div
                    className="w-72 m-auto bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                    <div className="overflow-hidden">
                        <div className="text-2xl font-medium mb-8 text-gray-800 dark:text-white">
                            Mode: {mode}
                        </div>
                        <div className="leading-loose text-sm font-light text-gray-700 dark:text-gray-50 mb-10">
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


    )
}
export default Results