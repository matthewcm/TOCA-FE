import React, {useState} from 'react'
import { useDispatch} from "react-redux";
import { readString } from 'react-papaparse';

import {setCSV} from "./modeSlice";
import Axios from "axios";
import {embed} from "@bokeh/bokehjs";

const FromReddit = () => {
    const dispatch = useDispatch()

    const [csvText, setCSVText] = useState('')
    const [topicTable, setTopicTable] = useState('')

    const onTextChange = e => setCSVText(e.target.value)

    const onSubmit = async () => {
        if (csvText ){

            console.log(csvText)


            await Axios.get(`/search-reddit?q=${csvText}`)
                .then(response => {

                        console.log(response.data)
                        setTopicTable(response.data)
                    }
                )

            console.log(csvText)
            setCSVText('')
        }
    }


    return (


        <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
            <div className="pb-4">
                <label htmlFor="csvInput" className="text-sm block font-bold  pb-2">Reddit Name</label>
                <input name="csvInput" value={csvText} onChange={onTextChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="Enter CSV URL here"/>
            </div>

            <div>
                <button onClick={onSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Scan Reddit
                </button>
            </div>
        </div>
    )
}

export default URLToCSV
