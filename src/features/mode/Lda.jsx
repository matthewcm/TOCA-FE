import {CSSTransition} from "react-transition-group";
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {selectModeQuery} from "./modeSlice";
import {embed} from '@bokeh/bokehjs'
import Axios from 'axios'

const Lda = () => {

    const {mode, modeActive, csvActive,csv, prepareActive} = useSelector(selectModeQuery)
    const [topicK, setTopicK] = useState(null);
    const [topicKS, setTopicKS] = useState(null);
    const [plot,setPlot] = useState(null);

    const onTopicK = (e) => {
        setTopicK(e.target.value)
    }
    const onSubmit= () => {
        setTopicKS(topicK)
    }

    // console.log(csv)

    useEffect(() => {

        console.log('TOPICS')
        console.log(topicK)
        const getLda = async () => {
            await Axios.get(`/lda?topics=${topicK}`)
                .then(response => {

                        //            console.log(data)
                        console.log(response.data)
                        embed.embed_item(response.data)
                        //            setPlot(embed.embed_item(data))
                    }
                )
        }

        if (topicKS){
            getLda()
        }

    }, [topicKS])

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
                    </div>
                </div>

            </div>

            <div id='myplot'>
                RESULTS here bro

            </div>
        </div>

    </CSSTransition>
    )

}
export default Lda
