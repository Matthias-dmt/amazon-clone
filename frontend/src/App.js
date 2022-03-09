import "./App.scss";
import MainLayout from "./layouts";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./store/StateProvider";
import STORE_CONST from "./store/store-const";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/configureStore";
import { Provider } from "react-redux";

const promise = loadStripe(
  "pk_test_51KW15bIE280HGVnbrJFeQtBPpjgsvx6hic5wjPMW2g0ad5Wm04p8YpVDthkDEtZUrcMOSFjnfLQorXohNBR5L3iq00yOFRNix3"
);

function App() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: STORE_CONST.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: STORE_CONST.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Elements stripe={promise}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/orders" element={<Orders />} />
                </Route>
                <Route path="/login" element={<Login />} />
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </Elements>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
