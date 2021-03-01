import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-error-bars'


const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
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
        datasetData.push(row.count)
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of documents',
                data: datasetData,
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
            <h1 className='title'> {props.topic} Popularity over time</h1>
        </div>
        <Line data={data} options={options} />
    </>
   )
}

export default CountGraph
