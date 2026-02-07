import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import ContentBlock from "./components/ContentBlock/ContentBlock.jsx";
import Showcase from "./pages/Showcase.jsx"
import Cart from "./pages/Cart.jsx"
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [page, setPage] = useState("shop");

  return (
    <>
      <Header
        onShop={() => setPage("shop")}
        onCart={() => setPage("cart")}
      />

      {page === "shop" && (
        <>
          <ContentBlock />
          <Showcase />
        </>
      )}

      {page === "cart" && <Cart />}

      <Footer />
    </>
  );
}

export default App;