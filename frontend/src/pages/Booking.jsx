// hooks
import { useBooking } from "../hooks/bookings/useBooking";
import { useMoveBack } from "../hooks/useMoveBack";
// components
import Spinner from "../components/Spinner";
import StatusTag from "../components/StatusTag";
import BookingDataBox from "../components/bookings/BookingDataBox";

const Booking = () => {
    const { data, isLoading } = useBooking();
    const moveBack = useMoveBack();

    if (isLoading) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    const { status, guestId: { name } } = data?.booking;





    return (
        <div className="max-w-screen-xl flex flex-col mx-auto mt-6 px-6">
            <header className="my-8 flex">
                <div className="flex items-center gap-4">
                    <h1 className="font-medium">Резервација за госта: <span className="text-3xl ml-2">{name}</span></h1>
                    <StatusTag status={status} />
                </div>
                <button
                    onClick={moveBack}
                    className="bg-none border border-teal-600 text-teal-600 rounded-sm py-1 px-2 ml-auto transition-all hover:text-teal-500"
                >
                    &larr; Назад
                </button>
            </header >
            <BookingDataBox booking={data.booking} />
        </div >
    )
}

export default Booking;