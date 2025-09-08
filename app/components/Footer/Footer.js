import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={`${styles.section} ${styles.about}`}>
                    <h3 className={styles.title}>About Us</h3>
                    <hr />
                    <p className={styles.text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Repellendus molestias quisquam nostrum id quis eligendi
                        earum ad laboriosam.
                    </p>
                </div>

                <div className={`${styles.section} ${styles.links}`}>
                    <h3 className={styles.title}>Quick Links</h3>
                    <hr />
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <a href="#" className={styles.link}>
                                Services
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a href="#" className={styles.link}>
                                Team
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a href="#" className={styles.link}>
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.rights}>
                © 2025 Rob Grimes. All rights reserved.
            </div>
        </footer>
    );
}
