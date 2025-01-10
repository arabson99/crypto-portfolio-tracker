import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreatePortfolio from './components/Portfolio/CreatePortfolio';
import PortfolioList from './components/Portfolio/PortfolioList';
import PortfolioDetails from './components/Portfolio/PortfolioDetails';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/portfolio/create" element={<CreatePortfolio />} />
    <Route path="/portfolio" element={<PortfolioList />} />
    <Route path="/portfolio/:id" element={<PortfolioDetails />} />
  </Routes>
);

export default AppRoutes;
