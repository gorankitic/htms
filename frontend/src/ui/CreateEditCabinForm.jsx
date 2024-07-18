// hooks
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// services
import { createCabin as createCabinApi, editCabin as editCabinApi } from "../services/apiCabins";
// react-hot-toast
import toast from "react-hot-toast";

const CreateEditCabinForm = ({ cabinToEdit = {} }) => {
    const { _id: editId, ...editValues } = cabinToEdit;
    const isEdit = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: isEdit ? editValues : {}
    });

    const queryClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: newCabin => createCabinApi(newCabin),
        onSuccess: () => {
            toast.success("Нови апартман је направљен!");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (error) => toast.error(error.message)
    });

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabin, cabinId }) => editCabinApi(newCabin, cabinId),
        onSuccess: () => {
            toast.success("Апартман је ажуриран!");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset(getValues());
        },
        onError: (error) => toast.error(error.message)
    });

    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {
        if (isEdit) {
            editCabin({ newCabin: data, cabinId: editId });
        } else {
            createCabin(data);
        }
    }

    return (
        <div className="mx-auto w-[600px] my-6">
            <h1 className="font-medium text-xl text-center">{isEdit ? "Измјени апартман:" : "Направи нови апартман:"}</h1>
            <form className="my-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                <input
                    {...register("name", { required: "Ово поље је обавезно." })}
                    type="text"
                    id="name"
                    placeholder="Назив апартмана"
                    autoComplete="off"
                    disabled={isWorking}
                />
                {errors?.name?.message && <p className="-mt-1 text-red-600 pr-1">{errors.name.message}</p>}

                <input
                    {...register("maxCapacity", {
                        required: "Ово поље је обавезно.",
                        min: { value: 1, message: "Минималан капацитет мора бити једна особа." }
                    })}
                    type="number"
                    id="maxCapacity"
                    placeholder="Капацитет"
                    disabled={isWorking}
                />
                {errors?.maxCapacity?.message && <p className="-mt-1 text-red-600 pr-1">{errors.maxCapacity.message}</p>}

                <input
                    {...register("regularPrice", {
                        required: "Ово поље је обавезно.",
                        min: { value: 0, message: "Цијена не може бити мања од нуле." }
                    })}
                    type="number"
                    id="regularPrice"
                    placeholder="Цијена"
                    disabled={isWorking}
                />
                {errors?.regularPrice?.message && <p className="-mt-1 text-red-600 pr-1">{errors.regularPrice.message}</p>}

                <input
                    {...register("discount", {
                        validate: (value) => Number(value) <= Number(getValues().regularPrice) || "Попуст мора бити мањи од регуларне цијене."
                    })}
                    type="number"
                    id="discount"
                    placeholder="Попуст"
                    disabled={isWorking}
                />
                {errors?.discount?.message && <p className="-mt-1 text-red-600 pr-1">{errors.discount.message}</p>}

                <textarea
                    {...register("description", { required: "Ово поље је обавезно." })}
                    type="text"
                    id="description"
                    className="h-20 px-2 py-2 my-3 border"
                    placeholder="Опис апартмана..."
                    disabled={isWorking}
                />
                {errors?.description?.message && <p className="-mt-1 text-red-600 pr-1">{errors.description.message}</p>}

                <div className="flex items-center gap-4">
                    <label htmlFor="imageUrl">Слика:</label>
                    <input type="file" accept="image/*" id="imageUrl" className="w-full" disabled={isWorking} />
                </div>

                <div className="ml-auto my-4">
                    <button className="btn-secondary" type="reset">Одбаци</button>
                    <button className="btn-primary ml-4" disabled={isWorking}>{isEdit ? "Ажурирај" : "Сачувај"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateEditCabinForm;