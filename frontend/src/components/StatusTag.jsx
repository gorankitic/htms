// libs
import { twMerge } from "tailwind-merge";

const StatusTag = ({ status }) => {
    return (
        <div className={twMerge("tag", status === "непотврђен" ? "bg-blue-500 text-blue-50" : status === "пријављен" ? "bg-teal-500 text-teal-50" : "bg-slate-200 text-slate-600")}>
            {status}
        </div>
    )
}

export default StatusTag;