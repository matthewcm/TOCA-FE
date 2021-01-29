import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {useDispatch, useSelector} from "react-redux";
import {selectCSV, selectModeQuery, setPreparations} from "./modeSlice";
import {readString} from "react-papaparse";


const Preprocess = () => {
    const dispatch = useDispatch()

    const {modeActive, csvActive, prepareActive} = useSelector(selectModeQuery)

    const [stopwords, setStopwords] = useState(null);
    const [pHeaders, setPHeaders] = useState({});

    const csv = useSelector(selectCSV)

    console.log(csv)
    let headers = null;
    if (csv){
        [headers] = csv
    }

    const onStopwordsChange = (e) => {
        console.log(e)
        setStopwords(e.target.value)
    }

    const dateHeaderChange = (e) => {
        setPHeaders({...pHeaders, date: e.target.value})
    }

    const contentHeaderChange = (e) => {
        setPHeaders({...pHeaders, content: e.target.value})
    }
    const authorHeaderChange = (e) => {
        setPHeaders({...pHeaders, author: e.target.value})
    }

    const onPrepareSubmit = () => {
        dispatch(setPreparations({
            headers: pHeaders,
            stopwords
        }))
    }

    return (
        <CSSTransition
            in={modeActive & csvActive & !prepareActive }
            timeout={{exit:500, enter:2000}}
            classNames="preprocessing"
            unmountOnExit
            // onEnter={() => setShowButton(false)}
            // onExited={() => setShowButton(true)}
        >
            <div className="">
                <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2 ">
                    Preprocess your data
                </h2>


                <div
                    className="text-center max-w-3xl m-auto pt-4"
                >
                    <h2 className="max-w-3xl text-2xl md:text-1xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                        Step 1: Select Data Columns
                    </h2>
                    <div className=" pb-4 bg-white shadow-md rounded px-8 pt-4">
                        <div className="pb-4">
                            <label htmlFor="dateHeader" className="text-sm block font-bold  pb-2">Select Date</label>
                            <select name="dateHeader" onChange={dateHeaderChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                                <option value="" disabled selected>Select Date header</option>
                                {headers && headers.map(header => (<option value={header}> {header} </option>))}
                            </select>
                            <label htmlFor="authorHeader" className="text-sm block font-bold  pb-2">Select Author</label>
                            <select name="authorHeader" onChange={authorHeaderChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                                <option value="" disabled selected>Select Author header</option>
                                {headers && headers.map(header => (<option value={header}> {header} </option>))}
                            </select>
                            <label htmlFor="contentHeader" className="text-sm block font-bold  pb-2">Select Content</label>
                            <select name="contentHeader" onChange={contentHeaderChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                                <option value="" disabled selected>Select Content header</option>
                                {headers && headers.map(header => (<option value={header}> {header} </option>))}
                            </select>

                        </div>

                        <h2 className="max-w-3xl text-2xl md:text-1xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                            Step 2: Prepare stop words
                        </h2>
                        <div className="pb-2">
                            <label htmlFor="stopwords" className="text-sm block font-bold  pb-2">Provide stopwords</label>
                            <textarea cols={"40"} rows={'5'} value={stopwords} onChange={onStopwordsChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                                      placeholder="Enter stopwords here (, comma separated)"/>
                        </div>
                        <div className="flex items-center justify-center ">
                            <button
                                onClick={onPrepareSubmit}
                                className={`m-1 uppercase py-2 my-2 px-4 md:mt-8  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                                Prepare
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </CSSTransition>

    )
}

export default Preprocess