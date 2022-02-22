import React from "react";
import "../css/Home.scss";
import Product from "../components/Product";

function Home() {
  return (
    <main className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="amazon banner"
        />

        <div className="home__row">
          <Product
            id="06578234"
            title="The lean Startup "
            price={29.99}
            image="https://m.media-amazon.com/images/P/0670921602.01._SCLZZZZZZZ_SX500_.jpg"
            rating={5}
          />
          <Product
            id="065239878"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consequuntur, reiciendis"
            price={19.99}
            image="https://m.media-amazon.com/images/I/71JrJWP88RL._AC_SL1500_.jpg"
            rating={3}
          />
        </div>

        <div className="home__row">
          <Product
            id="06538"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consequuntur, reiciendis"
            price={14.99}
            image="https://m.media-amazon.com/images/I/51gxhQj6deS._AC_SL1000_.jpg"
            rating={4}
          />
          <Product
            id="06678"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consequuntur, reiciendis"
            price={27.99}
            image="https://m.media-amazon.com/images/I/71fX8ThiZVL._AC_SX679_.jpg"
            rating={4}
          />
          <Product
            id="06579"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consequuntur, reiciendis"
            price={1.99}
            image="https://m.media-amazon.com/images/I/61ARQhy8C0L._AC_SL1000_.jpg"
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="06570"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi consequuntur, reiciendis"
            price={1029.5}
            image="https://m.media-amazon.com/images/I/71pibGe1XUL._AC_SL1500_.jpg"
            rating={5}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
