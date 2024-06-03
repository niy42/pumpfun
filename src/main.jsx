import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Form, CandlestickChart, CandlestickChart1 } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/form' element={<Form />} />
        <Route path='/chartpage' element={<CandlestickChart />} />
        <Route path='/chartpage1' element={<CandlestickChart1 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  ,
)
