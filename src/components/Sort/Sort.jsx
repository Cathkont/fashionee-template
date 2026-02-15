import "../ContentBlock/shop.css";

const Sort = ({ value, onChange }) => {
  return (
    <div className="shop-sort">
      <select
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="relevance" data-testid="sort-by-relevance">
          Relevance
        </option>
        <option value="alphabet" data-testid="sort-by-alphabet">
          Alphabet
        </option>
        <option value="price" data-testid="sort-by-price">
          Price
        </option>
      </select>
    </div>
  );
};

export default Sort;
