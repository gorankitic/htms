
// hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
// services
import { editCabin as editCabinApi } from "../../services/apiCabins";
// react-hot-toast
import toast from "react-hot-toast";

export const useEditCabin = () => {
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabin, cabinId }) => editCabinApi(newCabin, cabinId),
        onSuccess: () => {
            toast.success("Апартман је ажуриран!");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (error) => toast.error(error.message)
    });

    return { editCabin, isEditing };
}