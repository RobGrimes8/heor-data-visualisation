import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>Welcome to the Productivity Dashboard</h1>
                    <p>
                        This Progressive Web App helps you explore daily
                        productivity metrics over time. View trends across a
                        full month or drill down into custom date ranges to see
                        details like hours worked, break times, and focus
                        levels.
                    </p>
                    <p className={styles.tip}>
                        Tip: You can install this app on your home screen for
                        quick access, even offline.
                    </p>
                </div>
                <div className={styles.quicklinks}>
                    <Link href="/month" className={styles.link}>
                        <h2>Month View</h2>
                        <p>
                            See a line chart showing productivity scores across
                            the full month.
                        </p>
                    </Link>
                    <Link href="/month" className={styles.link}>
                        <h2>Range View</h2>
                        <p>
                            Select a custom date range and compare detailed
                            metrics.
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
