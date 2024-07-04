import styles from "../styles/ErrorFetching.module.css";
import PropTypes from "prop-types";

function ErrorFetching({ message }) {
  return <div className={styles.errorMessage}>{message}</div>;
}

ErrorFetching.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorFetching;
