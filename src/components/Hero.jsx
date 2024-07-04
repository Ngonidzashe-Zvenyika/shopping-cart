import styles from "../styles/Hero.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

function Hero({ searchItem, setSearchItem }) {
  const [inputValue, setInputValue] = useState(searchItem);
  return (
    <div className={styles.hero}>
      {!searchItem && <h1>Welcome to Stream Ticket. Explore now!</h1>}
      <form>
        <label htmlFor="search"></label>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="search"
          type="text"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setSearchItem(inputValue);
          }}
          type="submit"
        >
          <img src="/search.svg" alt="search button" />
        </button>
      </form>
    </div>
  );
}

Hero.propTypes = {
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
};

export default Hero;
