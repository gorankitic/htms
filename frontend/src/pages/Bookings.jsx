// components
import BookingTableOperations from '../components/bookings/BookingTableOperations';
import BookingsTable from '../components/bookings/BookingsTable';

const Bookings = () => {

    return (
        <div className="max-w-screen-xl flex flex-col mx-auto mt-6 px-6">
            <header className="flex justify-between items-center">
                <h1 className="font-medium uppercase">Све резервације:</h1>
                <BookingTableOperations />
            </header>
            <BookingsTable />
        </div>
    )
}

export default Bookings;