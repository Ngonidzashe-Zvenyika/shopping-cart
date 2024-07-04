import styles from "../styles/Home.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import getData from "../getData";
import ErrorFetching from "./ErrorFetching";
import Loader from "./Loader";
import Hero from "./Hero";
import Grid from "./Grid";
import Buttons from "./Buttons";

function Home({ searchItem, setSearchItem, setModal, setMenu }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [backdropUrl, setBackdropUrl] = useState(null);

  const getRandomBackdrop = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const path = data[randomIndex].backdrop_path;
    const backdropUrl = `https://image.tmdb.org/t/p/w1280/${path}`;
    setBackdropUrl(backdropUrl);
  };

  const getFirstBackdrop = (data) => {
    const path = data[0].backdrop_path;
    const backdropUrl = `https://image.tmdb.org/t/p/w1280/${path}`;
    setBackdropUrl(backdropUrl);
  };

  const nextPage = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
      setMenu(false);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setMenu(false);
    }
  };

  useEffect(() => {
    const url = searchItem
      ? `https://api.themoviedb.org/3/search/multi?query=${searchItem}&include_adult=false&language=en-US&page=1`
      : `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${currentPage}`;

    const getBackdrop = searchItem ? getFirstBackdrop : getRandomBackdrop;
    getData(setData, setError, setLoading, url, getBackdrop);
  }, [searchItem, currentPage]);

  return (
    <section
      className={
        searchItem ? `${styles.trending} ${styles.searching}` : styles.trending
      }
    >
      {loading && <Loader />}
      {!loading && error && (
        <>
          <Hero searchItem={searchItem} setSearchItem={setSearchItem} />
          <ErrorFetching message={error.message} />
        </>
      )}
      {!loading && data && (
        <>
          <Hero searchItem={searchItem} setSearchItem={setSearchItem} />
          <div className={styles.backdrop}>
            <img src={backdropUrl} alt="featured poster" />
          </div>
          <h2>{searchItem ? "Search Results" : "Popular"}</h2>
          <Grid data={data} setMenu={setMenu} setModal={setModal} />
          {!searchItem && (
            <Buttons
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setMenu={setMenu}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          )}
        </>
      )}
    </section>
  );
}

Home.propTypes = {
  searchItem: PropTypes.string.isRequired,
  setSearchItem: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
};

export default Home;
