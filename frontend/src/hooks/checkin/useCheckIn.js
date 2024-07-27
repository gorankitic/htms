// hooks
import { useNavigate } from "react-router-dom";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query"
// services
import { updateBooking } from "../../services/apiBookings";
// libs
import { toast } from "react-hot-toast";

export const useCheckin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, { status: "пријављен", isPaid: true, ...breakfast }),
        onSuccess: (data) => {
            toast.success(`Гост ${data.guestId.name} је успјешно пријављен.`);
            queryClient.invalidateQueries({ active: true });
            navigate("/bookings");
        },
        onError: () => toast.error("Дошло је до грешке приликом пријаве госта.")
    });

    return { checkin, isCheckingIn };
}