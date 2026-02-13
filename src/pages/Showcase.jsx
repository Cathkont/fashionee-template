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
//   const [currentPage, setCurrentPage] = useState(1);
//   const [page, setPage] = useState(1);



  /* ---------- init products + price bounds ---------- */
  useEffect(() => {
    if (!Array.isArray(productsData.products)) return;

    const prices = productsData.products.map((p) => p.price);
    const withIndex = productsData.products.map((p, index) => ({
        ...p,
        __index: index,
      }));
  
    setProducts(withIndex);
    // setProducts(productsData.products);
    setPriceBounds({
        min: Math.min(...prices),
        max: Math.max(...prices),
    })

//     setProducts(productsData.products);
//     setPriceBounds({ min, max });
//   }, []);

    // setProducts(productsData.products.map((p, index) => ({
    //     ...p,
    //     __index: index,
    // })));
    }, []);

  /* ---------- sidebar options ---------- */
//   const categories =
//     products.length > 0
//       ? ["All", ...Array.from(new Set(products.flatMap((p) => p.categories)))]
//       : ["All"];
const categories = products.length
? ["All", ...Array.from(new Set(products.flatMap(p => p.categories)))]
: ["All"];

//   const colors =
//     products.length > 0
//       ? Array.from(
//           new Set(
//             products
//               .map((p) => p.color)
//               .filter(Boolean)
//               .map((c) => c.trim().toLowerCase())
//           )
//         )
//       : [];
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

//   const sortedProducts = useMemo(() => {
//     const list = [...filteredProducts];
  
//     switch (sortBy) {
//       case "alphabet-asc":
//         list.sort((a, b) =>
//           (a.name || "").localeCompare(b.name || "")
//         );
//         break;
  
//       case "alphabet-desc":
//         list.sort((a, b) =>
//           (b.name || "").localeCompare(a.name || "")
//         );
//         break;
  
//       case "price-asc":
//         list.sort((a, b) => a.price - b.price);
//         break;
  
//       case "price-desc":
//         list.sort((a, b) => b.price - a.price);
//         break;
  
//       case "relevance":
//       default:
//         // исходный порядок
//         break;
//     }

const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
  
    if (sortBy === "alphabet") {
      list.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }
  
    if (sortBy === "price") {
      list.sort((a, b) => a.price - b.price);
    }
  
    // relevance → дефолтный порядок
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
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages]);



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

{/* <div className="shop-sort">
  <select
    className="input"
    data-testid="sort-selector"   // ← ВОТ ЭТО ОБЯЗАТЕЛЬНО
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="relevance" data-testid="sort-by-relevance">
      by relevance
    </option>

    <option value="alphabet" data-testid="sort-by-alphabet">
      by alphabet
    </option>

    <option value="price" data-testid="sort-by-price">
      by price
    </option>
  </select>
</div> */}

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



{/* <div className="shop-sort">
  <select
    className="input"
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="relevance" data-testid="sort-by-relevance">
      by relevance
    </option>

    <option value="alphabet-asc" data-testid="sort-by-alphabet-asc">
      alphabet (A → Z)
    </option>

    <option value="alphabet-desc" data-testid="sort-by-alphabet-desc">
      alphabet (Z → A)
    </option>

    <option value="price-asc" data-testid="sort-by-price-asc">
      price (low → high)
    </option>

    <option value="price-desc" data-testid="sort-by-price-desc">
      price (high → low)
    </option>
  </select>
</div> */}

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

      {/* <div className="pagination">
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
      </div> */}
    </section>
  );
};

export default Showcase;
