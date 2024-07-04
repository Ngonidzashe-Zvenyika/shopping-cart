import styles from "../styles/Grid.module.css";
import PropTypes from "prop-types";

function Grid({ data, setMenu, setModal }) {
  return (
    <>
      <div className={styles.grid}>
        {data.map((item) => {
          let title = item.title || item.original_name;
          if (title.length > 25) title = title.slice(0, 25) + "...";
          return (
            <div
              onClick={() => {
                setMenu(false);
                setModal(item);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setMenu(false);
                  setModal(item);
                }
              }}
              tabIndex="0"
              className={styles.card}
              key={item.id}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                alt="movie poster"
              />
              <p>{title}</p>
              <p>${Math.floor(item.vote_average)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

Grid.propTypes = {
  data: PropTypes.array.isRequired,
  setMenu: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default Grid;
