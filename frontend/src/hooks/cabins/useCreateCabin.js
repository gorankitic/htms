
// hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
// services
import { createCabin as createCabinApi } from "../../services/apiCabins";
// react-hot-toast
import toast from "react-hot-toast";

export const useCreateCabin = () => {
    const queryClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: newCabin => createCabinApi(newCabin),
        onSuccess: () => {
            toast.success("Нови апартман је направљен!");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (error) => toast.error(error.message)
    });

    return { isCreating, createCabin };
}
