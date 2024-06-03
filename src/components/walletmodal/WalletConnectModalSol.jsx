import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import './WalletConnectModal.css';
import logo from '../../assets/react.svg';
import metamask from '../../assets/metamask.svg';

// Replace with the Snap ID for Solana
const SOLANA_SNAP_ID = 'local:http://localhost:8081'; // Update this with the correct Snap ID

const WalletConnectModal = ({ onClose, isMetaMaskConnected, onMetaMaskConnect }) => {
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <h2>Select Wallet</h2>
                {!isMetaMaskConnected && (
                    <button className='flex items-center justify-center p-2 bg-gray-600 rounded-md w-64' onClick={onMetaMaskConnect}>
                        <div className='flex items-center'>
                            <img src={metamask} className='w-5 h-5' alt="MetaMask Logo" />
                            <p className='ml-16'>MetaMask</p>
                        </div>
                    </button>
                )}
                {/* Other wallet buttons here */}
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
                setIsMetaMaskConnected(false);
                setAccount(null);
                localStorage.setItem('isMetaMaskConnected', 'false');
                localStorage.removeItem('account');
            } else {
                setIsMetaMaskConnected(true);
                setAccount(accounts[0]);
                localStorage.setItem('isMetaMaskConnected', 'true');
                localStorage.setItem('account', accounts[0]);
            }
        };

        const checkMetaMaskConnection = async () => {
            try {
                const provider = await detectEthereumProvider();
                if (provider) {
                    const enableResponse = await provider.request({
                        method: 'wallet_enable',
                        params: [{
                            wallet_snap: { [SOLANA_SNAP_ID]: {} }
                        }]
                    });

                    if (enableResponse) {
                        const accounts = await provider.request({
                            method: 'wallet_invokeSnap',
                            params: [SOLANA_SNAP_ID, { method: 'getAccounts' }]
                        });

                        if (accounts.length > 0) {
                            setIsMetaMaskConnected(true);
                            setAccount(accounts[0]);
                            localStorage.setItem('isMetaMaskConnected', 'true');
                            localStorage.setItem('account', accounts[0]);
                        } else {
                            setIsMetaMaskConnected(false);
                            setAccount(null);
                            localStorage.setItem('isMetaMaskConnected', 'false');
                            localStorage.removeItem('account');
                        }
                        provider.on('accountsChanged', handleAccountsChanged);
                    }
                }
            } catch (error) {
                console.error("MetaMask connection error:", error);
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
        try {
            const provider = await detectEthereumProvider();
            if (provider) {
                const enableResponse = await provider.request({
                    method: 'wallet_enable',
                    params: [{
                        wallet_snap: { [SOLANA_SNAP_ID]: {} }
                    }]
                });

                if (enableResponse) {
                    const accounts = await provider.request({
                        method: 'wallet_invokeSnap',
                        params: [SOLANA_SNAP_ID, { method: 'getAccounts' }]
                    });

                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                        setIsMetaMaskConnected(true);
                        localStorage.setItem('isMetaMaskConnected', 'true');
                        localStorage.setItem('account', accounts[0]);
                    }
                }
            }
        } catch (error) {
            console.error("MetaMask connection error:", error);
        }
    };

    const handleConnectWallet = () => {
        setShowModal((prev) => !prev);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDisconnect = () => {
        setIsMetaMaskConnected(false);
        setAccount(null);
        localStorage.removeItem('isMetaMaskConnected');
        localStorage.removeItem('account');
    };

    return (
        <div className='flex items-start justify-end p-4'>
            <button onClick={handleConnectWallet} className="p-2 bg-blue-800 rounded-md connect-wallet-button">
                {isMetaMaskConnected ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
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
