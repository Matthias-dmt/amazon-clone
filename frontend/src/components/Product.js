import React from "react";
import "../css/Product.scss";
import { useStateValue } from "../store/StateProvider";
import STORE_CONST from "../store/store-const";
import { filteredBasket } from "../store/reducer";

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue();

  const addToBasket = (e) => {
    const basket = [
      ...state.basket,
      {
        id,
        title,
        image,
        price,
        rating,
        count: 1
      },
    ];

    dispatch({
      type: STORE_CONST.ADD_NEW_ITEM_TO_BASKET,
      newBasket: filteredBasket(basket)
    });
  };

  return (
    <article className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array.from(Array(rating), (_, i) => {
            return <p key={i}>🌟</p>;
          })}
        </div>
      </div>

      <img src={image} alt="selling object" />

      <button onClick={addToBasket}>Add to basket</button>
    </article>
  );
}

export default Product;
