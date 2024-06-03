import React, { useState } from 'react';
import Web3 from 'web3';

const CreateToken = ({ account }) => {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');

    const createToken = async () => {
        // Sample code to interact with a smart contract for token creation
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        await contract.methods.createToken(name, symbol).send({ from: account });

        console.log('Token Created:', name, symbol);
    };

    return (
        <div className='flex justify-center items-center'>
            <input
                type="text"
                placeholder="Token Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Token Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
            />
            <button onClick={createToken}>Create Token</button>
        </div>
    );
};

export default CreateToken;
