// hooks
import { useBookings } from "../../hooks/bookings/useBookings";
// components
import BookingRow from "./BookingRow";
import Spinner from "../Spinner";
import Table from "../Table";
import Menu from "../Menu";
import Pagination from "../Pagination";

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
        <Menu>
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
                <Table.Footer>
                    <Pagination count={data.totalDocs} numPages={data.totalPages} />
                </Table.Footer>
            </Table>
        </Menu>
    )
}

export default BookingsTable;