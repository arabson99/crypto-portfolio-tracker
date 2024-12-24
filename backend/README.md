# Backend API Documentation

## Overview

This project provides an API for managing cryptocurrency portfolios. You can create, update, retrieve, and delete portfolios through HTTP requests. The API supports various actions such as adding, removing, and updating portfolio contents.

## API Endpoints

### 1. **Get All Portfolios**
   - **Endpoint**: `GET /api/portfolios`
   - **Description**: Retrieves a list of all portfolios.
   - **Example `curl` Command**:
     ```bash
     curl -XGET http://localhost:5000/api/portfolios -H "Authorization: Bearer <Your-Token>"
     ```

### 2. **Create a New Portfolio**
   - **Endpoint**: `POST /api/portfolios`
   - **Description**: Creates a new portfolio with a list of coins.
   - **Example `curl` Command**:
     ```bash
     curl -X POST http://localhost:5000/api/portfolios -H "Authorization: Bearer <Your-Token>" -H "Content-Type: application/json" -d '{"name": "My Crypto Portfolio", "coins": [{"symbol": "bitcoin", "amount": 0.5}, {"symbol": "ethereum", "amount": 2.0}, {"symbol": "solana", "amount": 100}]}'
     ```

### 3. **Get Portfolio Prices**
   - **Endpoint**: `GET /api/portfolio/{id}/prices`
   - **Description**: Retrieves the current price for each coin in a specific portfolio.
   - **Example `curl` Command**:
     ```bash
     curl -XGET http://localhost:5000/api/portfolio/{id}/prices -H "Authorization: Bearer <Your-Token>"
     ```

### 4. **Update Portfolio**
   - **Endpoint**: `PUT /api/portfolios/{id}`
   - **Description**: Updates the portfolio by adding, removing, or modifying coins.
   - **Actions**:
     - **add**: Add coins to the portfolio.
     - **remove**: Remove coins from the portfolio.
     - **update**: Update the amount of a coin in the portfolio.
   - **Example `curl` Command (Add)**:
     ```bash
     curl -X PUT http://localhost:5000/api/portfolios/{id} -H "Authorization: Bearer <Your-Token>" -H "Content-Type: application/json" -d '{"action": "add", "symbol": "tron", "amount": 1000000}'
     ```

### 5. **Delete Portfolio**
   - **Endpoint**: `DELETE /api/portfolio/{id}`
   - **Description**: Deletes a portfolio by ID.
   - **Example `curl` Command**:
     ```bash
     curl -X DELETE http://localhost:5000/api/portfolio/{id} -H "Authorization: Bearer <Your-Token>"
     ```

## Authentication

All requests require an `Authorization` header with a Bearer token. Replace `<Your-Token>` in the example `curl` commands with a valid JWT token.

## Example Workflow

Here’s an example of how to interact with the API using `curl`:

1. **Create a new portfolio**:
   ```bash
   curl -X POST http://localhost:5000/api/portfolios -H "Authorization: Bearer <Your-Token>" -H "Content-Type: application/json" -d '{"name": "My Crypto Portfolio", "coins": [{"symbol": "bitcoin", "amount": 0.5}, {"symbol": "ethereum", "amount": 2.0}, {"symbol": "solana", "amount": 100}]}'


2. **Get Portfolio Prices**
   - **Endpoint**: `GET /api/portfolio/{id}/prices`
   - **Description**: Retrieves the current price for each coin in a specific portfolio.
   - **Example `curl` Command**:
     ```bash
     curl -XGET http://localhost:5000/api/portfolio/{id}/prices -H "Authorization: Bearer <Your-Token>"
     ```

3. **Update Portfolio by Adding a Coin**
   - **Endpoint**: `PUT /api/portfolios/{id}`
   - **Description**: Updates the portfolio by adding a coin to it.
   - **Example `curl` Command**:
     ```bash
     curl -X PUT http://localhost:5000/api/portfolios/{id} -H "Authorization: Bearer <Your-Token>" -H "Content-Type: application/json" -d '{"action": "add", "symbol": "tron", "amount": 1000000}'
     ```

4. **Delete Portfolio**
   - **Endpoint**: `DELETE /api/portfolio/{id}`
   - **Description**: Deletes a portfolio by ID.
   - **Example `curl` Command**:
     ```bash
     curl -X DELETE http://localhost:5000/api/portfolio/{id} -H "Authorization: Bearer <Your-Token>"
     ```

## Error Handling

- **401 Unauthorized**: If the token is missing or invalid.
- **400 Bad Request**: If the request is improperly formatted or contains invalid data.
- **404 Not Found**: If the portfolio or resource cannot be found.
- **500 Internal Server Error**: If something goes wrong on the server-side.

## Conclusion

This API allows for effective management of cryptocurrency portfolios. You can create, update, retrieve, and delete portfolios, as well as get real-time prices of the coins within them. Use `curl` to interact with the endpoints, ensuring you include the correct Authorization token for authentication.
