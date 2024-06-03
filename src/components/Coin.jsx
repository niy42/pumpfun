import React from 'react';

const Coin = ({ coin, showAnimation }) => {
    return (
        <div className="coin">
            <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
            <p>Current Price: ${coin.current_price}</p>
            {showAnimation && <div className="animation">/* animation placeholder */</div>}
        </div>
    );
}

export default Coin;
