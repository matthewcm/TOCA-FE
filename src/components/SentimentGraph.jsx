import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-error-bars'
import {useSelector} from "react-redux";
import {selectModeQuery} from "../features/mode/modeSlice";


const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    min:-1,
                    max:1
                },
            },
        ],
        xAxes: [{
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(item,data, values) {
                    // console.log(value)
                    // console.log( index)
                    const dataset = data.datasets[item.datasetIndex];
                    const index =item.index;
                    return dataset.labels[index] + ': $' + dataset.data[index];
                }
            }
        }]
    },
    // maintainAspectRatio: false,
    // responsive: true,
    // tooltips: {
    //     intersect: false,
    //     callbacks: {
    //         label: function(value, index, values) {
    //
    //             console.log(value)
    //             console.log( index)
    //             // const dataset = data.datasets[tooltipItem.datasetIndex];
    //             // const index = tooltipItem.index;
    //             // return dataset.labels[index] + ': $' + dataset.data[index];
    //         }
    //     }
    // }

}

const SentimentGraph = (props) => {

    const { topicNames} = useSelector(selectModeQuery)

    const topicDatasets = []
    console.log('first topic ', props.data[0].topic)
    console.log('first topic Name ', props.topics[0])
    props.topics.map(topic => {

        let topicName = topic.name


        const labels = []
        const datasetData = []
        const errorBars = {}
        let colour = topic.colour


        props.data.filter(dataset => topicNames[dataset.topic].name === topicName)
            .forEach(row => {

            console.log(row.topic)
            console.log(topicNames[row.topic])

            console.log('yipee')


            labels.push(Date.parse(row.date))
            datasetData.push(row.sentiment)
            // console.log('Q1, ', row.Q1)
            errorBars[Date.parse(row.date)] = {plus: row.sentiment - row.Q1, minus: row.sentiment - row.Q3}
            // colour = topicNames[row.topic].colour
        })
        // console.log(errorBars)

        topicDatasets.push(
            {
                label: topicName,
                data: datasetData,
                errorBars: errorBars,
                labels: labels,
                fill: false,
                backgroundColor: colour,
                borderColor: colour + '22',
            }
        )

    })


    const data = {
        // Might be an issue, if different datasets have different labels. (Some dates have 0 results)
        // However should be weekly from one time frame to another.
        datasets: topicDatasets,
    }
    console.log('data', data)
    return (

        <>
            <div className='header'>
                <h1 className='title'>  Sentiment over time</h1>
            </div>
            <Line data={data} options={options} />
        </>
    )
}

export default SentimentGraph
