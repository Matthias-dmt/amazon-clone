import React from "react";
import { useStateValue } from "../store/StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function CheckoutProducts() {
  const [{ basket }] = useStateValue();
  return (
    <div>
      {basket?.map((item, i) => (
        <div key={i} >
          <CheckoutProduct
          innerRef={i}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            rating={item.rating}
            count={item.count}
          />
        </div>
      ))}
    </div>
  );
}

export default CheckoutProducts;
