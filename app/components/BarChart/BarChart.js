"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Bar } from "react-chartjs-2";
import "@/lib/chartSetup";

export default function BarChart({ dataset }) {
    if (dataset.length === 0) return <p>Dataset not passed to component</p>;

    const [startDate, setStartDate] = useState(dataset[0].date);
    const [endDate, setEndDate] = useState(dataset[dataset.length - 1].date);
    const [filteredData, setFilteredData] = useState(dataset);

    const labels = filteredData.map((d) => d.date);
    const hoursWorkedValues = filteredData.map((d) => d.hours_worked);
    const breakValues = filteredData.map((d) => d.break_minutes / 60);
    const focuLevelValues = filteredData.map((d) => d.focus_level);

    const data = {
        labels,
        datasets: [
            {
                label: "Hours Worked",
                data: hoursWorkedValues,
                borderWidth: 1,
                borderColor: "rgba(99, 255, 161, 0.5)",
                backgroundColor: "rgba(99, 255, 161, 0.2)",
            },
            {
                label: "Break Time (hrs)",
                data: breakValues,
                borderWidth: 1,
                borderColor: "rgba(255, 99, 132, 0.5)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
            {
                label: "Focus Level",
                data: focuLevelValues,
                borderWidth: 1,
                borderColor: "rgba(172, 99, 255, 0.5)",
                backgroundColor: "rgba(172, 99, 255, 0.2)",
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
        const newData = [...filteredData];
        const newFiltered = newData.filter(
            (d) => d.date >= e.target.value && d.date <= endDate
        );
        setFilteredData(newFiltered);
    };
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        const newData = [...filteredData];
        const newFiltered = newData.filter(
            (d) => d.date >= startDate && d.date <= e.target.value
        );
        setFilteredData(newFiltered);
    };

    return (
        <div className={styles.chartContainer}>
            <div className={styles.date_inputs}>
                <div className={styles.date_input_container}>
                    <label htmlFor="start_date">Start date:</label>
                    <input
                        type="date"
                        name="start_date"
                        id="start_date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        min={filteredData[0].date}
                        max={endDate}
                    />
                </div>
                <div className={styles.date_input_container}>
                    <label htmlFor="end_date">End date:</label>
                    <input
                        type="date"
                        name="end_date"
                        id="end_date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        min={startDate}
                        max={filteredData[filteredData.length - 1].date}
                    />
                </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
}
