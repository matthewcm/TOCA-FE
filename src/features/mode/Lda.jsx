import {CSSTransition} from "react-transition-group";
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectModeQuery} from "./modeSlice";
import {embed} from '@bokeh/bokehjs'
import Axios from 'axios'
import ReactLoading from 'react-loading'

const Lda = () => {

    const {mode, modeActive, csvActive,csv, prepareActive} = useSelector(selectModeQuery)
    const [topicK, setTopicK] = useState(null);
    const [topicKS, setTopicKS] = useState(null);
    const [plotActive,setPlotActive] = useState(false);

    const [trainLda, setTrainLda] = useState(false);
    const [loadVisual, setLoadVisual] = useState(false);

    const [topicDocs, setTopicDocs ] = useState(null)
    const onTopicK = (e) => {
        setTopicK(e.target.value)
    }
    const onSubmit= () => {
        setTopicKS(topicK)
        setTrainLda(true)
    }
    const onLoadVisual = () => {
        setTopicKS(topicK)
        setLoadVisual(true)
    }

    // console.log(csv)
    useEffect(( ) => {
        const getLda = async () => {
            console.log('GET LDA')
            await Axios.get(`/lda?topics=${topicK}`)
                .then(response => {

                        //            console.log(data)
                        console.log(response.data)
                        embed.embed_item(response.data)
                        setPlotActive(true)
                        setLoadVisual(false)
                        //            setPlot(embed.embed_item(data))
                    }
                )
        }
        const getTopics = async () => {
            return await Axios.get(`/lda-topic-table?topics=${topicK}`)
                .then(response => {

                        //            console.log(data)
                    console.log(response.data)
                    setTopicDocs(response.data)
                        // embed.embed_item(response.data)
                        //            setPlot(embed.embed_item(data))
                    }
                )
        }

        if (loadVisual && topicKS){
            // getLda()
            getTopics()
        }

    }, [loadVisual])

    useEffect(() => {

        console.log('TOPICS')
        console.log(topicK)
        const trainLda = async () => {
            console.log('train LDA')
            await Axios.get(`/train-lda?topics=${topicK}`)
                .then(response => {

                        //            console.log(data)
                        console.log(response.data)
                        embed.embed_item(response.data)
                        setPlotActive(true)
                    setTrainLda(false)
                        //            setPlot(embed.embed_item(data))
                    }
                )
        }

        if (trainLda && topicKS){
            // trainLda()
            //     .then(() => {setLoadVisual(false)}).catch(e => console.log(e))

        }

    }, [trainLda])

    useEffect(() => {
        console.log('uploading')
        console.log(csv)

        const postCSV = async () => {
            await Axios.post(
                "/upload_csv",
                csv,
            ).catch(err => console.log(err))

        }


        // postCSV()



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
    <CSSTransition
        in={modeActive & csvActive & mode.includes('lda') & prepareActive }
        timeout={{exit:500, enter:2000}}
        classNames="preprocessing"
        unmountOnExit
        // onEnter={() => setShowButton(false)}
        // onExited={() => setShowButton(true)}
    >
        <div className="">
            <h2 className="max-w-3xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2 ">
                LDA
            </h2>


            <div
                className="text-center max-w-3xl m-auto pt-4"
            >
                <h2 className="max-w-3xl text-2xl md:text-1xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
                    LDA performance tweaks
                </h2>
                <div className=" pb-4 bg-white shadow-md rounded px-8 pt-4">
                    <div className="pb-4">

                        <label htmlFor="k number of topics topics" className="text-sm block font-bold  pb-2">Provide number of topics</label>
                        <input  value={topicK} type="number" onChange={onTopicK} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                                min="1" max="100" placeholder='20'/>

                    </div>

                    <div className="flex items-center justify-center ">
                        <button
                            onClick={onSubmit}
                            className={`m-1 uppercase py-2 my-2 px-4 md:mt-8  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                            Apply tweaks
                        </button>
                        <button
                            onClick={onLoadVisual}
                            className={`m-1 uppercase py-2 my-2 px-4 md:mt-8  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                            Load Visual
                        </button>
                    </div>
                </div>

            </div>
            <div  id='mypot'>
            </div>

            <div  id='myplot'>
                {topicKS && !plotActive && (


                    <div className="mt-4  m-4 m-auto mb-8 h-96 w-96 border-t-4 rounded border-indigo-500 shadow text-center p-4">
                        <div className="text-2xl font-medium text-black dark:text-white">
                            LDA Analysis Loading...
                        </div>
                        <div className="w-4/6 content-center flex flex-wrap justify-center m-auto  items-center align-middle overflow-hidden">

                            <ReactLoading className="h-full w-full align-middle items-center justify-center content-center" type={'spin'} color={'blue'} height={'100%'} width={'100%'} />
                        </div>
                    </div>

                )}
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
                <div className="py-8">
                    <div className="">
                        <div className="">
                            <table className="max-w-6xl leading-normal table-fixed">
                                <thead>
                                <tr>
                                    {topicDocs && topicDocs.columns.map(column=>(

                                        <th className="w-1/4">
                                            {column}
                                        </th>
                                    ) )}
                                </tr>

                                {topicDocs && topicDocs.data.slice(0,4).map(dt => (
                                    <tr>
                                        {dt.map(d => (
                                            <td className="overflow-hidden w-5 break-words max-w-1/6">
                                                    {d}
                                            </td>
                                        )

                                        )}
                                    </tr>
                                ))}
                                </thead>
                                <tbody>

                                {/*    return (*/}


                                {/*        <tr className={styllez}>*/}
                                {/*            {dt.content.map(thread_data => (*/}
                                {/*                <td className="max-w-xl px-5 py-5 border-b border-gray-200 text-sm">*/}
                                {/*                    <p className="text-gray-900 whitespace-no-wrap">*/}
                                {/*                        {thread_data}*/}
                                {/*                    </p>*/}
                                {/*                </td>*/}
                                {/*            ))}*/}

                                {/*            {Object.keys(dt.sentiment).map(key => (*/}
                                {/*                <td className="px-5 py-5 border-b border-gray-200  text-sm">*/}
                                {/*                    <p className="text-gray-900 whitespace-no-wrap">*/}
                                {/*                        {dt.sentiment[key]}*/}
                                {/*                    </p>*/}
                                {/*                </td>*/}
                                {/*            ))}*/}
                                {/*        </tr>*/}
                                {/*    )*/}
                                {/*})}*/}

                                </tbody>
                            </table>
                            <p>Loaded max 50 results in preview</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </CSSTransition>
    )

}
export default Lda
