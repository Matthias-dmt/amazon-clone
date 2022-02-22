import React from "react";
import "../css/CheckoutProduct.scss";
import { useStateValue } from "../store/StateProvider";
import STORE_CONST from "../store/store-const";

function CheckoutProduct({ id, image, title, price, rating, count }) {
  const [, dispatch] = useStateValue();

  const addItem = () => {
    dispatch({
      type: STORE_CONST.ADD_ITEM_FROM_BASKET,
      id
    });
  };

  const removeItem = () => {
    dispatch({
      type: STORE_CONST.REMOVE_ITEM_FROM_BASKET,
      id
    })
  };

  const removeAllItems = () => {
    dispatch({
      type: STORE_CONST.REMOVE_ALL_ITEMS_FROM_BASKET,
      id
    })
  };

  return (
    <section className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={image}
        alt="basket product"
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="checkoutProduct__rating">
          {Array.from(Array(rating), (_, i) => {
            return <p key={i}>🌟</p>;
          })}
        </div>

        <div className="checkoutProduct__itemsActions">
          <button
            onClick={removeItem}
            className="checkoutProduct__actionButton"
          >
            -
          </button>
          <small>{count}</small>
          <button onClick={addItem} className="checkoutProduct__actionButton">
            +
          </button>
        </div>
        <button onClick={removeAllItems}>remove all items from the basket</button>
      </div>
    </section>
  );
}

export default CheckoutProduct;
