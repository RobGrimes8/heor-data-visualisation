import styles from "./Navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.nav__brand}>
                <Link href="/">HEOR</Link>
            </div>
            <div className={styles.nav__links}>
                <Link href="/month" className={styles.nav__link}>
                    Month
                </Link>
                <Link href="/range" className={styles.nav__link}>
                    Range
                </Link>
            </div>
        </nav>
    );
}
