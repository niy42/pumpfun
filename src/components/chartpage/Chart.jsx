import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Chart as ReactChart } from 'react-chartjs-2';
//import 'chartjs-adapter-date-fns';
import { CandlestickController, OhlcController, CandlestickElement, OhlcElement } from 'chartjs-chart-financial';

Chart.register(...registerables, CandlestickController, OhlcController, CandlestickElement, OhlcElement);

const generateCandlestickData = () => {
    return [
        { x: new Date('2024-05-01'), o: 100, h: 110, l: 90, c: 105 },
        { x: new Date('2024-05-02'), o: 105, h: 115, l: 100, c: 110 },
        { x: new Date('2024-05-03'), o: 110, h: 120, l: 105, c: 115 },
        { x: new Date('2024-05-04'), o: 115, h: 125, l: 110, c: 120 },
        { x: new Date('2024-05-05'), o: 120, h: 130, l: 115, c: 125 },
    ];
};

const chartData = {
    datasets: [
        {
            label: 'Candlestick Data',
            data: generateCandlestickData(),
            type: 'candlestick',
        },
    ],
};

const options = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day',
            },
        },
        y: {
            beginAtZero: false,
        },
    },
};

const CandlestickChart = () => {
    return (
        <div>
            <h2>Candlestick Chart</h2>
            <ReactChart type="candlestick" data={chartData} options={options} />
        </div>
    );
};

const BondingCurvePage = () => {
    return (
        <div>
            <h1>Bonding Curve and Virtual Chart</h1>
            <CandlestickChart />
        </div>
    );
};

export default BondingCurvePage;
