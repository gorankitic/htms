
// hooks
import { useMutation, useQueryClient } from "@tanstack/react-query";
// services
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
// react-hot-toast
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
    const queryClient = useQueryClient();

    const { mutate: updateSettings, isLoading: isUpdating } = useMutation({
        mutationFn: ({ newSettings, settingsId }) => updateSettingsApi(newSettings, settingsId),
        onSuccess: () => {
            toast.success("Хотелска подешавања су ажурирана!");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => toast.error(error.message)
    });

    return { updateSettings, isUpdating };
}