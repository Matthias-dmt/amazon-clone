import React, { useEffect, useState } from "react";
import Order from "../components/Order";
import "../css/Orders.scss";
import { db } from "../firebase";
import { useStateValue } from "../store/StateProvider";
import STORE_CONST from "../store/store-const";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch({
      type: STORE_CONST.EMPTY_BASKET,
    });

    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <main className="orders">
      <h1>Your Orders</h1>

      <section className="orders__order">
        {orders?.map((order, i) => (
          <Order key={i} order={order} />
        ))}
      </section>
    </main>
  );
}

export default Orders;
