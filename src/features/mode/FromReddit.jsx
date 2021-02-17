import React, {useState} from 'react'
import { useDispatch} from "react-redux";
import { CSVLink } from "react-csv";

import Axios from "axios";
import ReactLoading from "react-loading";

const FromReddit = () => {
    const dispatch = useDispatch()

    const [subredditName, setSubredditName] = useState('')
    const [count, setCount] = useState('')
    const [type, setType] = useState('')
    const [topicTable, setTopicTable] = useState('')

    const [searching, setSearching] = useState(false);

    const [csv, setCSV] = useState(null)

    const onTextChange = e => setSubredditName(e.target.value)
    const onCountChange= e => setCount(e.target.value)
    const onTypeChange= e => setType(e.target.value)

    const onSubmit = async () => {
        if (subredditName ){

            console.log(subredditName)

            setSearching(true)


            await Axios.get(`/search-reddit?q=${subredditName}&count=${count}&type=${type}`)
                .then(response => {

                        console.log(response.data)
                        setSearching(false)
                        setCSV(response.data)
                    }
                )

            console.log(subredditName)
            setSubredditName('')
        }
    }


    return (


        <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
            <div className="pb-4">
                <label htmlFor="redditName" className="text-sm block font-bold  pb-2">Reddit Name</label>
                <input name="redditName" value={subredditName} onChange={onTextChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="Enter Subreddit name here"/>

                <label htmlFor="dataset" className="text-sm block font-bold  pb-2">Search Type</label>
                <select name="dataset" onChange={onTypeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                    <option value='' disabled selected> Select Search Type</option>
                    <option value='submission'> Search Submissions </option>
                    <option value='comment'>Search Comments</option>
                </select>
                <label htmlFor="count" className="text-sm block font-bold  pb-2">Max count of items</label>
                <input   name="count" type="number" onChange={onCountChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                         min="1" max="10000" placeholder='10000'/>
            </div>

            <div>
                <button onClick={onSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Scan Reddit
                </button>
            </div>

            {searching &&
            (
                <div className="w-4/6 content-center flex flex-col justify-center m-auto  items-center align-middle overflow-hidden">
                    <h1> Scanning Reddit </h1>
                    <ReactLoading className="h-full w-full align-middle items-center justify-center content-center" type={'spin'} color={'blue'} height={'10%'} width={'10%'} />
                </div>
            )}


            {csv &&
            (
                <div
                    className="mt-5 "
                >

                <CSVLink
                    data={csv}
                    filename={"my-file.csv"}
                    className="mt-5  btn btn-primary  btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                    type="button"
                    target="_blank"
                >
                    Download me
                </CSVLink>
                </div>

            )
            }
        </div>
)
}

export default FromReddit
