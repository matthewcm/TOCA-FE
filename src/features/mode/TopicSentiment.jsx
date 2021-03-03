import {CSSTransition} from "react-transition-group";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectModeQuery, setTopicNames as setTopicNamesR} from "./modeSlice";
import {embed} from '@bokeh/bokehjs'
import Axios from 'axios'
import ReactLoading from 'react-loading'
import tabledf from './table-df.json'
import  ContentEditableDiv from 'react-contenteditable'

import SentimentGraph from "../../components/SentimentGraph";
import CountGraph from "../../components/CountGraph";
const Sentiment = () => {

    const dispatch = useDispatch()

    const {mode, modeActive, csvActive,csv, prepareActive, topicNames:topicNamesS} = useSelector(selectModeQuery)
    const [plotActive,setPlotActive] = useState(false);

    const [sentiment, setSentiment] = useState(null)

    const [topicNames, setTopicNames] = useState(topicNamesS || []);

    console.log(topicNames)


    // console.log(csv)
    // This should not be a use effect! Just a submit handler
    useEffect(( ) => {
        console.log('uploading')
        console.log(csv)

        const postCSV = async () => {
            await Axios.post(
                "/upload_csv_2",
                csv,
            ).catch(err => console.log(err))

        }

        const getTopics = () => {
            Axios.get(
                "/apply-to-trained-lda"
            )
                .then(response => {

                        console.log(response.data)
                       setPlotActive(true)
                        setSentiment(response.data)

                })
        }

            console.log('get topics')
            getTopics()

    }, [])




    return (
        <div>
        <CSSTransition
            in={modeActive & csvActive & mode.includes('topic-sentiment') & prepareActive }
            timeout={{exit:500, enter:2000}}
            classNames="preprocessing"
            unmountOnExit
            // onEnter={() => setShowButton(false)}
            // onExited={() => setShowButton(true)}
        >
            <div className="">
                <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2 ">
                    Topic Sentiment over time
                </h2>


                <div className="m-auto" id='mypot'>
                </div>

                <div className="m-auto flex justify-center" id='myplot'>
                    {!plotActive && (


                        <div className="mt-4  m-4 m-auto mb-8 h-96 w-96 border-t-4 rounded border-indigo-500 shadow text-center p-4">
                            <div className="text-2xl font-medium text-black dark:text-white">
                                Topic Sentiment Loading...
                            </div>
                            <div className="w-4/6 content-center flex flex-wrap justify-center m-auto  items-center align-middle overflow-hidden">

                                <ReactLoading className="h-full w-full align-middle items-center justify-center content-center" type={'spin'} color={'blue'} height={'100%'} width={'100%'} />
                            </div>
                        </div>

                    )}
                </div>

                {sentiment &&
                <div className="py-8 w-full">
                    <div className="text-2xl font-medium text-gray-800 dark:text-white">
                        Sentiment Analysis Graphs
                    </div>
                    <div className="overflow-hidden">
                        {/*<div className="text-2xl font-medium text-gray-800 dark:text-white">*/}
                        {/*    Topic: {topicNames[topicNames] || topicName}*/}
                        {/*</div>*/}

                        <div className="container mx-auto px-4 sm:px-8 overflow-auto max-w-7xl max-h-full object-cover">
                            <div className="py-8">
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-auto">
                                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                        <SentimentGraph data={sentiment} topics={topicNames} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="m-auto max-w-6xl leading-normal text-center ">
                        <thead>
                        <tr>
                            {Object.keys(sentiment[0]).map(column=>(

                                <th className="">
                                    {column}
                                </th>
                            ) )}
                        </tr>

                        {sentiment.slice(0,20).map(row => {

                            return (

                                <tr className={`border-b-2 border-gray-200`}>
                                    {Object.keys(row).map(column => {
                                        let styllez = "bg-white"

                                        if (row['sentiment'] > 0.1) {
                                            styllez = "bg-green-50"

                                        }else if (row['sentiment'] < - 0.1) {
                                            styllez = "bg-red-50"
                                        }

                                        let d = row[column]

                                        if (column === "topic"){
                                            console.log(topicNames)
                                            d = topicNames[d]?.name || d
                                        }


                                            return (

                                                <td className={styllez}>
                                                    {d}
                                                </td>
                                            )
                                        }
                                    )}
                                </tr>
                            )
                        })}
                        </thead>
                    </table>

                    <div className="text-2xl font-medium text-gray-800 dark:text-white">
                        Popularity Over time
                    </div>
                    {
                        topicNames.map(topic=> (
                            <div className="overflow-hidden">
                                <div className="text-2xl font-medium text-gray-800 dark:text-white">
                                    Topic: {topicNames[topic] || topic.name }
                                </div>

                                <div className="container mx-auto px-4 sm:px-8 overflow-auto max-w-7xl max-h-full object-cover">
                                    <div className="py-8">
                                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-auto">
                                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                                <CountGraph data={sentiment} topic={topic.name} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))

                    }
                </div>
                }

            </div>

        </CSSTransition>
        </div>
    )

}
export default Sentiment
