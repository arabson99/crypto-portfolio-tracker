import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <Box
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          style={{
            textAlign: "center",
            marginBottom: "50px",
            backgroundColor: "#EEBC1D",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h3"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "20px",
            }}
          >
            Cryptocurrency Portfolio Tracker
          </Typography>
          <Typography
            variant="h6"
            style={{
              fontFamily: "Montserrat",
              color: "#fff",
              marginBottom: "30px",
            }}
          >
            Simplify your crypto investments and track them in real-time.
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#fff",
              color: "#EEBC1D",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            onClick={handleSignupRedirect}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Box style={{ marginBottom: "50px" }}>
          <Typography
            variant="h4"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              marginBottom: "20px",
              textAlign: "center",
              color: "black",
            }}
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box
                style={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              >
                <img
                  src="/images/real-time.svg"
                  alt="Real-Time Tracking"
                  height="100"
                />
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    marginTop: "10px",
                  }}
                >
                  Real-Time Prices
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: "Montserrat", color: "gray" }}
                >
                  Get instant updates on cryptocurrency prices with no delay.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                style={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              >
                <img
                  src="/images/portfolio.svg"
                  alt="Portfolio Management"
                  height="100"
                />
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    marginTop: "10px",
                  }}
                >
                  Portfolio Tracking
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: "Montserrat", color: "gray" }}
                >
                  Keep tabs on your entire investment portfolio in one place.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                style={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              >
                <img
                  src="/images/market-analysis.svg"
                  alt="Market Analysis"
                  height="100"
                />
                <Typography
                  variant="h6"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    marginTop: "10px",
                  }}
                >
                  Market Insights
                </Typography>
                <Typography
                  variant="body1"
                  style={{ fontFamily: "Montserrat", color: "gray" }}
                >
                  Access daily trends and insights to stay ahead in the market.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action Section */}
        <Box
          style={{
            textAlign: "center",
            backgroundColor: "#333",
            padding: "40px",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="body1"
            style={{
              fontFamily: "Montserrat",
              marginBottom: "30px",
              color: "#ccc",
            }}
          >
            Create an account today and take control of your crypto investments.
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#EEBC1D",
              color: "#fff",
              padding: "10px 20px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            onClick={handleSignupRedirect}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
