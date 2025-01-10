<<<<<<< HEAD
# crypto-portfolio-tracker
Crypto Portfolio Tracker is a web application for tracking cryptocurrency portfolios. It allows users to add, manage, and monitor their crypto holdings in real-time. The application fetches cryptocurrency market data from the CoinGecko API and displays it in an easy-to-understand format. Users can view their portfolio performance, track individual coin. Built with React, Node.js, and MongoDB, it integrates live cryptocurrency data through APIs and provides insightful performance charts for managing your portfolio.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- MongoDB (or another database if configured)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arabson99/crypto-portfolio-tracker.git
   cd crypto-portfolio-tracker
   ```
2. **Install Backend dependencies:** Navigate to the backend directory and install the necessary packages:
    ```bash
    cd backend
    npm install
    ```
3. **Install Frontend dependencies:** Navigate to the frontend directory and install the necessary packages:
    ```bash
    cd frontend
    npm install
    ```
4. **Run the application:**
    - **Start the backend server:**
    ```bash
    cd backend
    npm run start-server
    ```
    - **Start the frontend server:**
    ```bash
    cd frontend
    npm start
    ```
5. Open your browser and visit `http://localhost:3000` to see the application in action.

## Usage
    Once the app is running locally, you can:

    - Add or manage crypto assets: Add your cryptocurrency holdings to track their value over time.
    - Real-time market data: View the latest cryptocurrency prices and market data.
    - Portfolio tracking: Monitor the performance of your portfolio over time with dynamic charts and insights.
    - User authentication: Users can sign in, create a profile, and manage their portfolio securely.

## Features
    - Real-time tracking: Fetch real-time market data for over 5,000 cryptocurrencies.
    - Portfolio management: Add, edit, and delete assets in your portfolio, and track their performance.
    - User authentication: Secure login and profile management.
    - Price change alerts: Set price alerts for any asset in the portfolio to be notified when a certain price is reached.
    - Responsive design: Fully responsive web application that works on desktop and mobile devices.

## Technologies Used
    - Frontend: React.js, Axios
    - Backend: Node.js, Express.js
    - Database: MongoDB 
    - API: CoinGecko API for fetching real-time cryptocurrency data
    - Authentication: JWT (JSON Web Tokens) for user authentication

## License
    This project is licensed under the MIT License - see the LICENSE file for details.
