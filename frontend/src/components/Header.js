import { AppBar, Container, Toolbar, MenuItem, Select, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { styled } from '@mui/system';

// Styled components
const Title = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});

const SelectContainer = styled(Select)({
  width: 'auto',
  height: 40,
  marginLeft: 15,
  cursor: 'pointer',
});

const Header = () => {
  const history = useNavigate();
  const { currency, setCurrency } = CryptoState();
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => history.push("/")} variant="h6">
              Cryptocurrency Portfolio Tracker
            </Title>
            <SelectContainer
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </SelectContainer>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
