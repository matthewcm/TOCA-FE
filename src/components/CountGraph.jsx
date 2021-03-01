import React from 'react';
import {curveCatmullRom} from 'd3-shape';

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
} from 'react-vis';

export default function CountGraph(props) {
    console.log(props)
    const plots = props.data.filter(row => row.topic === props.topic).map(row => {

        return {
            x: Date.parse(row.date),
            y: row.count
        }
    })
    console.log(plots)
    return (
        <XYPlot
            width={1200}
            height={300}
            xType="time"
        >
            <HorizontalGridLines style={{stroke: '#B7E9ED'}} />
            <VerticalGridLines style={{stroke: '#B7E9ED'}} />
            <XAxis
                title="Date"
                style={{
                    line: {stroke: '#ADDDE1'},
                    ticks: {stroke: '#ADDDE1'},
                    text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                }}
            />
            <YAxis title="Document Count" />
            <LineSeries
                className="fourth-series"
                curve={curveCatmullRom.alpha(0.5)}
                data={plots}
            />
        </XYPlot>
    );
}
