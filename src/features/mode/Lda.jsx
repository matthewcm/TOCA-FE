import {CSSTransition} from "react-transition-group";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectModeQuery, setTopicNames as setTopicNamesR} from "./modeSlice";
import {embed} from '@bokeh/bokehjs'
import Axios from 'axios'
import ReactLoading from 'react-loading'
import  ContentEditableDiv from 'react-contenteditable'

const Lda = () => {

    const dispatch = useDispatch()
    const {mode, modeActive, csvActive,csv, prepareActive, topicNames:topicNamesS} = useSelector(selectModeQuery)
    const [topicK, setTopicK] = useState(null);
    const [topicKS, setTopicKS] = useState(null);
    const [topicKW, setTopicKW] = useState(null);
    const [plotActive,setPlotActive] = useState(false);

    const [ldaRange, setLdaRange] = useState([])
    const [trainLda, setTrainLda] = useState(false);
    const [loadVisual, setLoadVisual] = useState(false);

    const [topicDocs, setTopicDocs ] = useState(null)


    const [topicNames, setTopicNames] = useState(topicNamesS || []);


    const onTopicK = (e) => {
        setTopicK(e.target.value)
    }
    const onTopicKW = (e) => {
        setTopicKW(e.target.value)
    }
    const onKSubmit= async() => {
        const calcLda= async (nTopic, range) => {
            console.log('train LDA')
            return await Axios.get(`/calculate-k-topics?topics=${nTopic}&keywords=${topicKW}`)
                .then(response => {
                        const newLdaRange = [...range]
                        newLdaRange.push(response.data)

                        setLdaRange(newLdaRange)

                        return newLdaRange
                    }
                )
        }

        if (topicK && topicKW){
            console.log(topicK)
            let range = [...ldaRange]
            for (let i = topicK - 5; i < topicK + 5; i++ ){
                console.log(i < topicK + 5)
                if (i < 1){
                    continue
                }

                range = await calcLda(i, range)

            }

        }
    }
    const onSubmit= async () => {
        setTopicKS(topicK)
        console.log('TOPICS')
        console.log(topicK)
        const trainLda = async () => {
            console.log('train LDA')
            await Axios.get(`/train-lda?topics=${topicK}`)
                .then(response => {

                        console.log(response.data)
                        embed.embed_item(response.data)
                        setPlotActive(true)
                        setTrainLda(false)
                })
        }

        if (topicK){
            await trainLda()
                .then(() => {setLoadVisual(false)}).catch(e => console.log(e))

        }
    }
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
        return await Axios.get(`/lda-topic-table?topics=${topicK}&keywords=${topicKW}`)
            .then(response => {

                    //           console.log(data)
                    console.log(response.data)
                    const initialTopicNames = []
                    {response.data.data.map(row => {
                        let rowName = row[0].toString()
                        initialTopicNames[row[0]] = {name: rowName, colour: row[2]}
                    })}
                    console.log(initialTopicNames)

                    const topicNameList = []

                    Object.keys(initialTopicNames).forEach(topic => {
                        topicNameList.push(initialTopicNames[topic])
                    })

                setTopicDocs(response.data)
                setTopicNames(topicNameList)

                    setLoadVisual(true)
                }
            )
    }
    const onLoadVisual = async () => {
        console.log('loading visual')

        if (topicK && topicKW){
            await getLda()
            await getTopics()
        }
    }

    const onTopicNameChange = (docNumber, colour , e) => {
        const newTopicList = [...topicNames]
        newTopicList[docNumber] = {name: e.target.value, colour}
        setTopicNames(newTopicList)
    }

    const topicNameSubmit = () =>{
        console.log(topicNames)
        dispatch(
            setTopicNamesR({topicNames:topicNames})
        )
    }


    // useEffect(() => {
    //     console.log('uploading')
    //     console.log(csv)
    //
    //     const postCSV = async () => {
    //         await Axios.post(
    //             "/upload_csv",
    //             csv,
    //         ).catch(err => console.log(err))
    //
    //     }
    //     // postCSV()
    // }, [])

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

                            <label htmlFor="k number of topics topics" className="text-sm block font-bold  pb-2">Provide number of topics keywords</label>
                            <input  value={topicKW} type="number" onChange={onTopicKW} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                                    min="1" max="100" placeholder='10'/>

                        </div>

                        <div className="flex items-center justify-center ">
                            <button
                                onClick={onKSubmit}
                                className={`m-1 uppercase py-2 my-2 px-4 md:mt-8  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                                Apply K-topics range
                            </button>
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
                <div className="m-auto" id='mypot'>
                </div>

                <div className="m-auto flex justify-center" id='myplot'>
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
                {
                    ldaRange &&
                    <div className="py-8 w-full">
                        {[...ldaRange].map(ldaScore => {
                            console.log(ldaRange)
                            return (
                                <div>

                                    <h1>Perplexity: {ldaScore.perplexity}</h1>
                                    <h1>Coherency: {ldaScore.coherence}</h1>
                                    <table className="m-auto max-w-6xl leading-loose text-center text-2xl">
                                        <thead>
                                        <tr>

                                            <th className="">
                                                Topic Name
                                            </th>
                                            <th className="">
                                                Keywords
                                            </th>
                                        </tr>

                                        {ldaScore.topic_df.map(row =>(
                                            <tr className="border-b-2 border-gray-200" >
                                                <td className="border-l-2 border-gray-200">
                                                    {row['Topic Name']}
                                                </td>
                                                <td className="border-l-2 border-gray-200">
                                                    {row['Topic Keywords'].map(keyword => <span> {keyword}, </span>)}
                                                </td>

                                            </tr>
                                        ))}
                                        </thead>
                                    </table>
                                </div>

                            )
                        })}

                    </div>

                }
                {topicDocs &&
                <div className="py-8 w-full">
                    <table className="m-auto max-w-6xl leading-loose text-center text-2xl">
                        <thead>
                        <tr>
                            {topicDocs.columns.map(column=>(

                                <th className="">
                                    {column}
                                </th>
                            ) )}
                        </tr>

                        {loadVisual && topicDocs.data.slice(0,200).map(dt => (
                            // change background colour to just the td
                            <tr className="border-b-2 border-gray-200" >
                                {dt.map((d, i) => {


                                        let dataMap = ''
                                        let backgroundC = 'white'

                                        switch (i){
                                            case (0):
                                                const topicNumber =d;
                                                dataMap = <div>
                                                    <ContentEditableDiv tagName="span" onChange={(e) => onTopicNameChange(topicNumber, dt[2],e) } html={topicNames[topicNumber].name} />
                                                    <span> ✏️</span>
                                                </div>
                                                ;break
                                            case(1):  dataMap = d.map(wo => <span>{wo}, </span>);break
                                            case(2):  backgroundC = d; dataMap =  <div style={{backgroundColor: 'white', lineHeight: 1}}> {d} </div>;break
                                            default: dataMap = d
                                        }
                                        return (
                                            <td style={{backgroundColor: backgroundC}} className="border-l-2 border-gray-200">
                                                {dataMap}
                                            </td>

                                        )
                                    }
                                )

                                }
                            </tr>
                        ))}
                        </thead>
                    </table>

                    <div className="m-auto text-center mt-5">

                        <a
                            onClick={topicNameSubmit}
                            className={` m-1 uppercase py-2 my-2 px-4 md:mt-16  dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 dark:text-white hover:bg-gray-800 hover:text-white text-md`}>
                            Save Topic Names
                        </a>
                    </div>
                </div>
                }

            </div>

        </CSSTransition>
    )

}
export default Lda
