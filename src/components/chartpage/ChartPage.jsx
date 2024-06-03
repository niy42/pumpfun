import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChartPage = () => {
    const navigate = useNavigate();
    const handleChartPage = () => {
        navigate('/chartPage1');
    }

    return (
        <div className='flex justify-center items-center'>
            <button className='p-2' onClick={handleChartPage}>
                [Chart Page]
            </button>
        </div>
    )
}

export default ChartPage;
