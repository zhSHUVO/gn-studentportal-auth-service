import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = format;
const loggerFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });

    return `[${date.toDateString()}, ${hour}] [${label}] [${level}] : [${message}]`;
});

const infoLogger = createLogger({
    level: "info",
    format: combine(
        label({ label: "gns_log" }),
        timestamp(),
        loggerFormat
        // prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                "logs",
                "winston",
                "success",
                "%DATE%-success.log"
            ),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
    defaultMeta: { timestamp: new Date().toISOString() },
});

const errorLogger = createLogger({
    level: "info",
    format: combine(
        label({ label: "gns_log" }),
        timestamp(),
        loggerFormat
        // prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                "logs",
                "winston",
                "error",
                "%DATE%-error.log"
            ),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
    defaultMeta: { timestamp: new Date().toISOString() },
});

export { infoLogger, errorLogger };
