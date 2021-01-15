import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'

import { useDispatch} from "react-redux";
import Results from "../features/mode/Results";


const Dashboard = () => {

    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        fetch('/time')
            .then(res => res.json())
            .then(data => {
                setCurrentTime(data.time)
            })
    }, [])

    return (
        <>
        <div className="" >
            <div className="text-center"> <h1 className="text-2xl font-bold text-blue-500 p-5"> Dashboard </h1></div>
            <div className="text-center"> <h1 className="text-2xl font-bold text-blue-500 p-5"> Current Time {currentTime}</h1></div>

        <div className="flex w-full bg-gray-800 " >
            <Sidebar/>
            <Results/>
            <iframe src="https://embed.deepnote.com/22344813-5c7a-4a97-ab33-49ce3f826a29/1b1fa759-aa3b-4a45-b755-1473c43e8814/00013-77cb1b8e-d4a1-4d60-9dc5-395928be09f2?height=653" height="653" width="500"/>
        </div>
        </div>
            </>
    )

}


export default Dashboard