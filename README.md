# Crypto Portfolio Tracker

## Project Overview
The **Crypto Portfolio Tracker** is a web application that helps users track their cryptocurrency holdings, visualize portfolio data, and monitor real-time market trends. This project is divided into two main parts:
- **Backend**: Handles API requests, database interactions, and authentication.
- **Frontend**: Provides a user-friendly interface for managing and visualizing portfolios.

---

## Project Structure

The project follows a modular and organized structure for easier collaboration and scalability:

```plaintext
crypto-portfolio-tracker/
├── backend/                      # Backend-related code
│   ├── controllers/              # Functions handling requests and responses
│   │   ├── authController.js     # Authentication logic
│   │   ├── portfolioController.js  # Portfolio-related logic
│   ├── models/                   # Mongoose models (database schemas)
│   │   ├── User.js               # User schema
│   │   ├── Portfolio.js          # Portfolio schema
│   ├── routes/                   # API route definitions
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── portfolioRoutes.js    # Portfolio routes
│   ├── utils/                    # Utility functions or helpers
│   │   ├── apiClient.js          # API request handling
│   │   ├── errorHandler.js       # Error handling middleware
│   ├── config/                   # Configuration files
│   │   ├── db.js                 # MongoDB connection logic
│   │   ├── secrets.js            # Secrets/Environment variables
│   ├── middlewares/              # Middleware functions
│   │   ├── authMiddleware.js     # Authentication middleware
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Backend environment variables
│   └── README.md                 # Backend-specific documentation
├── frontend/                     # Frontend-related code
│   ├── public/                   # Public static files (e.g., index.html)
│   ├── src/                      # Source files for the React app
│   │   ├── components/           # Reusable React components
│   │   │   ├── Auth/             # Components for login/signup
│   │   │   │   ├── Login.js      
│   │   │   │   ├── Signup.js     
│   │   │   ├── Portfolio/        # Components for the portfolio UI
│   │   │       ├── PortfolioList.js
│   │   │       ├── PortfolioChart.js
│   │   ├── pages/                # React pages
│   │   │   ├── HomePage.js       
│   │   │   ├── DashboardPage.js  
│   │   │   ├── LoginPage.js      
│   │   │   ├── SignupPage.js     
│   │   ├── services/             # Services to interact with the backend API
│   │   │   ├── authService.js    
│   │   │   ├── portfolioService.js
│   │   ├── utils/                # Utility functions/helpers
│   │   │   ├── formatCurrency.js 
│   │   ├── App.js                # Main React component
│   │   ├── index.js              # React app entry point
│   ├── package.json              # Frontend dependencies
│   ├── .env                      # Frontend environment variables
│   └── README.md                 # Frontend-specific documentation
├── docs/                         # Documentation for the project
│   ├── API.md                    # API documentation
│   ├── Setup.md                  # Setup instructions
│   ├── Features.md               # Feature overview
├── .gitignore                    # Git ignore file
├── README.md                     # Project-level documentation
├── LICENSE                       # License for the project
└── .env                          # Global environment variables
