import React, {useState} from 'react'
import { useDispatch} from "react-redux";

import {summaryQuery} from "./modeSlice";

const TextSummarisation = () => {
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [query, setQuery] = useState('')

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

    return (


        <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
            <div className="px-4 pb-4">
                <label htmlFor="email" className="text-sm block font-bold  pb-2">Subreddit source</label>
                <input value={search} onChange={onSearchChange} type="email" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="r/hacking"/>
            </div>
            <div  className="px-4 pb-4">
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