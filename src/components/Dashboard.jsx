import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin';

const Dashboard = () => {
    const [coins, setCoins] = useState([]);
    const [showAnimation, setShowAnimation] = useState(true);
    const [includeNSFW, setIncludeNSFW] = useState(false);

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd'
            }
        }).then(response => {
            setCoins(response.data);
        }).catch((error) => console.log('Error: ', error.message));
    }, []);

    return (
        <div>
            <div className="controls">
                <label>
                    Show Animation:
                    {/*<input type="checkbox" checked={showAnimation} onChange={() => setShowAnimation(!showAnimation)} />*/}
                    <input type='checkbox' checked={showAnimation} onChange={() => setShowAnimation(!showAnimation)} />
                </label>
                <label>
                    Include NSFW:
                    <input type="checkbox" checked={includeNSFW} onChange={() => setIncludeNSFW(!includeNSFW)} />
                </label>
            </div>
            <div className="coin-list">
                {coins.map(coin => (
                    <Coin key={coin.id} coin={coin} showAnimation={showAnimation} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
