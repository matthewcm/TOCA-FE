import {CSSTransition} from "react-transition-group";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectModeQuery, setTopicNames as setTopicNamesR} from "./modeSlice";
import {embed} from '@bokeh/bokehjs'
import Axios from 'axios'
import ReactLoading from 'react-loading'
import tabledf from './table-df.json'
import  ContentEditableDiv from 'react-contenteditable'

const Sentiment = () => {

    const dispatch = useDispatch()

    const {mode, modeActive, csvActive,csv, prepareActive, topicNames:topicNamesS} = useSelector(selectModeQuery)
    const [plotActive,setPlotActive] = useState(false);

    const [sentiment, setSentiment] = useState(null)

    const [topicNames, setTopicNames] = useState(topicNamesS || {});

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

        const getTopics = async () => {
            return await Axios.post(
                `/sentiment`,
                csv,
        )
                .then(response => {

                        //           console.log(data)
                        console.log(response.data)
                        // setTopicDocs(response.data)
                        // const initialTopicNames = {}
                        // {response.data.data.slice(0,200).map(row => {
                        //     let rowName = row[0].toString()
                        //     if (topicNamesS){
                        //         rowName = topicNamesS[row[0]]
                        //     }
                        //     initialTopicNames[row[0]] = rowName
                        // })}
                        //
                        // console.log(initialTopicNames)
                        //
                        // if (Object.keys(topicNames).length  === 0){
                        //
                        // }
                        // setTopicNames(initialTopicNames)
                        // // embed.embed_item(response.data)
                       setPlotActive(true)
                        setSentiment(response.data)
                    }
                )
        }

            getTopics()

    }, [])



    // useEffect(() => {
    //    fetch(
    //        "/plot1",
    //        {method: 'GET'}
    //    )
    //        .then(res =>res.json())
    //        .then(data => {
    //            console.log(data)
    //            embed.embed_item(data)
    //            setPlot(embed.embed_item(data))
    //        })
    //        .catch(err => console.log(err))
    // }, [])

    // console.log(plot)



    return (
        <div>
        <CSSTransition
            in={modeActive & csvActive & mode.includes('sentiment') & prepareActive }
            timeout={{exit:500, enter:2000}}
            classNames="preprocessing"
            unmountOnExit
            // onEnter={() => setShowButton(false)}
            // onExited={() => setShowButton(true)}
        >
            <div className="">
                <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2 ">
                   Sentiment Analysis
                </h2>


                <div className="m-auto" id='mypot'>
                </div>

                <div className="m-auto flex justify-center" id='myplot'>
                    {!plotActive && (


                        <div className="mt-4  m-4 m-auto mb-8 h-96 w-96 border-t-4 rounded border-indigo-500 shadow text-center p-4">
                            <div className="text-2xl font-medium text-black dark:text-white">
                                SNA Analysis Loading...
                            </div>
                            <div className="w-4/6 content-center flex flex-wrap justify-center m-auto  items-center align-middle overflow-hidden">

                                <ReactLoading className="h-full w-full align-middle items-center justify-center content-center" type={'spin'} color={'blue'} height={'100%'} width={'100%'} />
                            </div>
                        </div>

                    )}
                </div>
                {/*{topicKS && !plotActive && (*/}


                {/*    <div className="mt-4  m-4 m-auto mb-8 h-96 w-96 border-t-4 rounded border-indigo-500 shadow text-center p-4">*/}
                {/*        <div className="text-2xl font-medium text-black dark:text-white">*/}
                {/*            LDA Analysis Loading...*/}
                {/*        </div>*/}
                {/*        <div className="w-4/6 content-center flex flex-wrap justify-center m-auto  items-center align-middle overflow-hidden">*/}

                {/*            <ReactLoading classname="h-full w-full align-middle items-center justify-center content-center" type={'spin'} color={'blue'} height={'100%'} width={'100%'} />*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*)}*/}
                {sentiment &&
                <div className="py-8 w-full">
                    <table className="m-auto max-w-6xl leading-normal text-center text-2xl">
                        <thead>
                        <tr>
                            {sentiment.headers.map(column=>(

                                <th className="">
                                    {column}
                                </th>
                            ) )}
                        </tr>

                        {sentiment.data.slice(0,200).map(dt => {

                            return (

                                <tr className={`border-b-2 border-gray-200`}>
                                    {sentiment.headers.map(column => {
                                        let styllez = "bg-white"

                                        if (dt['sentiment'] > 0.1) {
                                            styllez = "bg-green-50"

                                        }else if (dt['sentiment'] < - 0.1) {
                                            styllez = "bg-red-50"
                                        }


                                            return (

                                                <td className={styllez}>
                                                    {dt[column]}
                                                </td>
                                            )
                                        }
                                    )}
                                </tr>
                            )
                        })}
                        </thead>
                    </table>

                </div>
                }

            </div>

        </CSSTransition>
        </div>
    )

}
export default Sentiment
