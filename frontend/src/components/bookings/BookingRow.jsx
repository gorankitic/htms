// hooks
import { useNavigate } from "react-router-dom";
// components
import Table from "../Table";
import Menu from "../Menu";
import StatusTag from "../StatusTag";
// libs
import { format, isToday } from "date-fns";
import { formatDistanceFromNow } from "../../utils/utils";
// assets
import { HiOutlineCalendarDays, HiOutlineShieldCheck } from "react-icons/hi2";

const BookingRow = ({ booking }) => {
    const { _id, startDate, endDate, numNights, totalPrice, status, guestId: { name: guestName, email }, cabinId: { name: cabinName } } = booking;
    const navigate = useNavigate();

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
            <div className="mx-auto">
                <StatusTag status={status} />
            </div>
            <div>{totalPrice} КМ</div>
            <Menu>
                <Menu.Toggle id={_id} />
                <Menu.List id={_id}>
                    <Menu.Button
                        icon={<HiOutlineCalendarDays className="h-5 w-5" />}
                        onClick={() => navigate(`/bookings/${_id}`)}
                    >
                        Детаљи
                    </Menu.Button>
                    {status === "непотврђен" && (
                        <Menu.Button
                            icon={<HiOutlineShieldCheck className="h-5 w-5" />}
                            onClick={() => navigate(`/checkin/${_id}`)}
                        >
                            Пријава
                        </Menu.Button>
                    )}
                </Menu.List>
            </Menu>
        </Table.Row>
    )
}

export default BookingRow;