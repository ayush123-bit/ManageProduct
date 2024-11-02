import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/HomePage.js';
import { EmailProvider } from './EmailContext.js';
import Login from './components/Login';
import Navbar from './components/header/Navbar';
import ProductRegistration from './components/ProductRegistration.js';
import BarcodeScanner from './components/BarcodeScanner.js';
import HomePage from './components/HomePage.js';
import ProductSearch from './components/ProductSearch.js';
import BillCards from './components/BillCards.js';
import ProfilePage from './components/ProfilePage.js';
import UpdatePage from './components/UpdatePage.js';

function App() {
  return (
    <EmailProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/enter" element={<Login />} />
            <Route path="/bill" element={<BillCards />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/update" element={<UpdatePage />} />
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/registerdata" element={<ProductRegistration />} />
            
          </Routes>
        </div>
      </Router>
    </EmailProvider>
  );
}

export default App;
