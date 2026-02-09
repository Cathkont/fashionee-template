import { useEffect, useMemo, useState } from "react";
import "../components/ContentBlock/shop.css";

import Cards from "../pages/Cards.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Search from "../components/Search/Search.jsx";

import productsData from "../../products.json";
import rightArrow from "../assets/icons/right-pagin-arrow.svg";
import leftArrow from "../assets/icons/left-pagin-arrow.svg";
import searchIcon from "../assets/icons/search.svg";

const Showcase = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * filters — это "пользовательские" значения
   * priceMin / priceMax могут быть:
   * - null  → фильтр выключен
   * - number → фильтр включён
   */
  const [filters, setFilters] = useState({
    category: "all",
    colors: [],
    priceMin: null,
    priceMax: null,
  });

  /**
   * дефолтные границы цены (из JSON)
   * НУЖНЫ для корректной логики Stage 2
   */
  const [priceBounds, setPriceBounds] = useState({
    min: 0,
    max: 0,
  });

  /* ---------- init products + price bounds ---------- */
  useEffect(() => {
    if (!Array.isArray(productsData.products)) return;

    const prices = productsData.products.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    setProducts(productsData.products);
    setPriceBounds({ min, max });
  }, []);

  /* ---------- sidebar options ---------- */
  const categories =
    products.length > 0
      ? ["All", ...Array.from(new Set(products.flatMap((p) => p.categories)))]
      : ["All"];

  const colors =
    products.length > 0
      ? Array.from(
          new Set(
            products
              .map((p) => p.color)
              .filter(Boolean)
              .map((c) => c.trim().toLowerCase())
          )
        )
      : [];

  const minPrice = priceBounds.min;
  const maxPrice = priceBounds.max;

  /* ---------- filtering (FIXED PRICE LOGIC) ---------- */
//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       /* category */
//       if (
//         filters.category !== "all" &&
//         !product.categories
//           .map((c) => c.toLowerCase())
//           .includes(filters.category)
//       ) {
//         return false;
//       }
        const filteredProducts = useMemo(() => {
            const normalizedQuery = searchQuery.trim().toLowerCase();
        
            return products.filter((product) => {
            /* category */
            if (
                filters.category !== "all" &&
                !product.categories
                .map((c) => c.toLowerCase())
                .includes(filters.category)
            ) {
                return false;
            }

    //   /* colors */
    //   if (
    //     filters.colors.length > 0 &&
    //     !filters.colors.includes(product.color?.toLowerCase())
    //   ) {
    //     return false;
    //   }

      /**
       * PRICE MIN
       * фильтр применяется ТОЛЬКО если:
       * - значение задано
       * - и оно отличается от дефолтного min
       */
    //   if (
    //     typeof filters.priceMin === "number" &&
    //     filters.priceMin !== minPrice &&
    //     product.price < filters.priceMin
    //   ) {
    //     return false;
    //   }

      /**
       * PRICE MAX
       * аналогично min
       */
    //   if (
    //     typeof filters.priceMax === "number" &&
    //     filters.priceMax !== maxPrice &&
    //     product.price > filters.priceMax
    //   ) {
    //     return false;
    //   }

      /* search */
    //   if (
    //     searchQuery &&
    //     !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    //   ) {
    //     return false;
    //   }
    // if (searchQuery) {
    //     const q = searchQuery.toLowerCase();
      
    //     const inTitle = product.title?.toLowerCase().includes(q);
    //     const inDescription = product.description?.toLowerCase().includes(q);
      
    //     if (!inTitle && !inDescription) {
    //       return false;
    //     }
    // }
    /* colors */
            if (
                filters.colors.length > 0 &&
                !filters.colors.includes(product.color?.toLowerCase())
            ) {
                return false;
            }
        
            /* price min */
            if (
                typeof filters.priceMin === "number" &&
                filters.priceMin !== minPrice &&
                product.price < filters.priceMin
            ) {
                return false;
            }
        
            /* price max */
            if (
                typeof filters.priceMax === "number" &&
                filters.priceMax !== maxPrice &&
                product.price > filters.priceMax
            ) {
                return false;
            }

            /* search */
            if (normalizedQuery) {
                const searchableText = [
                product.name,
                product.title,
                product.description,
                ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            
                if (!searchableText.includes(normalizedQuery)) {
                return false;
                }
            }

            return true;
            });
  }, [products, filters, searchQuery, minPrice, maxPrice]);

  /* ---------- render ---------- */
  return (
    <section data-testid="showcase" className="container">
      <div className="shop-controls">
        <div className="shop-search">
          <Search onSearch={setSearchQuery} />
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
        </div>

        <div className="products-count">
          There are{" "}
          <span className="bold" data-testid="products-count">
            {filteredProducts.length}
          </span>{" "}
          products in this category.
        </div>

        <div className="shop-sort">
          <select className="input">
            <option value="RELEVANCE">Relevance</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
      </div>

      <div className="shop-layout">
        <Sidebar
          categories={categories}
          colors={colors}
          minPrice={minPrice}
          maxPrice={maxPrice}
          pendingFilters={filters}
          setPendingFilters={setFilters}
        />

        <div className="products-wrapper">
          <Cards products={filteredProducts.slice(0, 12)} />
        </div>
      </div>

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
