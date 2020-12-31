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
        </div>
        </div>
            </>
    )

}


export default Dashboard