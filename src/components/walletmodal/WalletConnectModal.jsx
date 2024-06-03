import React, { useState, useEffect } from 'react';
import './WalletConnectModal.css'; // Assuming you have a CSS file for styling
import logo from '../../assets/react.svg';
import metamask from '../../assets/metamask.svg';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const WalletConnectModal = ({ onClose, isMetaMaskConnected, onMetaMaskConnect }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div>
          <h2>Select Wallet</h2>
          {!isMetaMaskConnected && (
            <button className='flex items-center justify-center p-2 bg-gray-600 rounded-md w-64' onClick={onMetaMaskConnect}>
              <div className='flex items-center'>
                <img src={metamask} className='w-5 h-5' alt="MetaMask Logo" />
                <p className='ml-16'>MetaMask</p>
              </div>
            </button>
          )}
          <button className='flex items-center justify-center p-2 bg-gray-600 rounded-md w-64' onClick={() => alert('Connecting to WalletConnect...')}>
            <div className='flex items-center'>
              <img src={logo} className='w-5 h-5' alt="WalletConnect Logo" />
              <p className='ml-16'>WalletConnect</p>
            </div>
          </button>
          <button className='flex items-center justify-center p-2 bg-gray-600 rounded-md w-64' onClick={() => alert('Connecting to Torus...')}>
            <div className='flex items-center'>
              <img src={logo} className='w-5 h-5' alt="Torus Logo" />
              <p className='ml-16'>Torus</p>
            </div>
          </button>
          <button className='flex items-center justify-center p-2 bg-gray-600 rounded-md w-64' onClick={() => alert('Connecting to Solflare...')}>
            <div className='flex items-center'>
              <img src={logo} className='w-5 h-5' alt="Solflare Logo" />
              <p className='ml-16'>Solflare</p>
            </div>
          </button>
          <button className='flex items-center justify-center p-2 bg-gray-600 rounded-md w-64' onClick={() => alert('Connecting to Ledger...')}>
            <div className='flex items-center '>
              <img src={logo} className='w-5 h-5' alt="Ledger Logo" />
              <p className='ml-16'>Ledger</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const WalletConnectButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        // MetaMask is locked or the user has disconnected
        setIsMetaMaskConnected(false);
        setAccount(null);
        localStorage.removeItem('isMetaMaskConnected');
        localStorage.removeItem('account');
      } else {
        setIsMetaMaskConnected(true);
        setAccount(accounts[0]);
        localStorage.setItem('isMetaMaskConnected', 'true');
        localStorage.setItem('account', accounts[0]);
      }
    };

    const checkMetaMaskConnection = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setIsMetaMaskConnected(true);
          setAccount(accounts[0]);
          localStorage.setItem('isMetaMaskConnected', 'true');
          localStorage.setItem('account', accounts[0]);
        } else {
          setIsMetaMaskConnected(false);
          setAccount(null);
          localStorage.removeItem('isMetaMaskConnected');
          localStorage.removeItem('account');
        }
        provider.on('accountsChanged', handleAccountsChanged);
      }
    };

    const storedConnectionStatus = localStorage.getItem('isMetaMaskConnected');
    const storedAccount = localStorage.getItem('account');
    if (storedConnectionStatus === 'true' && storedAccount) {
      setIsMetaMaskConnected(true);
      setAccount(storedAccount);
    } else {
      checkMetaMaskConnection();
    }

    return () => {
      const cleanup = async () => {
        const provider = await detectEthereumProvider();
        if (provider) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
      cleanup();
    };
  }, []);

  const handleMetaMaskConnect = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsMetaMaskConnected(true);
        localStorage.setItem('isMetaMaskConnected', 'true');
        localStorage.setItem('account', accounts[0]);
      }
    }
  };

  const handleDisconnect = () => {
    setIsMetaMaskConnected(false);
    setAccount(null);
    localStorage.removeItem('isMetaMaskConnected');
    localStorage.removeItem('account');
  };

  const handleConnectWallet = () => {
    setShowModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex items-start justify-end p-4'>
      <button onClick={handleConnectWallet} className="p-2 bg-blue-800 rounded-md connect-wallet-button">
        {isMetaMaskConnected ? `Connected: ${account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ''}` : 'Connect Wallet'}
      </button>
      {isMetaMaskConnected && (
        <button onClick={handleDisconnect} className="p-2 bg-red-800 rounded-md ml-2 disconnect-wallet-button">
          Disconnect
        </button>
      )}
      {showModal && (
        <WalletConnectModal
          onClose={handleCloseModal}
          isMetaMaskConnected={isMetaMaskConnected}
          onMetaMaskConnect={handleMetaMaskConnect}
        />
      )}
    </div>
  );
};

export default WalletConnectButton;
