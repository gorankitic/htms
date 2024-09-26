
// hooks
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../hooks/checkin/useCheckout";

const TodayItem = ({ activity }) => {
    const navigate = useNavigate();
    const { checkout, isCheckingOut } = useCheckout();
    const { _id, status, guestId, numNights } = activity;

    return (
        <li className="flex gap-6 items-center border-b py-2 w-full">
            {status === "непотврђен" && <span className="tag bg-teal-600 text-teal-50">Долази</span>}
            {status === "пријављен" && <span className="tag bg-accent-400 text-accent-50">Одлази</span>}

            <p className="w-[150px] font-medium">{guestId.name}</p>
            <p>{numNights}. ноћења</p>

            {status === "непотврђен" && (
                <button
                    className="bg-teal-600 text-white py-1 px-2 w-20 rounded-sm hover:bg-teal-400 ml-auto"
                    onClick={() => navigate(`/checkin/${_id}`)}
                >
                    Пријави
                </button>
            )}
            {status === "пријављен" && (
                <button
                    className="bg-accent-400 text-white py-1 px-2 w-20 rounded-sm hover:bg-accent-300 ml-auto"
                    onClick={() => checkout({ bookingId: _id })}
                    disabled={isCheckingOut}
                >
                    Одјави
                </button>
            )}
        </li>
    )
}

export default TodayItem;