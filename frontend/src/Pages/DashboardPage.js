import React, { useState } from "react";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner/Banner"; // Adjust the path if needed
import CoinsTable from "../components/CoinsTable"; // Adjust the path if needed
import axiosInstance from "../utils/axios";

const DashboardPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

   
    // Redirect to the home page (or login page)
    navigate("/");
  };

  const handleNewPortfolioClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPortfolioName("");
    setError("");
    setSuccessMessage("");
  };

  const handleCreatePortfolio = async () => {
    if (!portfolioName.trim()) {
      setError("Portfolio name cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      // Make the API call to create the portfolio
      const response = await axiosInstance.post('/portfolios',
        { name: portfolioName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as the Authorization header
          },
        }
      );

      // If successful, show success message
      setSuccessMessage("Portfolio created successfully!");
      setPortfolioName("");
      setError("");
    } catch (err) {
      // Handle error
      setError("Failed to create portfolio. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Logout button positioned at the top right */}
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Explore your cryptocurrency portfolios, track your investments, and stay updated.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/portfolios")}
          sx={{ margin: "10px" }}
        >
          View Portfolios
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNewPortfolioClick}
          sx={{ margin: "10px" }}
        >
          New Portfolio
        </Button>
      </Box>

      <Banner />
      <CoinsTable />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Portfolio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Portfolio Name"
            fullWidth
            variant="outlined"
            value={portfolioName}
            onChange={(e) => {
              setPortfolioName(e.target.value);
              setError(""); // Clear error if the user starts typing
              setSuccessMessage(""); // Clear success message if the user starts typing
            }}
            error={!!error}
            helperText={error}
          />
          {successMessage && (
            <Typography variant="body2" color="success.main" sx={{ marginTop: "10px" }}>
              {successMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreatePortfolio}
            color="primary"
            disabled={loading || !portfolioName.trim()}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default DashboardPage;
