import { styled } from '@mui/system';
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

// Styled Components
const CarouselContainer = styled('div')({
  height: '50%',
  display: 'flex',
  alignItems: 'center',
});

const CarouselItem = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
  color: 'white',
});

const ProfitSpan = styled('span')({
  fontWeight: 500,
  color: props => (props.profit > 0 ? "rgb(14, 203, 129)" : "red"),
});

const PriceSpan = styled('span')({
  fontSize: 22,
  fontWeight: 500,
});

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`} key={coin.id} style={{ textDecoration: 'none' }}>
        <CarouselItem>
          <img
            src={coin?.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10 }}
          />
          <span>
            {coin?.symbol}
            &nbsp;
            <ProfitSpan profit={coin?.price_change_percentage_24h}>
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </ProfitSpan>
          </span>
          <PriceSpan>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </PriceSpan>
        </CarouselItem>
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </CarouselContainer>
  );
};

export default Carousel;