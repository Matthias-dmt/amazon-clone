import React, { useRef, useState } from "react";
import "../css/Payment.scss";
import { useStateValue } from "../store/StateProvider";
import CheckoutProducts from "../components/CheckoutProducts";
import { Link } from "react-router-dom";
import { getBasketItemsSum } from "../store/reducer";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../store/reducer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import useDeepCompareEffect from "use-deep-compare-effect";
import STORE_CONST from "../store/store-const";
import { db } from "../firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState(false);
  const componentMounted = useRef(true); // (3) component is mounted

  useDeepCompareEffect(async () => {
    const {
      data: { clientSecret },
    } = await axios({
      method: "post",
      url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
    });

    componentMounted.current && setClientSecret(clientSecret);
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false when we leave the page
    };
  }, [basket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        const { amount, created } = paymentIntent;

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            amount,
            created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <main className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link to="/checkout">{getBasketItemsSum(basket)} items</Link>)
        </h1>
        <section className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </section>
        <section className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            <CheckoutProducts />
          </div>
        </section>
        <section className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={
                    processing || disabled || succeeded || !basket.length
                  }
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Payment;
