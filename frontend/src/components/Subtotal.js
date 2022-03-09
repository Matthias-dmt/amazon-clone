import React from "react";
import "../css/Subtotal.scss";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../store/StateProvider";
import { getBasketTotal, getBasketItemsSum } from "../store/reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();

  const [state] = useStateValue();

  const { basket } = state;

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getBasketItemsSum(basket)} items):{" "}
              <strong>{value}</strong>{" "}
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={e => navigate('/payment')}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
