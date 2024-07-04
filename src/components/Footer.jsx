import styles from "../styles/Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Developed by{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Ngonidzashe-Zvenyika"
        >
          Ngonidzashe Zvenyika
        </a>{" "}
        | This product uses the{" "}
        <a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">
          TMDB
        </a>{" "}
        API but is not endorsed or certified by{" "}
        <a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">
          TMDB
        </a>
        .
        <img src="/tmdb.svg" alt="tmdb logo" />
      </p>
    </footer>
  );
}

export default Footer;
