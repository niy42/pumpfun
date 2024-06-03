import React, { useState } from "react";
import { Nav, CreateToken, TokenList, WalletConnect, Dashboard, WalletConnectButton, StartCoinPage, ChartPage } from "./components";
import './App.css'


const App = () => {
  const [account, setAccount] = useState(null);
  return (
    <div className="flex flex-col min-h-screen">

      <Nav />
      {/*<WalletConnect setAccount={setAccount} />*/}
      <WalletConnectButton setAccount={setAccount} />
      <StartCoinPage />
      <ChartPage />

      <CreateToken account={account} />
      <TokenList account={account} />
      <Dashboard />

    </div>
  )
}

export default App;