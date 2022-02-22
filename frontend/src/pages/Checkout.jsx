import React from "react";
import "../css/Checkout.scss";
import Subtotal from "../components/Subtotal";
import CheckoutProduct from "../components/CheckoutProduct";
import { useStateValue } from "../store/StateProvider";
// import { filteredBasket } from '../store/reducer'

function Checkout() {
  const [state] = useStateValue();

  const { basket } = state;

  const displayBasket = () => {
    return basket?.map((item, i) => (
      <>
        <CheckoutProduct
          key={i}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          rating={item.rating}
          count={item.count}
        />
      </>
    ));
  };

  return (
    <main className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.SSL-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="amazon banner"
        />

        <div>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {displayBasket()}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </main>
  );
}

export default Checkout;
