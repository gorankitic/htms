// hooks
import { useNavigate } from "react-router-dom";
import { useBooking } from "../hooks/bookings/useBooking";
import { useCheckout } from "../hooks/checkin/useCheckout";
import { useMoveBack } from "../hooks/useMoveBack";
// components
import Spinner from "../components/Spinner";
import StatusTag from "../components/StatusTag";
import BookingDataBox from "../components/bookings/BookingDataBox";

const Booking = () => {
    const { data, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    const { _id: bookingId, status, guestId: { name } } = data?.booking;

    return (
        <div className="max-w-screen-xl flex flex-col mx-auto mt-6 px-6">
            <header className="my-8">
                <div className="flex items-center gap-4">
                    <h1 className="font-medium">Резервација за госта: <span className="text-3xl ml-2">{name}</span></h1>
                    <StatusTag status={status} />
                </div>
            </header >
            <BookingDataBox booking={data.booking} />
            <section className="flex items-center justify-end gap-4 my-6">
                <button
                    onClick={moveBack}
                    className="border-btn"
                >
                    &larr; Назад
                </button>
                {status === "непотврђен" && (
                    <button
                        className="btn-primary"
                        onClick={() => navigate(`/checkin/${bookingId}`)}
                    >
                        Пријава
                    </button>
                )}
                {status === "пријављен" && (
                    <button
                        className="btn-primary"
                        onClick={() => checkout({ bookingId })}
                        disabled={isCheckingOut}
                    >
                        Одјави
                    </button>
                )}
            </section>
        </div >
    )
}

export default Booking;