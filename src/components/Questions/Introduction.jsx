import React, {useState} from 'react'
import TextSummarisation from "../../features/mode/TextSummarisation";
import { useDispatch} from "react-redux";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {readString} from "react-papaparse";
import './transition.css'

import {setMode, setPreparations, selectModeQuery, selectCSV, summaryQuery} from "../../features/mode/modeSlice";
import {useSelector} from "react-redux";
import Results from "../../features/mode/Results";
import TextToCSV from "../../features/mode/TextToCSV";
import URLToCSV from "../../features/mode/URLToCSV";
import FileToCSV from "../../features/mode/FileToCSV";
import ExampleToCSV from "../../features/mode/ExampleToCSV";

const Introduction = () => {
    const dispatch = useDispatch()

    const {mode, modeActive, csvActive} = useSelector(selectModeQuery)

    const [datasetMode, setDatasetMode] = useState(null);
    const [stopwords, setStopwords] = useState(null);
    const [pHeaders, setPHeaders] = useState({});
    const csv = useSelector(selectCSV)
    console.log(csv)

    let headers = null;
    if (csv){
        const csv_read = readString(csv);
        [headers] = csv_read.data
    }


    const styles = {
        summarisation: mode.includes('summarisation') ? ' bg-gray-300': 'bg-transparent',
        semantic : mode.includes('semantic') ? ' bg-gray-300': 'bg-transparent',
        lda : mode.includes('lda') ? ' bg-gray-300': 'bg-transparent',
        convergence : mode.includes('convergence') ? ' bg-gray-300': 'bg-transparent',
        sna : mode.includes('sna') ? ' bg-gray-300': 'bg-transparent',

        text: datasetMode === 'TEXT' ? ' bg-gray-300': 'bg-transparent',
        url: datasetMode === 'URL' ? ' bg-gray-300': 'bg-transparent',
        file: datasetMode === 'FILE' ? ' bg-gray-300': 'bg-transparent',
        example: datasetMode === 'EXAMPLE' ? ' bg-gray-300': 'bg-transparent',
        reddit: datasetMode === 'REDDIT' ? ' bg-gray-300': 'bg-transparent',
    }

    const handleMode = (newMode) => {
        dispatch(setMode({
            mode:  newMode
        }))
    }

    const onPrepareSubmit = () => {
        dispatch(setPreparations({
            headers: pHeaders,
            stopwords
        }))
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
        case 'EXAMPLE':
            modeCode = (
                <div className="pb-4">
                    <ExampleToCSV/>
                </div>
            )
            break
        case 'REDDIT':
            modeCode = (
                <div className="pb-4">
                    <div>
                        ENTER SUBREDDIT / S
                    </div>
                    <div>
                        OR ENTER QUERY's for ALL/ S
                    </div>
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
    const CSVOptions = (
        <div className="flex items-center justify-center mt-4">
            <a
                onClick={() => handleDataTextClick('TEXT')}
                className={`${styles.text} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                from Text
            </a>
            <a
                onClick={() => handleDataTextClick('URL')}
                className={`${styles.url} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                from URl
            </a>
            <a
                onClick={() => handleDataTextClick('FILE')}
                className={`${styles.file} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                From file
            </a>
            <a
                onClick={() => handleDataTextClick('EXAMPLE')}
                className={`${styles.example} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                Choose an example
            </a>
            <a
                onClick={() => handleDataTextClick('REDDIT')}
                className={`${styles.reddit} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                From Reddit
            </a>
        </div>
    )
    const ModeOptions = (
        <div className="flex items-center justify-center mt-4">
            <a
                onClick={() => handleMode('summarisation')}
                className={`${styles.summarisation} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                Text Summarisation
            </a>
            <a
                onClick={() => handleMode('lda')}
                className={`${styles.lda} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                Latent Directlet Topic Modelling
            </a>
            <a
                onClick={() => handleMode('convergence')}
                className={`${styles.convergence} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                Topic Convergence
            </a>
            <a
                onClick={() => handleMode('semantic')}
                className={`${styles.semantic} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
            Semantic Analysis
        </a>
        <a
            onClick={() => handleMode('sna')}
            className={`${styles.sna} m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
            social network analysis
        </a>
    </div>
    )

    return (


        <main className="dark:bg-gray-800 font-mono bg-white relative overflow-hidden">
            <div className="flex relative z-20 items-center">
                <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-4">
                    <div className="flex flex-col">
                        <CSSTransition
                            in={!modeActive}
                            timeout={{exit: 200}}
                            classNames="starter"
                            unmountOnExit
                            // onEnter={() => setShowButton(false)}
                            // onExited={() => setShowButton(true)}
                        >
                                <div>
                        <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                            What form of analysis would you like to perform?

                        </h2>
                                {ModeOptions}
                            </div>
                        </CSSTransition>


                        <CSSTransition
                            in={modeActive & !csvActive }
                            timeout={{exit:500, enter:2000}}
                            classNames="dataset"
                            unmountOnExit
                            // onEnter={() => setShowButton(false)}
                            // onExited={() => setShowButton(true)}
                        >
                            <div>
                                <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                                    How would you like to enter your dataset?
                                </h2>

                                {CSVOptions}

                                <div
                                className="text-center max-w-3xl m-auto"
                                >

                                    {datasetMode && modeCode}
                                </div>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={modeActive & csvActive }
                            timeout={{exit:500, enter:2000}}
                            classNames="preprocessing"
                            unmountOnExit
                            // onEnter={() => setShowButton(false)}
                            // onExited={() => setShowButton(true)}
                        >
                            <div>
                                <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                                    Preprocess your data
                                </h2>


                                <div
                                    className="text-center max-w-3xl m-auto pt-4"
                                >
                                    <h2 className="max-w-3xl text-2xl md:text-1xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                                        Step 1: Select Data Columns
                                    </h2>
                                    <div className=" bg-white shadow-md rounded px-8 pt-4">
                                        <div className="pb-4">
                                            <label htmlFor="dateHeader" className="text-sm block font-bold  pb-2">Select Date</label>
                                            <select name="dateHeader" onChange={dateHeaderChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                                                {headers && headers.map(header => (<option value={header}> {header} </option>))}
                                            </select>
                                            <label htmlFor="authorHeader" className="text-sm block font-bold  pb-2">Select Author</label>
                                            <select name="authorHeader" onChange={authorHeaderChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                                                {headers && headers.map(header => (<option value={header}> {header} </option>))}
                                            </select>
                                            <label htmlFor="contentHeader" className="text-sm block font-bold  pb-2">Select Content</label>
                                            <select name="contentHeader" onChange={contentHeaderChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " >
                                                {headers && headers.map(header => (<option value={header}> {header} </option>))}
                                            </select>

                                        </div>

                                    <h2 className="max-w-3xl text-2xl md:text-1xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                                        Step 2: Prepare stop words
                                    </h2>
                                        <div className="pb-4">
                                            <label htmlFor="stopwords" className="text-sm block font-bold  pb-2">Provide stopwords</label>
                                            <textarea cols={"40"} rows={'5'} value={stopwords} onChange={onStopwordsChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                                                      placeholder="Enter stopwords here (, comma separated)"/>
                                        </div>
                                    </div>

                                    <div className="w-full m-auto">
                                        <button onClick={onPrepareSubmit}
                                                className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                            Prepare
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={modeActive && csvActive}
                            timeout={{exit:500, enter:2000}}
                            classNames="more"
                            unmountOnExit
                            // onEnter={() => setShowButton(false)}
                            // onExited={() => setShowButton(true)}
                        >
                            <div>
                                {
                                   modeActive && csvActive && <Results/>
                                }
                            <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                                Would you like to do anymore types of analysis?

                            </h2>

                                {ModeOptions}
                            </div>
                        </CSSTransition>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Introduction
