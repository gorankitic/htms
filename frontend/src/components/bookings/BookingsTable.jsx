
// hooks
import { useBookings } from "../../hooks/cabins/useBookings";
// components
import Spinner from "../Spinner";
import Table from "../Table";
import BookingRow from "./BookingRow";

const BookingsTable = () => {
    const { data, isLoading } = useBookings();

    if (isLoading) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    return (
        <Table columns="grid-cols-bookings">
            <Table.Header>
                <div>Апартман</div>
                <div>Гост</div>
                <div>Вријеме боравка</div>
                <div>Статус</div>
                <div>Износ</div>
                <div></div>
            </Table.Header>
            <Table.Body
                data={data.bookings}
                render={(booking) => <BookingRow key={booking._id} booking={booking} />}
            />
        </Table>
    )
}

export default BookingsTable;