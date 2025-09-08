import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.nav__brand}>
                <Link href="/">
                    <Image
                        src="/icons/icon_large-dark.svg"
                        width={40}
                        height={40}
                        alt="Productivity PWA Logo"
                    />
                    <span className={styles.title}>Productivity PWA</span>
                </Link>
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
