import React, {useState} from 'react'
import { useDispatch} from "react-redux";

import {summaryQuery} from "./modeSlice";
import TextToCSV from "./TextToCSV";
import URLToCSV from "./URLToCSV";
import FileToCSV from "./FileToCSV";

const TextSummarisation = () => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')

    const [datasetMode, setDatasetMode] = useState(null);

    const onSearchChange = e => setSearch(e.target.value)
    const onQueryChange = e => setQuery(e.target.value)

    const onSubmit = () => {
        console.log(search, query)
        if (search && query){
            dispatch(
                summaryQuery({
                    search,
                    query
                })
            )

            setSearch('')
            setQuery('')
        }
    }

    const handleDataTextClick = (mode) => {
        setDatasetMode(mode)
    }

    let modeCode = <div> Select Mode for CSV</div>

    switch (datasetMode){
        case 'TEXT':
            modeCode = (
                <div className="pb-4">
                    <TextToCSV/>
                </div>
            )
            break
        case 'URL':
            modeCode = (
                <div className="pb-4">
                    <URLToCSV/>
                </div>
            )
            break
        case 'FILE':
            modeCode = (
                <div className="pb-4">
                    <FileToCSV/>
                </div>
            )
            break
        default:
            modeCode = (
                <div className="pb-4">
                    <TextToCSV/>
                </div>
            )


    }



    return (


        <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
            {modeCode}
                <div className="pb-4">
                    <div className="flex flex-wrap justify-center">

                    <button
                        onClick={() => handleDataTextClick('TEXT')}
                        className="mt-4 uppercase w-32 py-2 bg-blue-300 text-blue-600 shadow-sm hover:shadow-lg">From TEXT
                    </button>
                    <button
                        onClick={() => handleDataTextClick('URL')}
                        className="mt-4 uppercase w-32 py-2 bg-yellow-300 text-yellow-600 shadow-sm hover:shadow-lg"> From URL
                    </button>
                    <button
                        onClick={() => handleDataTextClick('FILE')}
                        className="mt-4 uppercase w-32 py-2 bg-red-300 text-red-600  shadow-sm hover:shadow-lg"> From File
                    </button>

                </div>
            </div>
            <div className="pb-4">
                <label htmlFor="email" className="text-sm block font-bold  pb-2">Subreddit source</label>
                <input value={search} onChange={onSearchChange} type="email" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="r/hacking"/>
            </div>
            <div  className="pb-4">
                <label htmlFor="password" className="text-sm block font-bold pb-2">Query</label>
                <input value={query} onChange={onQueryChange} type="password" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300" placeholder="Enter Search Query"/>
            </div>

            <label className="flex items-center space-x-3">
                <input type="checkbox" name="checked-demo"
                       onChange={onQueryChange}
                       className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
                       value="1"/>
                <span className="text-gray-700 dark:text-white font-normal">
                Extreme Summary
        </span>
            </label>

            <div>
                <button onClick={onSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Results</button>
            </div>
        </div>
    )
}

export default TextSummarisation