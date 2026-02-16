import { useEffect, useMemo, useState } from "react";
import "../components/ContentBlock/shop.css";

import Cards from "../pages/Cards.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Search from "../components/Search/Search.jsx";

import productsData from "../../products.json";
import rightArrow from "../assets/icons/right-pagin-arrow.svg";
import leftArrow from "../assets/icons/left-pagin-arrow.svg";
import searchIcon from "../assets/icons/search.svg";

const PRODUCTS_PER_PAGE = 12;

const Showcase = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    category: "all",
    colors: [],
    priceMin: null,
    priceMax: null,
  });

  const [priceBounds, setPriceBounds] = useState({
    min: 0,
    max: 0,
  });
  
  const [sortBy, setSortBy] = useState("relevance");
  const [isSortOpen, setIsSortOpen] = useState(false);




  /* ---------- init products + price bounds ---------- */
  useEffect(() => {
    if (!Array.isArray(productsData.products)) return;

    const prices = productsData.products.map((p) => p.price);
    const withIndex = productsData.products.map((p, index) => ({
        ...p,
        __index: index,
      }));
  
    setProducts(withIndex);
    setPriceBounds({
        min: Math.min(...prices),
        max: Math.max(...prices),
    })
    }, []);

  /* ---------- sidebar options ---------- */
const categories = products.length
? ["All", ...Array.from(new Set(products.flatMap(p => p.categories)))]
: ["All"];

const colors = products.length
? Array.from(
    new Set(
      products
        .map(p => p.color)
        .filter(Boolean)
        .map(c => c.trim().toLowerCase())
    )
  )
: [];

  const minPrice = priceBounds.min;
  const maxPrice = priceBounds.max;

  /* ---------- filtering (FIXED PRICE LOGIC) ---------- */
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


// const sortedProducts = useMemo(() => {
//     const list = [...filteredProducts];
  
//     if (sortBy === "alphabet") {
//       list.sort((a, b) =>
//         (a.name || "").localeCompare(b.name || "")
//       );
//     }
  
//     if (sortBy === "price") {
//       list.sort((a, b) => a.price - b.price);
//     }
  
//     // relevance → дефолтный порядок
//     return list;
//   }, [filteredProducts, sortBy]);

const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
  
    switch (sortBy) {
      case "alphabet":
        list.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        break;
  
      case "price":
        list.sort((a, b) => a.price - b.price);
        break;
  
      case "relevance":
      default:
        list.sort((a, b) => a.__index - b.__index);
        break;
    }
  
    return list;
  }, [filteredProducts, sortBy]);  

  

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);


  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [sortedProducts, page]);



  /* ---------- сброс страницы при изменениях ---------- */
  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery, sortBy]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [page, totalPages]);
  

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

{/* ---------- SORT ---------- */}
<div className="shop-sort">
          <button
            data-testid="sort-selector"
            className="input"
            onClick={() => setIsSortOpen((prev) => !prev)}
          >
            Sort
          </button>

          {isSortOpen && (
            <div className="sort-dropdown">
              <button
                data-testid="sort-by-relevance"
                onClick={() => {
                  setSortBy("relevance");
                  setIsSortOpen(false);
                }}
              >
                by relevance
              </button>

              <button
                data-testid="sort-by-alphabet"
                onClick={() => {
                  setSortBy("alphabet");
                  setIsSortOpen(false);
                }}
              >
                by alphabet
              </button>

              <button
                data-testid="sort-by-price"
                onClick={() => {
                  setSortBy("price");
                  setIsSortOpen(false);
                }}
              >
                by price
              </button>
            </div>
          )}
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
          <Cards products={paginatedProducts} />
        </div>
      </div>

      {totalPages > 0 && (
        <div className="pagination">
            <button
            data-testid="previous-page-arrow"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            >
            <img src={leftArrow} alt="" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
                key={p}
                data-testid={`page-${p}`}
                data-active={page === p}
                onClick={() => setPage(p)}
            >
                {p}
            </button>
            ))}

            <button
            data-testid="next-page-arrow"
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
            <img src={rightArrow} alt="" />
            </button>
        </div>
      )}

    </section>
  );
};

export default Showcase;
