import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
    { date: '2021-01-01', open: 100, close: 110, low: 95, high: 115 },
    { date: '2021-01-02', open: 110, close: 105, low: 100, high: 120 },
    // Add more data points
];

const CandlestickChart1 = () => (
    <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar dataKey="low" fill="#8884d8" />
            <Bar dataKey="high" fill="#82ca9d" />
            <Line type="monotone" dataKey="open" stroke="#ff7300" />
            <Line type="monotone" dataKey="close" stroke="#387908" />
        </ComposedChart>
    </ResponsiveContainer>
);

export default CandlestickChart1;
