import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const options = {
    rangeSelector: {
        selected: 1,
    },
    title: {
        text: 'Candlestick Chart',
    },
    series: [
        {
            type: 'candlestick',
            name: 'AAPL Stock Price',
            data: [
                [1625097600000, 141.58, 142.15, 135.76, 140.91],
                [1625184000000, 139.75, 142.92, 136.96, 139.07],
                // Add more data points
            ],
        },
    ],
};

const CandlestickChart = () => {
    return (
        <div className='flex min-h-screen justify-start items-center'>
            <div className='justify-start items-center'>
                <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
            </div>
        </div>
    );
}

export default CandlestickChart;
