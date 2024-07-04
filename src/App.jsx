import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import "./App.css";

function App() {
  const { target } = useParams();
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [menu, setMenu] = useState(false);
  return (
    <>
      <Header
        cartLength={cart.length}
        menu={menu}
        setMenu={setMenu}
        setSearchItem={setSearchItem}
        setModal={setModal}
      />
      {target === undefined ? (
        <Home
          searchItem={searchItem}
          setSearchItem={setSearchItem}
          setModal={setModal}
          setMenu={setMenu}
        />
      ) : target === "movies" ? (
        <Movies setMenu={setMenu} setModal={setModal} />
      ) : target === "tv-shows" ? (
        <TvShows setMenu={setMenu} setModal={setModal} />
      ) : target === "cart" ? (
        <Cart cart={cart} setCart={setCart} />
      ) : (
        <ErrorPage />
      )}
      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          cart={cart}
          setCart={setCart}
        />
      )}
      <Footer></Footer>
    </>
  );
}

export default App;
