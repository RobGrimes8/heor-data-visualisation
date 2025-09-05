import fs from "fs";
import path from "path";

export function getDataset() {
    const filePath = path.join(
        process.cwd(),
        "public",
        "productivity_metrics.csv"
    );
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Split rows
    const rows = fileContent.trim().split("\n").slice(1);

    // Map rows into typed objects
    const dataset = rows.map((row) => {
        const [
            date,
            hours_worked,
            break_minutes,
            focus_level,
            productivity_score,
        ] = row.split(",");

        return {
            date,
            hours_worked: Number(hours_worked),
            break_minutes: Number(break_minutes),
            focus_level: Number(focus_level),
            productivity_score: Number(productivity_score),
        };
    });

    // Sort by date ascending before returning
    const sorted = [...dataset].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sorted;
}
