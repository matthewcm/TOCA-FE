import React, {useState} from 'react'
import { useDispatch} from "react-redux";
import { readString } from 'react-papaparse';

import {setCSV} from "./modeSlice";

const ExampleToCSV = () => {
    const dispatch = useDispatch()

    const [csvText, setCSVText] = useState('')

    const onTextChange = e => setCSVText(e.target.value)

    const hacking = "hacking csv"
    const corona = "corona csv"
    const all = "all csv"
    const trending = "trending csv"

    const onSubmit = () => {
        if (csvText ){

            console.log(csvText)

            console.log(JSON.stringify(readString(csvText), undefined, 2))
            dispatch(
                setCSV({csv:
                    // Decide whether to use decoded or string csv, prob string based whilst in memory.
                    //     readString(csvText)
                    csvText
                })
            )

            console.log(csvText)

            setCSVText('')
        }
    }


    return (


        <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
            <div className="pb-4">
                <label htmlFor="dataset" className="text-sm block font-bold  pb-2">Dataset dropdown</label>
                <select name="dataset" onChange={onTextChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                    <option value={hacking}> Game Hacking </option>
                    <option value={trending}>  Trending</option>
                    <option value={all}> All </option>
                    <option value={corona}> Corona</option>
                </select>

            </div>

            <div className="w-full m-auto">
                <button onClick={onSubmit}
                    className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Load CSV
                </button>
            </div>
        </div>
    )
}

export default ExampleToCSV