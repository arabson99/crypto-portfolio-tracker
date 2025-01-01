import { AppBar, container, Toolbar, MenuItem, Select, Typography } from "@material-ui/core";
import { createTheme, makeStyles, ThemeProvider, } from "@mui/material/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
title: {
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",

},
}));

function Header() {
const classes = useStyles();
const history = useHistory();
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
      <container>
        <Toolbar>
          <Typography onClick={() => history.push("/")} className={classes.title}
            variant='h6'>
            Crypto Trader
          </Typography>
          <Select variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{
            width: 100,
            height: 40,
            marginLeft: 15,
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </container>

    </AppBar>
    </ThemeProvider>
  );
}

export default Header;
