import styles from "../styles/Buttons.module.css";
import PropTypes from "prop-types";

function Buttons({ currentPage, setCurrentPage, setMenu, prevPage, nextPage }) {
  const pageNumbers = [1, 2, 3, 4, 5];
  return (
    <div className={styles.buttons}>
      {currentPage !== 1 && (
        <button className={styles.inactive} onClick={() => prevPage()}>
          Prev
        </button>
      )}
      {pageNumbers.map((pageNumber) => {
        if (pageNumber === currentPage) {
          return (
            <button className={styles.active} key={pageNumber}>
              {pageNumber}
            </button>
          );
        } else
          return (
            <button
              className={styles.inactive}
              key={pageNumber}
              onClick={() => {
                setCurrentPage(pageNumber);
                setMenu(false);
              }}
            >
              {pageNumber}
            </button>
          );
      })}
      {currentPage !== 5 && (
        <button className={styles.inactive} onClick={() => nextPage()}>
          Next
        </button>
      )}
    </div>
  );
}

Buttons.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default Buttons;
