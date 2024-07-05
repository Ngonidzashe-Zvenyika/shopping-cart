import styles from "../styles/Cart.module.css";
import PropTypes from "prop-types";

function Cart({ cart, setCart }) {
  const decrementViews = (item) => {
    if (item.views > 1) {
      setCart(
        cart.map((purchase) => {
          if (purchase === item) {
            return {
              ...purchase,
              views: Number(item.views) - 1,
              totalCost: item.costPerView * (Number(item.views) - 1),
            };
          } else return purchase;
        })
      );
    }
  };

  const incrementViews = (item) => {
    setCart(
      cart.map((purchase) => {
        if (purchase === item) {
          return {
            ...purchase,
            views: Number(item.views) + 1,
            totalCost: item.costPerView * (Number(item.views) + 1),
          };
        } else return purchase;
      })
    );
  };

  const updateCart = (e, item) => {
    if (isNaN(e.nativeEvent.data)) {
      e.target.value = e.target.value.slice(0, e.target.value.length - 1);
      return;
    } else if (e.target.value === "") {
      setCart(
        cart.map((purchase) => {
          if (purchase === item) {
            return {
              ...purchase,
              views: "",
              totalCost: item.costPerView * 0,
            };
          } else return purchase;
        })
      );
    } else if (e.target.value > 0) {
      setCart(
        cart.map((purchase) => {
          if (purchase === item) {
            return {
              ...purchase,
              views: Number(e.target.value),
              totalCost: item.costPerView * Number(e.target.value),
            };
          } else return purchase;
        })
      );
    }
  };

  const checkValue = (e, item) => {
    if (e.target.value === "") {
      e.target.value = "1";
      setCart(
        cart.map((purchase) => {
          if (purchase === item) {
            return {
              ...purchase,
              views: Number(e.target.value),
              totalCost: item.costPerView * Number(e.target.value),
            };
          } else return purchase;
        })
      );
    }
  };

  const removeItem = (item) => {
    setCart(cart.filter((purchase) => purchase !== item));
  };

  const getTotal = () => {
    const total = cart.reduce((total, item) => {
      return total + item.totalCost;
    }, 0);
    return total;
  };

  return (
    <div className={styles.container}>
      <h2>Cart</h2>
      <div className={styles.cart}>
        {cart.map((item) => {
          return (
            <div key={item.name}>
              <div className={styles.background}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.url}`}
                  alt="poster"
                />
              </div>
              <h2>{item.name}</h2>
              <p>Cost: ${item.costPerView}</p>
              <div className={styles.toggles}>
                <button onClick={() => decrementViews(item)}>-</button>
                <label htmlFor={item.name}>Add more views:</label>
                <input
                  onBlur={(e) => checkValue(e, item)}
                  onInput={(e) => updateCart(e, item)}
                  id={item.name}
                  type="number"
                  value={item.views}
                  min="0"
                />
                <button onClick={() => incrementViews(item)}>+</button>
              </div>
              <p>Total Cost: ${item.totalCost}</p>
              <button
                className={styles.remove}
                onClick={() => removeItem(item)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className={styles.sale}>
        <h2>Subtotal: ${getTotal()}</h2>
        <button className={styles.purchase}>Purchase</button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default Cart;
