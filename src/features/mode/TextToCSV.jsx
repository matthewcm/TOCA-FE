import React, {useState} from 'react'
import { useDispatch} from "react-redux";
import { readString } from 'react-papaparse';

import {setCSV} from "./modeSlice";

const TextToCSV = () => {
    const dispatch = useDispatch()

    const [csvText, setCSVText] = useState('')

    const onTextChange = e => setCSVText(e.target.value)

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
                <label htmlFor="email" className="text-sm block font-bold  pb-2">Provide dataset</label>
                <textarea cols={"40"} rows={'5'} value={csvText} onChange={onTextChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="Enter CSV here"/>
            </div>

            <div>
                <button onClick={onSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Results</button>
            </div>
        </div>
    )
}

export default TextToCSV