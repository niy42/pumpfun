import React, { useEffect, useState } from 'react';

const TokenList = ({ account }) => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        // Fetch tokens from the blockchain
        // This is a placeholder. Replace with actual code to fetch tokens.
        setTokens([
            { name: 'SampleToken1', symbol: 'TKN1' },
            { name: 'SampleToken2', symbol: 'TKN2' }
        ]);
    }, [account]);

    return (
        <div>
            <h2>Token List</h2>
            <ul>
                {tokens.map((token, index) => (
                    <li key={index}>
                        {token.name} ({token.symbol})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TokenList;
