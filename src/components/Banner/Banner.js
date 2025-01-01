import { Container, makeStyles, Typography } from '@mui/material';
import React from 'react'

const useStyles=makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner3.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",

  },
  tagline: {
display: "flex",
flexDirection: "column",
justifyContent: "center",
height: "40%",
textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
          variant="h2"
          style={{
            fontWeight: "bold",
            marginBottom: 15,
            fontFamily: "Montserrat",

          }}
          >
            Crypto Trader
          </Typography>
          <Typography
          variant="subtitle2"
          style={{
            color: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}
          >
            scale through and know more about your crypto coins

          </Typography>

        </div>
        <Carousel></Carousel>

      </Container>
    </div>
  );
}

export default Banner;
