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

    // Set default range as most recent 7 days
    const [range, setRange] = useState([
        {
            startDate: new Date(dataset[dataset.length - 7].date),
            endDate: new Date(dataset[dataset.length - 1].date),
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

    const pad = (str) => {
        return String(str).padStart(2, "0");
    };

    const convertDateToString = (date) => {
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
            date.getDate()
        )}`;
    };

    const handleSelect = (ranges) => {
        const { startDate } = ranges.selection;
        const endDate = addDays(startDate, 6);

        setRange([
            {
                startDate,
                endDate: endDate,
                key: "selection",
            },
        ]);

        const startDateStr = convertDateToString(startDate);
        const endDateStr = convertDateToString(endDate);

        onDateChange(startDateStr, endDateStr);
        setIsOpen(false);
    };

    return (
        <div className={styles.dateModalContainer}>
            <button
                id="change-date-btn"
                className={styles.open_btn}
                onClick={() => setIsOpen(true)}
            >
                Change Start Date
            </button>

            {isOpen && (
                <div className={styles.modal}>
                    <div
                        id="modal-content"
                        ref={modalRef}
                        className={styles.modal_content}
                    >
                        <h2>Select Date Range</h2>
                        <p>
                            Simply select the start date to see information
                            displayed for a 7 day period.
                        </p>
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
