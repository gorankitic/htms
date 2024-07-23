// libs
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "../../utils";
import { twMerge } from "tailwind-merge";
// components
import Table from "../Table";

const BookingRow = ({ booking }) => {
    const { _id, startDate, endDate, numNights, totalPrice, status, guestId: { name: guestName, email }, cabinId: { name: cabinName } } = booking;

    return (
        <Table.Row>
            <div>{cabinName}</div>
            <div className="flex flex-col">
                <span className="font-medium">{guestName}</span>
                <span className="text-sm text-gray-400">{email}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-medium text-sm">
                    {isToday(new Date(startDate)) ? "Данас" : formatDistanceFromNow(startDate)}{" "} &rarr; {numNights} ноћења
                </span>
                <span className="text-sm text-gray-400">
                    {format(new Date(startDate), "dd.MM.yyyy")} &mdash;{" "}{format(new Date(endDate), "dd.MM.yyyy")}
                </span>
            </div>
            <div className={twMerge("tag", status === "непотврђен" ? "bg-blue-200 text-blue-600" : status === "пријављен" ? "bg-teal-200 text-teal-600" : "bg-slate-200 text-slate-600")}>
                {status}
            </div>
            <div>{totalPrice} КМ</div>
        </Table.Row>
    )
}

export default BookingRow;