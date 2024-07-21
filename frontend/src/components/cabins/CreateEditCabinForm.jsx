// hooks
import { useForm } from "react-hook-form";
import { useCreateCabin } from "../../hooks/cabins/useCreateCabin";
import { useEditCabin } from "../../hooks/cabins/useEditCabin";

const CreateEditCabinForm = ({ cabinToEdit = {}, onCloseModal }) => {
    const { _id: editId, ...editValues } = cabinToEdit;
    const isEdit = Boolean(editId);

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        defaultValues: isEdit ? editValues : {}
    });

    const isWorking = isCreating || isEditing;

    const onSubmit = (data) => {
        if (isEdit) {
            editCabin({ newCabin: data, cabinId: editId }, {
                onSuccess: () => onCloseModal?.()
            });
        } else {
            createCabin(data, {
                onSuccess: () => {
                    reset(getValues());
                    onCloseModal?.();
                }
            });
        }
    }

    return (
        <div className="mx-auto w-[600px]">
            <h1 className="font-medium text-2xl text-center text-teal-600">{isEdit ? "Измјени апартман:" : "Направи нови апартман:"}</h1>
            <form className="mt-6 flex flex-col" onSubmit={handleSubmit(onSubmit)}>

                <label>Назив:</label>
                <input
                    {...register("name", { required: "Ово поље је обавезно." })}
                    type="text"
                    id="name"
                    placeholder="нпр. апартман Зеленгора"
                    autoComplete="off"
                    disabled={isWorking}
                    className="mb-2"
                />
                {errors?.name?.message && <p className="-mt-1 text-red-600 pr-1">{errors.name.message}</p>}

                <label>Капацитет:</label>
                <input
                    {...register("maxCapacity", {
                        required: "Ово поље је обавезно.",
                        min: { value: 1, message: "Минималан капацитет мора бити једна особа." }
                    })}
                    type="number"
                    id="maxCapacity"
                    placeholder="нпр. 4 особе"
                    disabled={isWorking}
                    className="mb-2"
                />
                {errors?.maxCapacity?.message && <p className="-mt-1 text-red-600 pr-1">{errors.maxCapacity.message}</p>}

                <label>Цијена:</label>
                <input
                    {...register("regularPrice", {
                        required: "Ово поље је обавезно.",
                        min: { value: 0, message: "Цијена не може бити мања од нуле." }
                    })}
                    type="number"
                    id="regularPrice"
                    placeholder="Цијена у КМ"
                    disabled={isWorking}
                    className="mb-2"
                />
                {errors?.regularPrice?.message && <p className="-mt-1 text-red-600 pr-1">{errors.regularPrice.message}</p>}

                <label>Попуст:</label>
                <input
                    {...register("discount", {
                        validate: (value) => Number(value) <= Number(getValues().regularPrice) || "Попуст мора бити мањи од регуларне цијене."
                    })}
                    type="number"
                    id="discount"
                    placeholder="Попуст у КМ"
                    disabled={isWorking}
                    className="mb-2"
                />
                {errors?.discount?.message && <p className="-mt-1 text-red-600 pr-1">{errors.discount.message}</p>}

                <label>Опис:</label>
                <textarea
                    {...register("description", { required: "Ово поље је обавезно." })}
                    type="text"
                    id="description"
                    className="h-20 px-2 py-2 mb-2 border"
                    placeholder="Опишите изглед апартмана..."
                />
                {errors?.description?.message && <p className="-mt-1 text-red-600 pr-1">{errors.description.message}</p>}

                <label htmlFor="imageUrl">Слика:</label>
                <input type="file" accept="image/*" id="imageUrl" className="w-full" disabled={isWorking} />

                <div className="ml-auto mt-4">
                    <button className="btn-secondary" type="reset" onClick={() => onCloseModal?.()}>Одбаци</button>
                    <button className="btn-primary ml-4" disabled={isWorking}>{isEdit ? "Ажурирај" : "Сачувај"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreateEditCabinForm;