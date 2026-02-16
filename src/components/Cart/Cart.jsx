import { useState, useMemo } from "react";
import "./cart.css";
import promoArrow from "../../assets/icons/promo-code-arrow.svg";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";

const DELIVERY_PRICE = 15;

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");

  /* ---------- QUANTITY HANDLERS ---------- */
  const increase = (id) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage")); //added
      return updated;
    });
  };

  const decrease = (id) => {
    setCartItems((prev) => {
      const updated = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Number(item.quantity) - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage")); //added
      return updated;
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage")); //added
      return updated;
    });
  };

  /* ---------- PROMOCODE HANDLERS ---------- */
  const applyPromo = () => setAppliedPromo(promoCode.trim());

  /* ---------- CALCULATIONS ---------- */
  const orderPrice = useMemo(() => {
    return Number(
      cartItems
        .reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
        .toFixed(2)
    );
  }, [cartItems]);

  const discountPercent = appliedPromo.toLowerCase() === "ilovereact" ? 10 : 0;

  const discountValue = useMemo(() => {
    return Number(((orderPrice * discountPercent) / 100).toFixed(2));
  }, [orderPrice, discountPercent]);

  const totalPrice = useMemo(() => {
    return Number((orderPrice - discountValue + DELIVERY_PRICE).toFixed(2));
  }, [orderPrice, discountValue]);

  /* ---------- CHECKOUT ---------- */
  const handleCheckout = () => {
    console.log("Your order:");
    console.log({
      items: cartItems,
      orderPrice,
      discount: discountPercent,
      delivery: DELIVERY_PRICE,
      total: totalPrice,
    });
  };

  return (
    <section data-testid="cart-page" className="container">
      <div className="cart">
        <div className="order-wrapper">
          {cartItems.length === 0 && (
            <div data-testid="cart-empty">Cart is empty</div>
          )}

          <CartList
            items={cartItems}
            increase={increase}
            decrease={decrease}
            removeItem={removeItem}
          />

          <OrderSummary
            orderPrice={orderPrice}
            discountPercent={discountPercent}
            delivery={DELIVERY_PRICE}
            total={totalPrice}
            onCheckout={handleCheckout}
          />
        </div>

        {/* PROMO CODE */}
        <div className="promo-code-wrapper">
          <div className="info">
            <div className="title">You Have A Promo Code?</div>
            <div className="decription">
              To receive up-to-date promotional codes, subscribe to us on social networks.
            </div>
          </div>

          <div className="promo-code">
            <input
              data-testid="promo-code-input"
              type="text"
              className="input"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <div className="button-wrapper">
              <button
                className="button"
                data-testid="apply-promo-btn"
                onClick={applyPromo}
              >
                <img src={promoArrow} alt="Arrow Icon" />
              </button>
              <div className="vertical-line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
