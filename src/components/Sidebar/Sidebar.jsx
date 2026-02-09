import "../ContentBlock/shop.css";
import "../ContentBlock/commons.css";

import seasonSale from "../../assets/images/season-sale-banner.svg";

const Sidebar = ({
  categories,
  colors,
  minPrice,
  maxPrice,
  pendingFilters,
  setPendingFilters,
  setAppliedFilters,
  onApply,
}) => {
  const { category, colors: selectedColors, priceMin, priceMax } = pendingFilters;

  const toggleColor = (color) => {
    const normalized = color.toLowerCase();
    setPendingFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(normalized)
        ? prev.colors.filter((c) => c !== normalized)
        : [...prev.colors, normalized],
    }));
    setAppliedFilters((prev) => ({
        ...prev,
        colors: prev.colors.includes(normalized)
        ? prev.colors.filter((c) => c !== normalized)
        : [...prev.colors, normalized],
        }));
  };

  const handleMinPriceChange = (value) =>
    setPendingFilters((prev) => ({
      ...prev,
      priceMin: value === "" ? minPrice : Number(value),
    }));

  const handleMaxPriceChange = (value) =>
    setPendingFilters((prev) => ({
      ...prev,
      priceMax: value === "" ? maxPrice : Number(value),
    }));

  return (
    <aside className="sidebar">
      {/* Categories */}
      <div className="sidebar-item">
        <div className="sidebar-title">Categories</div>
        <div className="sidebar-content">
          <ul className="custom-list">
            {categories.map((cat) => {
              const normalized = cat.toLowerCase();
              return (
                <li
                  key={cat}
                  className={`item ${category === normalized ? "active" : ""}`}
                  data-testid={`filter-category-${normalized}`}
                  onClick={() => {
                    setPendingFilters((prev) => ({ ...prev, category: normalized }))
                    setAppliedFilters((prev) => ({ ...prev, category: normalized }));
                  }}
                >
                  {cat}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Price */}
      <div className="sidebar-item">
        <div className="sidebar-title">Price</div>
        <div className="sidebar-content">
          <div className="price-bar">
            <input
              type="number"
              value={priceMin ?? minPrice}
              min={minPrice}
              max={maxPrice}
              data-testid="price-min-input"
              onChange={(e) => handleMinPriceChange(e.target.value)}
            />
            <input
              type="number"
              value={priceMax ?? maxPrice}
              min={minPrice}
              max={maxPrice}
              data-testid="price-max-input"
              onChange={(e) => handleMaxPriceChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="sidebar-item">
        <div className="sidebar-title">Colors</div>
        <div className="sidebar-content">
          <div className="colors">
            {colors.map((color) => {
              const normalized = color.toLowerCase();
              return (
                <div className="color" key={color}>
                  <input
                    type="checkbox"
                    id={color}
                    data-testid={`filter-color-${normalized}`}
                    checked={selectedColors.includes(normalized)}
                    onChange={() => toggleColor(color)}
                  />
                  <label htmlFor={color} className="color-name">
                    {color}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Apply button */}
      <div className="sidebar-item">
        <div className="button-wrapper">
          <button
            className="button"
            data-testid="apply-filter-btn"
            onClick={onApply}
          >
            Apply Filter
          </button>
          <div className="vertical-line"></div>
        </div>
      </div>

      {/* Reviewed products & banner */}
      <div className="sidebar-item">
        <div className="sidebar-title">Reviewed by you</div>
        <div className="sidebar-content">
          <div className="reviewed-products">
            <div className="product">
              <div className="image"></div>
              <div className="info">
                <div className="name">Retro style handbag</div>
                <div className="price">
                  <div className="current-price">$35.99</div>
                  <div className="old-price">$52.99</div>
                </div>
              </div>
            </div>

            <div className="product">
              <div className="image"></div>
              <div className="info">
                <div className="name">Warm casual sweater</div>
                <div className="price">
                  <div className="current-price">$35.99</div>
                </div>
              </div>
            </div>

            <div className="product">
              <div className="image"></div>
              <div className="info">
                <div className="name">Textured turtleneck with zip</div>
                <div className="price">
                  <div className="current-price">$35.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <a href="#">
            <img src={seasonSale} alt="Season Sale Banner" />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
