import { useEffect, useState } from "react";
import heart from "../assets/icons/heart.svg";
import heartRed from "../assets/icons/heart-red.svg";
import "../components/ContentBlock/shop.css";

const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorites") || "[]");

const getCart = () =>
  JSON.parse(localStorage.getItem("cart") || "[]");

/* Cards */
const Cards = ({ products }) => {
  return (
    <div className="products">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Cards;

/* Product Card */
const ProductCard = ({ product }) => {
  const { id, name, price, oldPrice, image, isSale, isNew } = product;

  const [favorites, setFavorites] = useState(getFavorites);
  const [cart, setCart] = useState(getCart);

  const isFavorite = favorites.includes(id);
  const quantity = cart.find(item => item.id === id)?.quantity || 0;

  /* --- Нормализация цветов и категорий --- */
  const normalizedColor = (() => {
    if (!product.color) return ""; // если цвета нет
    if (Array.isArray(product.color)) {
      return product.color.map(c => c.trim().toLowerCase()).join(",");
    }
    return product.color.trim().toLowerCase();
  })();

  const normalizedCategories = (product.categories || [])
    .map(c => c.trim().toLowerCase())
    .join(",");

  /* --- Favorites --- */
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("storage"));
  }, [favorites]);

  const toggleFavorite = () => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  /* --- Cart --- */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  const setQuantity = (qty) => {
    setCart(prev => {
      const updated = [...prev];
      const index = updated.findIndex(item => item.id === id);

      if (qty <= 0) {
        if (index !== -1) updated.splice(index, 1);
      } else {
        if (index !== -1) {
          updated[index] = { ...updated[index], quantity: qty };
        } else {
          updated.push({ id, quantity: qty });
        }
      }
      return updated;
    });
  };

  return (
    <div
      className="product"
      data-testid="product-card"
      data-product-id={id}
      data-price={price}
      data-color={normalizedColor}
      data-categories={normalizedCategories}
    >
      {/* Фото */}
      <div className="photo">
        <img src={image} alt={name} />
        <div className="card-top">
          <div className="labels">
            {isSale && <span className="label sale">Sale</span>}
            {isNew && <span className="label new">New</span>}
          </div>
          <button
            className="fav-btn"
            data-testid="favorite-btn"
            data-active={isFavorite}
            onClick={toggleFavorite}
          >
            <img src={isFavorite ? heartRed : heart} alt="favorite" />
          </button>
        </div>
      </div>

      {/* Информация */}
      <div className="info">
        <div className="name">{name}</div>
        <div className="price">
          <div className="current-price">{price}</div>
          {oldPrice && <div className="old-price">{oldPrice}</div>}
        </div>
      </div>

      {/* Cart */}
      <div className="product-actions">
        {quantity === 0 ? (
          <button
            className="buy-btn"
            data-testid="add-to-cart-btn"
            onClick={() => setQuantity(1)}
          >
            Buy
          </button>
        ) : (
          <div className="quantity">
            <button
              className="count-button"
              data-testid="decrease-qty-btn"
              onClick={() => setQuantity(quantity - 1)}
            >
              −
            </button>
            <div className="count" data-testid="product-quantity">
              {quantity}
            </div>
            <button
              className="count-button"
              data-testid="increase-qty-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
