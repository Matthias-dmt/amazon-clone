import React from "react";
import "../css/Header.scss";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useStateValue } from "../store/StateProvider";
import { getBasketItemsSum } from "../store/reducer";
import STORE_CONST from "../store/store-const";
import { auth } from "../firebase.js";


function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    user && auth.signOut().then(() => {
      dispatch({
        type: STORE_CONST.SET_USER,
        user: null,
      });
    }).catch((error) => {
      alert(error.message)
    }); 
  };

  return (
    <header className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon logo"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <nav className="header__nav">
        <Link to={!user && "/login"} onClick={handleAuthentication} className="header__option">
          <span className="header__optionLineOne">Hello { !user ? 'guest' : user.email}</span>

          <span className="header__optionLineTwo">
            {user ? "Sign Out" : "Sign In"}
          </span>
        </Link>

        <Link to={"/orders"} className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout" className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">
            {getBasketItemsSum(basket)}
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
