"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Bar } from "react-chartjs-2";
import "@/lib/chartSetup";

export default function BarChart({ dataset }) {
    if (dataset.length === 0) return <p>Dataset not passed to component</p>;

    const sorted = [...dataset].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const [startDate, setStartDate] = useState(sorted[0].date);
    const [endDate, setEndDate] = useState(sorted[sorted.length - 1].date);

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

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className={styles.chartContainer}>
            <div>
                <div className="date-input-container">
                    <label htmlFor="start_date">Start date:</label>
                    <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        min={startDate}
                        max={endDate}
                    />
                </div>
                <div className="date-input-container">
                    <label htmlFor="end_date">End date:</label>
                    <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        min={startDate}
                        max={endDate}
                    />
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
}
