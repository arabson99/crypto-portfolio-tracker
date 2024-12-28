import { AppBar, container, Toolbar, Typography } from "@material-ui/core";
import { MenuItem, Select, Typography } from "@mui/material";
import React from 'react'

const useStyles = makeStyles(() => ({
title: {
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",

}
}))

const Header = () => {
  return (
    <AppBar color='transparent' position='static'>
      <container>
        <Toolbar>
          <Typography>
            Crypto Trader
          </Typography>
          <Select variant="outlined" style={{
            width: 100,
            height: 40,
            marginleft: 15,
          }}>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </container>

    </AppBar>
  )
}

export default Header
