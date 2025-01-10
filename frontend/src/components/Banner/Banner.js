import { Container, Typography, Box } from '@mui/material';
import React from 'react';
import Carousel from "./Carousel";
import { styled } from '@mui/system';

// Styled components
const BannerWrapper = styled('div')({
  backgroundImage: "url(./banner3.jpg)",
});

const BannerContent = styled(Container)({
  height: 400,
  display: "flex",
  flexDirection: "column",
  paddingTop: 25,
  justifyContent: "space-around",
});

const Tagline = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "40%",
  textAlign: "center",
});

const BannerTitle = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 15,
  fontFamily: "Montserrat",
});

const BannerSubtitle = styled(Typography)({
  color: "darkgrey",
  textTransform: "capitalize",
  fontFamily: "Montserrat",
});

const CarouselContainer = styled('div')({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

function Banner() {
  return (
    <BannerWrapper>
      <BannerContent>
        <Tagline>
          <BannerTitle variant="h2">
            Cryptocurrency Portfolio Tracker
          </BannerTitle>
          <BannerSubtitle variant="subtitle2">
            scale through and know more about your crypto coins
          </BannerSubtitle>
        </Tagline>
        <CarouselContainer>
          <Carousel />
        </CarouselContainer>
      </BannerContent>
    </BannerWrapper>
  );
}

export default Banner;
