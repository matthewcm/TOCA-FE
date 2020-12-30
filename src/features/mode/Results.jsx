import React from 'react'
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis,YAxis } from 'react-vis';

import Graph from 'react-vis-network-graph'

import {selectModeQuery} from "./modeSlice";
import {useSelector} from "react-redux";

const Results = () => {

    console.log(selectModeQuery)
    const {mode, query, search}  = useSelector(selectModeQuery)

    const data = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
    ];

    const graph = {
        nodes: [
            { id: 1, label: "Hacker 1", title: "node 1 tootip text" },
            { id: 2, label: "Gamer 2", title: "node 2 tootip text" },
            { id: 3, label: "Gamer 3", title: "node 3 tootip text" },
            { id: 4, label: "Hacker 4", title: "node 4 tootip text" },
            { id: 5, label: "Gamer 5", title: "node 5 tootip text" }
        ],
        edges: [
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 }
        ]
    };

    const options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#000000"
        },
    };

    const events = {
        select: function(event) {
            var { nodes, edges } = event;
        }
    };

    return (

        <div className="flex flex-col w-full">
                <div
                    className="m-auto bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                    <div className="overflow-hidden">
                        <div className="text-2xl font-medium mb-8 text-gray-800 dark:text-white">
                            Mode: {mode}
                        </div>
                        <div className="leading-loose text-sm font-light text-gray-700 dark:text-gray-50 mb-10">
                            <div className="font-bold">
                                search {search}
                            </div>
                            <div>
                                Query: {query}
                            </div>
                        </div>
                        <div className="px-4 mt-8">
                            <button type="button"
                                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                               FLIP
                            </button>
                        </div>
                    </div>
                </div>

                    <div>
                        <XYPlot height={300} width={300}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            <LineSeries data={data}/>
                        </XYPlot>
                    </div>

            <div
                className="h-96 w-96 m-auto bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                <Graph
                    graph={graph}
                    options={options}
                    events={events}
                />

            </div>
            </div>


    )
}
export default Results