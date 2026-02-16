  const CartItem = ({ item, increase, decrease, removeItem }) => {
    const { id, name, price, oldPrice, quantity } = item;
    // const displayName = name || title;
  
    return (
      <div 
        className="product" 
        data-testid="cart-item" 
        data-price={Number(price)}
        data-name={name}
      >
        <div className="product-info">
          {/* <div className="title" data-testid="cart-item-name">{displayName}</div> */}
          <div className="title" data-testid="cart-item-name">
          {name}
        </div>
  
          <div className="price-wrapper">
            <div className="price-and-quantity">
              <div className="price">
                {oldPrice && <div className="old-price">{Number(oldPrice).toFixed(2)}</div>}
                <div className="current-price">{Number(price).toFixed(2)}</div>
              </div>
  
              <div className="quantity">
                <button data-testid="decrease-cart-btn" onClick={() => decrease(id)}>
                  -
                </button>
                <div data-testid="cart-item-quantity">{Number(quantity)}</div>
                <button data-testid="increase-cart-btn" onClick={() => increase(id)}>
                  +
                </button>
              </div>
            </div>
  
            <div className="total-price" data-testid="cart-item-total">
              {(Number(price) * Number(quantity)).toFixed(2)}
            </div>
          </div>
  
          <button data-testid="remove-from-cart-btn" onClick={() => removeItem(id)}>
            X
          </button>
        </div>
      </div>
    );
  };
  
  export default CartItem;
  