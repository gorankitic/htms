// hooks
import { useEffect, useState } from "react";
import { useBooking } from "../hooks/bookings/useBooking";
import { useSettings } from "../hooks/settings/useSettings";
import { useCheckin } from "../hooks/checkin/useCheckIn";
import { useMoveBack } from "../hooks/useMoveBack";
// components
import Spinner from "../components/Spinner";
import Checkbox from "../components/Checkbox";
import BookingDataBox from "../components/bookings/BookingDataBox";

const Checkin = () => {
    const { data, isLoading } = useBooking();
    const { data: settingsData, isLoading: isLoadingSettings } = useSettings();
    const { checkin, isCheckingIn } = useCheckin();
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const moveBack = useMoveBack();

    useEffect(() => setConfirmPaid(data?.booking.isPaid ?? false), [data?.booking]);

    if (isLoading || isLoadingSettings) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    const { breakfastPrice } = settingsData.settings;
    const { _id: bookingId, totalPrice, numNights, numGuests, hasBreakfast, guestId: { name: guestName } } = data.booking;
    const optionalBreakfastPrice = breakfastPrice * numNights * numGuests;


    const handleCheckin = () => {
        if (!confirmPaid) return;
        if (addBreakfast) {
            checkin({ bookingId, breakfast: { hasBreakfast: true } });
        } else {
            checkin({ bookingId, breakfast: {} });
        }
    }

    return (
        <div className="max-w-screen-xl flex flex-col mx-auto mt-6 px-6">
            <h1 className="text-xl font-medium my-4">Пријави госта: </h1>
            <BookingDataBox booking={data.booking} />

            {!hasBreakfast && (
                <div className="bg-gray-50 border border-gray-100 rounded-md py-3 px-8 my-4">
                    <Checkbox
                        checked={addBreakfast}
                        id="breakfast"
                        onChange={() => {
                            setAddBreakfast(add => !add);
                            setConfirmPaid(false)
                        }}
                    >
                        Да ли желите да додате доручак? <span className="font-semibold ml-1">({optionalBreakfastPrice}KM)</span>
                    </Checkbox>
                </div>
            )}
            <div className="bg-gray-50 border border-gray-100 rounded-md py-3 px-8 mb-4">
                <Checkbox
                    checked={confirmPaid}
                    id="confirmPaid"
                    disabled={confirmPaid || isCheckingIn}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                >
                    Потврђујем да је гост {guestName} платио укупно
                    {!addBreakfast ? <span className="font-semibold ml-1">{totalPrice}KM.</span> : <span className="font-semibold ml-1">{totalPrice + optionalBreakfastPrice}KM.</span>}
                </Checkbox>
            </div>

            <div className="flex gap-4 justify-end my-6">
                <button
                    onClick={moveBack}
                    className="border-btn"
                >
                    &larr; Назад
                </button>
                <button
                    className="btn-primary"
                    onClick={handleCheckin}
                >
                    {`Пријави госта ${guestName}`}
                </button>
            </div>
        </div>
    )
}

export default Checkin;