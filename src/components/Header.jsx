import styles from "../styles/Header.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Header({ cartLength, menu, setMenu, setSearchItem, setModal }) {
  const clearScreen = () => {
    setMenu(false);
    setModal(false);
    setSearchItem("");
  };
  return (
    <>
      <header className={styles.header}>
        <nav>
          <div className={menu ? styles.open : undefined}>
            <Link onClick={() => clearScreen()} to="/">
              Home
            </Link>
            <Link onClick={() => clearScreen()} to="/movies">
              Movies
            </Link>
            <Link onClick={() => clearScreen()} to="/tv-shows">
              TV Shows
            </Link>
            <Link onClick={() => clearScreen()} to="/cart">
              <img src="/cart.png" alt="cart icon" />
              <span>{cartLength}</span>
            </Link>
          </div>
          {!menu && (
            <button
              onClick={() => {
                setMenu(true);
                setModal(false);
              }}
            >
              <img src="/menu.png" alt="open menu" />
            </button>
          )}
          {menu && (
            <button onClick={() => setMenu(false)}>
              <img src="/close.png" alt="close menu" />
            </button>
          )}
        </nav>
      </header>
    </>
  );
}

Header.propTypes = {
  cartLength: PropTypes.number.isRequired,
  menu: PropTypes.bool.isRequired,
  setMenu: PropTypes.func.isRequired,
  setSearchItem: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default Header;
