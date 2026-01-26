
import "../components/ContentBlock/shop.css";

import Cards from "../pages/Cards.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

import productsData from "../../products.json";
import rightArrow from "../assets/icons/right-pagin-arrow.svg";
import leftArrow from "../assets/icons/left-pagin-arrow.svg";
import search from "../assets/icons/search.svg"

const Showcase = () => {
  const products = Array.isArray(productsData.products)
    ? productsData.products
    : Object.values(productsData.products).flat();

  return (
    <section data-testid="showcase" className="container">

        <div className="shop-controls">
            <div className="shop-search">
                <label>
                    <input type="text" placeholder="Search" className="input search-row"/>
                    <img src={search} alt="Search Icon" className="search-icon"/>
                </label>
            </div>

            <div className="products-count">
            There are <span className="bold">24</span> products in this category
            </div>

            <div className="shop-sort">
            <select className="input">
                <option value="RELEVANCE">Relevance</option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
            </select>
            </div>
        </div>
      

        {/* ОСНОВНОЙ LAYOUT: sidebar слева, товары справа */}
        <div className="shop-layout">
        <Sidebar />

        <div className="products-wrapper">
            <Cards products={products.slice(0, 12)} />
        </div>
        </div>

        {/* PAGINATION — внизу страницы над Footer */}
        <div className="pagination">
        <div className="button-left">
            <img src={leftArrow} alt="" />
        </div>

        <div className="pages">
            <div className="page active">1</div>
            <div className="page">2</div>
            <div className="page">3</div>
        </div>

        <div className="button-right">
            <img src={rightArrow} alt="" />
        </div>
        </div>

    </section>
  );
};

export default Showcase;
