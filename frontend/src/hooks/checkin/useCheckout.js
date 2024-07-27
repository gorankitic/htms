// hooks
import { useNavigate } from "react-router-dom";
// react-query
import { useMutation, useQueryClient } from "@tanstack/react-query"
// services
import { updateBooking } from "../../services/apiBookings";
// libs
import { toast } from "react-hot-toast";

export const useCheckout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
        mutationFn: ({ bookingId }) => updateBooking(bookingId, { status: "одјављен" }),
        onSuccess: (data) => {
            toast.success(`Гост ${data.guestId.name} је успјешно одјављен.`);
            queryClient.invalidateQueries({ active: true });
            navigate("/bookings");
        },
        onError: () => toast.error("Дошло је до грешке приликом одјаве госта.")
    });

    return { checkout, isCheckingOut };
}