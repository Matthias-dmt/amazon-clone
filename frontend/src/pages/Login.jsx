import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useStateValue } from "../store/StateProvider";
import useInput from "../hooks/useInput";
import "../css/Login.scss";
import { auth } from "../firebase.js";
import STORE_CONST from "../store/store-const";

function Login() {
  const navigate = useNavigate();
  let [email, emailInput] = useInput({ type: "text", name: "email" });
  let [password, passwordInput] = useInput({
    type: "password",
    name: "password",
  });
  const [, dispatch] = useStateValue()

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        console.log(auth, 'after login');
        dispatch({
          type: STORE_CONST.SET_USER,
          user: auth.user
        })
        navigate('/')
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        email = '';
        password = '';
        auth && navigate('/')
      })
      .catch((error) => alert(error.message));
  };

  return (
    <main className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>

      <section className="login__container">
        <h1>Sign-in</h1>

        <form action="">
          <label htmlFor="email">E-mail</label>
          {emailInput}

          <label htmlFor="password">Password</label>
          {passwordInput}

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookis Notice and our
          Interest-Based Ads
        </p>

        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </section>
    </main>
  );
}

export default Login;
