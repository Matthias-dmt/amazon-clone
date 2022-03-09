import React from "react";
import "../css/Checkout.scss";
import Subtotal from "../components/Subtotal";
import CheckoutProducts from "../components/CheckoutProducts";
import { useStateValue } from "../store/StateProvider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ user }, ] = useStateValue();

  return (
    <main className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.SSL-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="amazon banner"
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          <FlipMove
            duration={300} easing="ease-in-out"
          >
            <CheckoutProducts />
          </FlipMove>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </main>
  );
}

export default Checkout;
