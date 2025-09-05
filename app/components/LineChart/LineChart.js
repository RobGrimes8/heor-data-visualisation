"use client";

import styles from "./styles.module.scss";
import { Line } from "react-chartjs-2";
import "@/lib/chartSetup";

export default function LineChartFromJSON({ dataset }) {
    if (dataset.length === 0) return <p>Dataset not passed to component</p>;

    const labels = dataset.map((d) => d.date);
    const dataValues = dataset.map((d) => d.productivity_score);
    const hoursWorkedValues = dataset.map((d) => d.hours_worked);
    const breakMinutesValues = dataset.map((d) => d.break_minutes);
    const focuLevelValues = dataset.map((d) => d.focus_level);

    const data = {
        labels,
        datasets: [
            {
                label: "Productivity Score",
                data: dataValues,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.2,
                fill: true,
            },
            {
                label: "Hours Worked",
                data: hoursWorkedValues,
                borderColor: "rgba(99, 255, 161, 1)",
                backgroundColor: "rgba(99, 255, 161, 0.2)",
                tension: 0.2,
                fill: true,
            },
            {
                label: "Break Minutes",
                data: breakMinutesValues,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.2,
                fill: true,
            },
            {
                label: "Focus Level",
                data: focuLevelValues,
                borderColor: "rgba(172, 99, 255, 1)",
                backgroundColor: "rgba(172, 99, 255, 0.2)",
                tension: 0.2,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Productivity Overview" },
        },
    };

    return (
        <div className={styles.chartContainer}>
            <Line data={data} options={options} />
        </div>
    );
}
