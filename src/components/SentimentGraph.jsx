import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-error-bars'


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
    },
}

const CountGraph = (props) => {

    const labels = []
    const datasetData = []
    const errorBars = {}

    const plots = props.data.filter(row => row.topic === props.topic).map(row => {

        labels.push(Date.parse(row.date))
        datasetData.push(row.sentiment)
        console.log('Q1, ', row.Q1)
        errorBars[Date.parse(row.date)] = {plus: row.sentiment - row.Q1, minus: row.sentiment - row.Q3}
    })
    console.log(errorBars)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sentiment Scores',
                data: datasetData,
                errorBars: errorBars,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }
    console.log(plots)
    return (

        <>
            <div className='header'>
                <h1 className='title'> {props.topic} Sentiment over time</h1>
            </div>
            <Line data={data} options={options} />
        </>
    )
}

export default CountGraph
