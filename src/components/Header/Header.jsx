import { useEffect, useState } from "react";
import "./header.css";

import logo from "../../assets/icons/logo.svg";
import arrow from "../../assets/icons/arrow.svg";
import arrowPink from "../../assets/icons/arrow-pink.svg";
import search from "../../assets/icons/search.svg";
import profile from "../../assets/icons/profile.svg";
import heart from "../../assets/icons/heart.svg";
import cart from "../../assets/icons/cart.svg";

const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

const getFavoritesCount = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.length;
};

const Header = ({ onShop, onCart }) => {
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(getCartCount());
      setFavCount(getFavoritesCount());
    };

    updateCounts();

    // обновление при изменении localStorage
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  return (
    <header data-testid="header" className="header">
      <div className="left-side">
        <div className="logo-container">
          <div className="burger-menu">
            <input
              type="checkbox"
              id="burger-checkbox"
              className="burger-checkbox"
            />
            <label htmlFor="burger-checkbox" className="burger" />
          </div>

          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>

        <div className="menu">
          <div className="menu-item">
            <span>Home</span>
          </div>

          <div className="menu-item">
            <span>Pages</span>
            <img src={arrow} alt="" className="arrow-default" />
            <img src={arrowPink} alt="" className="arrow-hover" />
          </div>

          {/* Shop — выглядит как Pages, но кликабельный */}
          <div
            data-testid="shop-btn"
            className="menu-item"
            onClick={onShop}
          >
            <span>Shop</span>
            <img src={arrow} alt="" className="arrow-default" />
            <img src={arrowPink} alt="" className="arrow-hover" />
          </div>

          <div className="menu-item">
            <span>Blog</span>
          </div>

          <div className="menu-item">
            <span>Contact</span>
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="header-icon">
          <img src={search} alt="" />
        </div>

        <div className="header-icon">
          <img src={profile} alt="" />
        </div>

        {/* Favorites */}
        <div className="header-icon">
          <img src={heart} alt="favorites" />
          {favCount > 0 && (
            <span className="counter">{favCount}</span>
          )}
        </div>

        {/* Cart */}
        <div
          data-testid="cart-btn"
          className="header-icon"
          onClick={onCart}
        >
          <img src={cart} alt="cart" />
          {cartCount > 0 && (
            <span className="counter">{cartCount}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
