import styles from "../styles/ErrorPage.module.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <h1>Oh no, this route doesn&#39;t exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
