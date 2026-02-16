import CartItem from "./CartItem";

const CartList = ({ items, increase, decrease, removeItem }) => {
  return (
    <div className="product-list">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          increase={increase}
          decrease={decrease}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default CartList;
