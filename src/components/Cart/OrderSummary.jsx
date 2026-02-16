const OrderSummary = ({ orderPrice, discountPercent, delivery, total, onCheckout }) => {
    return (
      <div className="order">
        <div className="title">Your Order</div>
  
        <div className="order-price-wrapper">
          <div className="price-row">
            <div>Order price</div>
            <div data-testid="order-price">{orderPrice.toFixed(2)}</div>
          </div>
  
          <div className="price-row">
            <div>Discount</div>
            <div data-testid="discount">{discountPercent > 0 ? `${discountPercent}%` : "No"}</div>
          </div>
  
          <div className="price-row">
            <div>Delivery</div>
            <div data-testid="delivery">{delivery.toFixed(2)}</div>
          </div>
  
          <div className="price-row total">
            <div>Total</div>
            <div data-testid="total-price">{total.toFixed(2)}</div>
          </div>
        </div>
  
        <button data-testid="checkout-btn" onClick={onCheckout}>
          Checkout
        </button>
      </div>
    );
  };
  
  export default OrderSummary;
  