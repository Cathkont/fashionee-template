//npx playwright test __tests__/e2e/stage4/cart.spec.js

import { useEffect, useState } from "react";
import heart from "../assets/icons/heart.svg";
import heartRed from "../assets/icons/heart-red.svg";
import "../components/ContentBlock/shop.css";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};


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
  const [favorites, setFavorites] = useState(() => getFavorites());
  const [cart, setCart] = useState(() => getCart());
  const isFavorite = favorites.includes(id);
  const quantity = Number(cart.find(item => item.id === id)?.quantity || 0);

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
    window.dispatchEvent(new Event("storage")); //added
  }, [favorites]);

  const toggleFavorite = () => {
    let current = [];
    try {
      current = JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      current = [];
    }
  
    let updated;
  
    if (current.includes(id)) {
      updated = current.filter(f => f !== id);
    } else {
      updated = [...current, id];
    }
  
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  
    window.dispatchEvent(new Event("storage"));
  };
  

  // const toggleFavorite = () => {
  //   setFavorites(prev =>
  //     prev.includes(id)
  //       ? prev.filter(f => f !== id)
  //       : [...prev, id]
  //   );
  // };

  /* --- Cart --- */
  const setQuantity = (qty) => {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      saved = [];
    }
  
    const index = saved.findIndex(item => item.id === id);
  
    if (qty <= 0) {
      if (index !== -1) saved.splice(index, 1);
    } else if (index !== -1) {
      saved[index] = {
        ...saved[index],
        price: Number(saved[index].price) || 0,
        oldPrice: saved[index].oldPrice ? Number(saved[index].oldPrice) : null,
        quantity: Number(qty) || 0
      };
    } else {
      saved.push({
        id,
        name,
        price: Number(price) || 0,
        oldPrice: oldPrice ? Number(oldPrice) : null,
        image,
        quantity: Number(qty) || 0
      });
    }
  
    localStorage.setItem("cart", JSON.stringify(saved));
    window.dispatchEvent(new Event("storage")); //added
    setCart(saved);
  };

  return (
    <div
      className="product"
      data-testid="product-card"
      data-product-id={id}
      data-price={price}
      data-name={name} 
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
          <div className="current-price">{Number(price).toFixed(2)}</div>
          {oldPrice !== null && <div className="old-price">{Number(oldPrice).toFixed(2)}</div>}

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
