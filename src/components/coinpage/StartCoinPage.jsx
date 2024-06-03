import React from 'react'
import { useNavigate } from 'react-router-dom';

const StartCoinPage = () => {
    const navigate = useNavigate();

    const handleCoinPage = () => {
        navigate('/form');
    }

    return (
        <div className='flex justify-center items-center'>
            <button className='p-4' onClick={handleCoinPage}>
                [ Start a Coin ]
            </button>
        </div>
    )
}

export default StartCoinPage;
