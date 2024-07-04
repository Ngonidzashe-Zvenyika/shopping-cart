import styles from "../styles/TvShows.module.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import getData from "../getData";
import ErrorFetching from "./ErrorFetching";
import Loader from "./Loader";
import Grid from "./Grid";
import Buttons from "./Buttons";

function TvShows({ setModal, setMenu }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUrl, setSelectedUrl] = useState(
    `https://api.themoviedb.org/3/trending/tv/day?language=en-US`
  );

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
    getData(
      setData,
      setError,
      setLoading,
      `${selectedUrl}&page=${currentPage}`
    );
  }, [selectedUrl, currentPage]);

  return (
    <section className={styles.section}>
      {loading && <Loader />}
      {!loading && error && <ErrorFetching message={error.message} />}
      {!loading && data && (
        <>
          <div className={styles.heading}>
            <h2>TV Shows</h2>
            <select
              value={selectedUrl}
              onChange={(e) => {
                setCurrentPage(1);
                setSelectedUrl(e.target.value);
              }}
              name="url"
              id="url"
            >
              <option
                value={`https://api.themoviedb.org/3/trending/tv/day?language=en-US`}
              >
                Trending
              </option>
              <option
                value={`https://api.themoviedb.org/3/tv/top_rated?language=en-US`}
              >
                Top Rated
              </option>
            </select>
          </div>
          <Grid data={data} setMenu={setMenu} setModal={setModal} />
          <Buttons
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setMenu={setMenu}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </>
      )}
    </section>
  );
}

TvShows.propTypes = {
  setModal: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
};

export default TvShows;
