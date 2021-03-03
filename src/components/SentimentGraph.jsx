import React from 'react'
import ErrorBarPlugin from "./ErrorBarPlugin";
import { Line } from 'react-chartjs-2'
// import 'chartjs-plugin-error-bars'
// import 'chartjs-chart-error-bars'
import {useSelector} from "react-redux";
import {selectModeQuery} from "../features/mode/modeSlice";


const options = {
    absoluteValues: true,

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
            type: 'time',
            time: {
                displayFormats: {
                   quarter: "MMM YYYY"
                }
            }

            // ticks: {
            //     // Include a dollar sign in the ticks
            //     callback: function(item,data, values) {
            //         // console.log(value)
            //         // console.log( index)
            //         console.log(data)
            //         console.log(item)
            //         const dataset = data.datasets[item.datasetIndex];
            //         const index =item.index;
            //         return dataset.labels[index] + ': $' + dataset.data[index];
            //     }
            // }
        }]
    },
    // maintainAspectRatio: false,
    // responsive: true,
    // tooltips: {
    //     intersect: false,
    //     callbacks: {
    //         label: function(item,data, values) {
    //
    //             console.log(item)
    //             console.log(data)
    //             console.log(data.datasets[item.datasetIndex])
    //             // const val= data.datasets[item]
    //
    //             return 'stuff'
    //             // const index = tooltipItem.index;
    //             // return val.x + '- IQR: ' + val.z
    //         }
    //     }
    // }

}

const SentimentGraph = (props) => {

    const { topicNames} = useSelector(selectModeQuery)

    const labels = []
    const topicDatasets = []
    props.topics.map(topic => {

        let topicName = topic.name

        const datasetLabels = []
        const datasetData = []
        const errorBars = {}
        let colour = topic.colour


        props.data.filter(dataset => topicNames[dataset.topic]?.name === topicName)
            .forEach(row => {
            datasetData.push({x: new Date(Date.parse(row.date)), y: row.sentiment})
            errorBars[new Date(Date.parse(row.date))] = {plus: row.sentiment - row.Q1, minus: -(row.sentiment - row.Q3)}
        })

        labels.push(datasetLabels)


        topicDatasets.push(
            {
                label: topicName,
                data: datasetData,
                errorBars: errorBars,
                fill: false,
                backgroundColor: colour,
                borderColor: colour + '11',
            }
        )
        // console.log(topicDatasets)

    })


    const data = {
        // Might be an issue, if different datasets have different labels. (Some dates have 0 results)
        // However should be weekly from one time frame to another.
        // labels: topicDatasets[0].labels,
        datasets: topicDatasets,
        labels: labels
    }
    console.log('data', data)
    return (

        <>
            <div className='header'>
                <h1 className='title'>  Sentiment over time</h1>
            </div>
            <Line data={data} options={options} plugins={[ErrorBarPlugin]} />
        </>
    )
}

export default SentimentGraph
