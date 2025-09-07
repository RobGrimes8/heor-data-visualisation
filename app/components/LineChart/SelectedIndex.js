"use client";

import styles from "./styles.module.scss";

export default function SelectedIndex({
    selectedIndex,
    chartData,
    setChartData,
}) {
    const handleHoursWorkedChange = (e) => {
        const newData = [...chartData];
        newData[selectedIndex].hours_worked = Number(e.target.value);
        setChartData(newData);
    };

    const handleBreakMinutesChange = (e) => {
        const newData = [...chartData];
        newData[selectedIndex].break_minutes = Number(e.target.value);
        setChartData(newData);
    };

    const handleFocusLevelChange = (e) => {
        const newData = [...chartData];
        newData[selectedIndex].focus_level = Number(e.target.value);
        setChartData(newData);
    };

    const calculateProductivityScore = (dataPoint) => {
        const { hours_worked, break_minutes, focus_level } = dataPoint;
        if (hours_worked === 0) return 0;

        return Math.max(
            hours_worked * 10 + focus_level * 5 - break_minutes * 0.5,
            0
        );
    };

    return (
        <div className={styles.selected_datapoint}>
            <div className={styles.info}>
                <h3>Selected Data Point</h3>
                <p>Date: {chartData[selectedIndex].date}</p>
                <p>Productivity Score:</p>
                <span className={styles.productivity_score}>
                    {calculateProductivityScore(chartData[selectedIndex])}
                </span>
            </div>
            <div className={styles.controls}>
                <div className={styles.range_container}>
                    <label htmlFor="hours_worked">Hours Worked</label>
                    <input
                        type="range"
                        id="hours_worked"
                        min="0"
                        max="12"
                        step={0.5}
                        value={chartData[selectedIndex].hours_worked}
                        onChange={handleHoursWorkedChange}
                    />
                    <span>{chartData[selectedIndex].hours_worked} hours</span>
                </div>
                <div className={styles.range_container}>
                    <label htmlFor="break_minutes">Break Minutes</label>
                    <input
                        type="range"
                        id="break_minutes"
                        min="0"
                        max="120"
                        step={15}
                        value={chartData[selectedIndex].break_minutes}
                        onChange={handleBreakMinutesChange}
                    />
                    <span>
                        {chartData[selectedIndex].break_minutes} minutes
                    </span>
                </div>
                <div className={styles.range_container}>
                    <label htmlFor="focus_level">Focus Level</label>
                    <input
                        type="range"
                        id="focus_level"
                        min="1"
                        max="10"
                        step={1}
                        value={chartData[selectedIndex].focus_level}
                        onChange={handleFocusLevelChange}
                    />
                    <span>{chartData[selectedIndex].focus_level}</span>
                </div>
            </div>
        </div>
    );
}
