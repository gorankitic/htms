// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';
// services
import { deleteCabin as deleteCabinApi } from "../services/apiCabins";
// react-hot-toast
import toast from 'react-hot-toast';

export const useDeleteCabin = () => {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinApi(id),
        onSuccess: () => {
            toast.success("Апартман обрисан!");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: (err) => { toast.error(err.message) }
    });

    return { isDeleting, deleteCabin };
}
