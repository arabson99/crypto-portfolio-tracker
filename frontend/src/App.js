import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";  // Import LoginPage component
import PortfolioPage from './Pages/PortfolioPage';
import About from './Pages/About';
import PortfolioDetailPage from './Pages/PortfolioDetailPage';
import SignUpPage from "./Pages/SignUpPage";  // Import SignUpPage component
import { styled } from "@mui/material/styles";

// Styled component for App container
const AppContainer = styled('div')({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
          <Route path="/login" element={<LoginPage />} />  {/* Login Route */}
          <Route path="/signup" element={<SignUpPage />} />  {/* SignUp Route */}
          <Route path="/portfolios" element={<PortfolioPage />} />
          <Route path="/portfolio/:portfolioId" element={<PortfolioDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
