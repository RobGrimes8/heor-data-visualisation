"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Bar } from "react-chartjs-2";
import DateModal from "./DateModal";
import "@/lib/chartSetup";

export default function BarChart({ dataset }) {
    const [filteredData, setFilteredData] = useState(dataset.slice(-7));

    // react-chartjs-2 data and options
    const data = {
        labels: filteredData.map((d) => d.date),
        datasets: [
            {
                label: "Hours Worked",
                data: filteredData.map((d) => d.hours_worked),
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "rgba(99, 255, 161, 0.5)",
                backgroundColor: "rgba(99, 255, 161, 0.2)",
            },
            {
                label: "Break Time (hrs)",
                data: filteredData.map((d) => d.break_minutes / 60),
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "rgba(255, 99, 132, 0.5)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
            {
                label: "Focus Level",
                data: filteredData.map((d) => d.focus_level),
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "rgba(172, 99, 255, 0.5)",
                backgroundColor: "rgba(172, 99, 255, 0.2)",
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    boxWidth: 30,
                    font: { size: 12 },
                },
            },
            title: {
                display: true,
                text: "Range View (Hours, Breaks, Focus)",
                font: { size: 16, weight: "bold" },
                padding: { top: 10, bottom: 20 },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: { color: "rgba(0,0,0,0.05)" },
            },
            y: {
                ticks: {
                    font: { size: 12 },
                    grid: { color: "rgba(0,0,0,0.02)" },
                    callback: function (value, index) {
                        const label = this.getLabelForValue(value);
                        return new Date(label).toLocaleDateString("en-GB", {
                            month: "short",
                            day: "numeric",
                        });
                    },
                },
            },
        },
    };

    // Filter dataset with new start/end dates
    const handleSelect = (startDateStr, endDateStr) => {
        const newFiltered = dataset.filter(
            (d) => d.date >= startDateStr && d.date <= endDateStr
        );
        setFilteredData(newFiltered);
    };

    if (dataset.length === 0) return <p>Dataset not passed to component</p>;

    return (
        <div className={styles.chartContainer}>
            <DateModal dataset={dataset} onDateChange={handleSelect} />
            <Bar data={data} options={options} />
        </div>
    );
}
