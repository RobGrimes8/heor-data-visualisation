import styles from "./styles.module.scss";
import LineChart from "../components/LineChart/LineChart";
import { getDataset } from "@/lib/getDataset";

export default function MonthPage() {
    const dataset = getDataset();

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>Monthly Productivity Overview</h1>
                    <p>
                        This chart shows your productivity score across the past
                        30 days.
                    </p>
                    <p className={styles.tip}>
                        Click a data point to adjust it&apos;s values.
                    </p>
                </div>
                <LineChart dataset={dataset} />
            </main>
        </div>
    );
}
