import React from 'react'
import 'react-vis/dist/style.css';
import {XYPlot, MarkSeries,LineSeries, VerticalBarSeries,VerticalGridLines, HorizontalGridLines, XAxis,YAxis } from 'react-vis';

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

        <div className="flex flex-row flex-wrap w-full">
            <div className="w-full">

                <div
                    className="w-96 m-auto bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
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
            </div>

                    <div
                        className="h-96 w-96 m-auto bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                        XYPlot
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
                Bar Chart
                <XYPlot
                    height={300} width={300}
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries
                    data={[
                        {
                            x: 0,
                            y: 10
                        },
                        {
                            x: 1,
                            y: 10.736971996796232
                        },
                        {
                            x: 2,
                            y: 11.568919214953606
                        },
                        {
                            x: 3,
                            y: 13.023412634113066
                        },
                        {
                            x: 4,
                            y: 13.915508901097654
                        },
                        {
                            x: 5,
                            y: 13.075480299944838
                        },
                        {
                            x: 6,
                            y: 14.878085002444518
                        },
                        {
                            x: 7,
                            y: 13.712441128740451
                        },
                        {
                            x: 8,
                            y: 16.438924113583248
                        }
                    ]}
                    style={{}}
                />
            </XYPlot>
            </div>
            <div
                className="h-96 w-96 m-auto bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                Cluster Graph
            <XYPlot
                height={300} width={300}
            >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <MarkSeries
                    data={[
                        {
                            size: 19.73547988351014,
                            x: 1.4869930341672877,
                            y: 18.45394161173449
                        },
                        {
                            size: 13.833615529455372,
                            x: 4.8438365637594565,
                            y: 12.630268068799086
                        },
                        {
                            size: 16.908505978023996,
                            x: 0.9621195361984491,
                            y: 3.578501973069652
                        },
                        {
                            size: 15.196105634242354,
                            x: 2.1608044817816063,
                            y: 19.214940934587997
                        },
                        {
                            size: 13.71158645944051,
                            x: 15.874908642614125,
                            y: 4.281338237175927
                        },
                        {
                            size: 5.155377434626554,
                            x: 6.521669902915175,
                            y: 14.244565540374559
                        },
                        {
                            size: 7.473577414116168,
                            x: 9.083214615707988,
                            y: 0.5675223561823528
                        },
                        {
                            size: 13.127809421418316,
                            x: 8.559540497658897,
                            y: 9.539159655010971
                        },
                        {
                            size: 18.28328279101172,
                            x: 1.8130378126336666,
                            y: 6.767976642937963
                        },
                        {
                            size: 10.857101073539901,
                            x: 9.21885622511753,
                            y: 5.990248218670051
                        },
                        {
                            size: 16.381562731313053,
                            x: 15.397964299698025,
                            y: 1.6640757717686316
                        },
                        {
                            size: 5.767463094777702,
                            x: 11.77897786994018,
                            y: 0.5939380606744882
                        },
                        {
                            size: 16.72480320515451,
                            x: 13.811622940401831,
                            y: 19.85701671555098
                        },
                        {
                            size: 13.644559651161511,
                            x: 19.573690688220104,
                            y: 10.321225968462995
                        },
                        {
                            size: 16.752269860543656,
                            x: 4.528728213780491,
                            y: 16.94904267218839
                        },
                        {
                            size: 8.98412159948651,
                            x: 1.3082079539494584,
                            y: 10.105954479508078
                        },
                        {
                            size: 7.795517396846204,
                            x: 4.8237647929323195,
                            y: 0.2818910423399723
                        },
                        {
                            size: 10.530956301192495,
                            x: 2.526842259588966,
                            y: 0.43342555993676424
                        },
                        {
                            size: 9.998164443180448,
                            x: 13.394565334081355,
                            y: 12.24623986257578
                        },
                        {
                            size: 19.39128228099606,
                            x: 0.680916482306555,
                            y: 18.922118077952717
                        },
                        {
                            size: 6.309949549477915,
                            x: 2.0981631278471657,
                            y: 10.689378013006007
                        }
                    ]}
                />
            </XYPlot>
            </div>

            <div
                className="h-96 w-96 m-auto bg-white border-t-4 rounded border-indigo-500 dark:bg-gray-800 shadow text-center p-4">
                Network Graph
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