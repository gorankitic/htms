// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';
// services
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
// react-hot-toast
import toast from 'react-hot-toast';

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success("Резервација обрисан!");
            queryClient.invalidateQueries({
                queryKey: ["bookings"]
            });
        },
        onError: (err) => { toast.error(err.message) }
    });

    return { isDeleting, deleteBooking };
}
