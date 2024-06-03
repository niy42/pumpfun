import React from 'react'
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const WalletConnect = ({ setAccount }) => {
  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const web3 = new Web3(provider);
      const account = web3.eth.requestAccounts();
      setAccount(account[0]);

    } else {
      console.log('Please, install MetaMask!');
    }
  };

  return (
    <div className='flex items-start justify-end p-4'>
      <button className='border bg-blue-800 rounded-md p-2 items-center justify-center' onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  )
}

export default WalletConnect;
