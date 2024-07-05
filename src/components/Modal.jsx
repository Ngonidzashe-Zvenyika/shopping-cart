import styles from "../styles/Modal.module.css";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

function Modal({ modal, setModal, cart, setCart }) {
  const [views, setViews] = useState(1);
  const dialog = useRef(null);

  useEffect(() => {
    dialog.current.focus();
  }, []);

  return (
    <>
      <div className={styles.overlay}></div>
      <div ref={dialog} className={styles.modal} tabIndex={"0"}>
        <button className={styles.close} onClick={() => setModal(false)}>
          Close
        </button>
        <div className={styles.backdrop}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${modal.backdrop_path}`}
            alt="poster"
          />
        </div>
        <div className={styles.content}>
          <h2>{modal.title || modal.original_name}</h2>
          <p>{modal.overview}</p>
          <p>${Math.floor(modal.vote_average)}</p>
          <div>
            <button
              onClick={() => {
                if (views > 1) {
                  setViews(Number(views) - 1);
                }
              }}
            >
              -
            </button>
            <label htmlFor={modal.id}>Add more views:</label>
            <input
              onInput={(e) => {
                if (e.nativeEvent.data === "-" || e.nativeEvent.data === "e") {
                  e.target.value = e.target.value.slice(
                    0,
                    e.target.value.length - 1
                  );
                  return;
                } else if (e.target.value === "") {
                  setViews("");
                } else if (e.target.value < 1) {
                  return;
                } else {
                  setViews(e.target.value);
                }
              }}
              id={modal.id}
              type="number"
              value={views}
            />
            <button onClick={() => setViews(Number(views) + 1)}>+</button>
            <button
              className={styles.submit}
              onBlur={() => dialog.current.focus()}
              onClick={() => {
                let object = {
                  name: modal.title || modal.original_name,
                  views,
                  costPerView: Math.floor(modal.vote_average),
                  totalCost: Math.floor(modal.vote_average) * views,
                  url: modal.backdrop_path,
                };

                const inCart = cart.findIndex(
                  (item) => item.name === object.name
                );

                if (inCart !== -1) {
                  object = {
                    ...object,
                    views: Number(object.views) + Number(cart[inCart].views),
                    totalCost:
                      (Number(object.views) + Number(cart[inCart].views)) *
                      Math.floor(modal.vote_average),
                  };
                  setCart(
                    cart.map((item) => {
                      if (item.name === object.name) {
                        return object;
                      } else return item;
                    })
                  );
                } else {
                  setCart([...cart, object]);
                }
                setModal(false);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  modal: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Modal;
