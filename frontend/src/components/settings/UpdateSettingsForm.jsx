// hooks
import { useSettings } from "../../hooks/settings/useSettings";
import { useUpdateSettings } from "../../hooks/settings/useUpdateSettings";
// components
import Spinner from "../Spinner";

const UpdateSettingsForm = () => {
    const { isLoading, data: { settings: { _id, bookingLength, breakfastPrice, maxGuestPerBooking } = {} } = {} } = useSettings();
    const { updateSettings, isUpdating } = useUpdateSettings();

    const handleUpdate = (e, field) => {
        const { value } = e.target;
        if (!value) return;
        updateSettings({ newSettings: { [field]: value }, settingsId: _id });
    }

    if (isLoading) {
        return (
            <div className="mt-10 flex items-center justify-center">
                <Spinner color="text-teal-600" />
            </div>
        );
    }

    return (
        <div className="mx-auto w-[600px] my-6">
            <h1 className="font-medium text-xl text-center my-10">Подешавања</h1>
            <form className="my-6 flex flex-col">
                <label>Максимална дужина резервације (број ноћења):</label>
                <input
                    type="number"
                    id="bookingLength"
                    defaultValue={bookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "bookingLength")}
                />
                <label>Максималан број гостију (по резервацији):</label>
                <input
                    type="number"
                    id="maxGuestPerBooking"
                    defaultValue={maxGuestPerBooking}
                    onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
                />
                <label>Цијена доручка:</label>
                <input
                    type="number"
                    id="breakfastPrice"
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleUpdate(e, "breakfastPrice")}
                />
            </form>
        </div>
    )
}

export default UpdateSettingsForm;