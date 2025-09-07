"use client";

import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import styles from "./styles.module.scss";

export default function DateModal({ dataset, onDateChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const [range, setRange] = useState([
        {
            startDate: new Date(dataset[0].date),
            endDate: addDays(new Date(dataset[0].date), 6),
            key: "selection",
        },
    ]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;

        // 🔹 enforce 7-day window
        const days = differenceInDays(endDate, startDate);
        if (days !== 6) {
            setRange([
                {
                    startDate,
                    endDate: addDays(startDate, 6),
                    key: "selection",
                },
            ]);
        } else {
            setRange([ranges.selection]);
        }

        const startDateStr = startDate.toISOString().split("T")[0];
        const endDateStr = addDays(startDateStr, 6).toISOString().split("T")[0];

        onDateChange(startDateStr, endDateStr);
        setIsOpen(false);
    };

    return (
        <div className={styles.dateModalContainer}>
            <button className={styles.open_btn} onClick={() => setIsOpen(true)}>
                Change Date Range
            </button>

            {isOpen && (
                <div className={styles.modal}>
                    <div ref={modalRef} className={styles.modal_content}>
                        <h2>Select Date Range</h2>
                        <DateRange
                            className={styles.date_input}
                            ranges={range}
                            onChange={handleSelect}
                            moveRangeOnFirstSelection={true}
                            showDateDisplay={false}
                            rangeColors={["#3182ce"]}
                            minDate={new Date(dataset[0].date)}
                            maxDate={new Date(dataset[dataset.length - 1].date)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
