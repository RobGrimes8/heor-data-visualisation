"use client";

import { useState, useRef } from "react";
import styles from "./styles.module.scss";
import { Line } from "react-chartjs-2";
import "@/lib/chartSetup";
import SelectedIndex from "./SelectedIndex";

export default function LineChartFromJSON({ dataset }) {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(dataset);
    const [selectedIndex, setSelectedIndex] = useState(null);

    if (dataset.length === 0) return <p>Dataset not passed to component</p>;

    const labels = chartData.map((d) => d.date);
    const productivityScore = chartData.map((d) => {
        return Math.max(
            d.hours_worked * 10 + d.focus_level * 5 - d.break_minutes * 0.5,
            0
        );
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Productivity Score",
                data: productivityScore,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.2,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Monthly Productivity Overview" },
        },
        onClick: (event, elements, chart) => {
            if (elements.length > 0) {
                const firstPoint = elements[0];
                const index = firstPoint.index;
                setSelectedIndex(index);
            }
        },
    };

    return (
        <>
            <div className={styles.chartContainer}>
                <Line ref={chartRef} data={data} options={options} />
            </div>
            {selectedIndex != null && (
                <SelectedIndex
                    selectedIndex={selectedIndex}
                    chartData={chartData}
                    setChartData={setChartData}
                />
            )}
        </>
    );
}
