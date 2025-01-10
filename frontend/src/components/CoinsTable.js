import React, { useEffect, useState } from "react";
import { Container, createTheme, TableCell, LinearProgress, ThemeProvider, Typography, TextField, TableBody, TableRow, TableHead, TableContainer, Table, Paper, Pagination } from "@mui/material";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { styled } from "@mui/system";

// Styled Components
const TableRowStyled = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
  fontFamily: "Montserrat",
}));

const PaginationStyled = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "gold",
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to format price in USD using Intl.NumberFormat
const formatPriceUSD = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// Function to format market cap correctly (e.g., dividing by millions or billions)
const formatMarketCapUSD = (marketCap) => {
  if (marketCap >= 1_000_000_000) {
    // Divide by billion for large market caps (e.g., $1B)
    return formatPriceUSD(marketCap / 1_000_000_000) + "B";
  } else if (marketCap >= 1_000_000) {
    // Divide by million for moderate market caps (e.g., $1M)
    return formatPriceUSD(marketCap / 1_000_000) + "M";
  } else {
    // For smaller market caps, display as it is
    return formatPriceUSD(marketCap);
  }
};

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CryptoState();
  const history = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  // Fetch coins data from CoinGecko
  const fetchCoins = async () => {
    setLoading(true);
    try {
      // Ensure currency is passed correctly
      const { data } = await axios.get(CoinList("usd"));
      console.log("API Response Data: ", data); // Log the response to check data structure
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coin data: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Handle search functionality
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRowStyled
                        onClick={() => history(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: "white" }} // Price in white
                        >
                          {formatPriceUSD(row.current_price)} {/* Price formatted in USD */}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ color: "white" }} // Market Cap in white
                        >
                          {formatMarketCapUSD(row.market_cap)} {/* Market Cap formatted in USD */}
                        </TableCell>
                      </TableRowStyled>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <PaginationStyled
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
