import styles from "./styles.module.scss";
import { getDataset } from "@/lib/getDataset";
import BarChart from "../components/BarChart/BarChart";

export default async function RangePage() {
    const dataset = getDataset(); // same helper, different usage

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <div className={styles.intro}>
                    <h1>Custom Range Explorer</h1>
                    <p>Select a date range to explore time is used each day.</p>
                </div>
                <BarChart dataset={dataset} />
            </main>
        </div>
    );
}
