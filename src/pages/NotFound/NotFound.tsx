import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const NotFound = () => {
    return (
        <section className={styles.wrapper}>
            <p className={styles.title}>404</p>
            <p className={styles.subtitle}>Page Not Found.</p>
            <p>Sorry, we can't find the page you're looking for.</p>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
        </section>
    );
};

export default NotFound;
