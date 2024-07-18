// react-query
import { useMutation, useQueryClient } from '@tanstack/react-query';
// services
import { deleteCabin } from '../services/apiCabins';
// components
import CreateEditCabinForm from './CreateEditCabinForm';
// hooks
import { useState } from 'react';
// react-hot-toast
import toast from 'react-hot-toast';

const CabinRow = ({ cabin }) => {
    const [showForm, setShowForm] = useState(false);
    const { _id: cabinId, name, maxCapacity, regularPrice, discount } = cabin;

    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate } = useMutation({
        mutationFn: (id) => deleteCabin(id),
        onSuccess: () => {
            toast.success("Апартман обрисан!");
            queryClient.invalidateQueries({
                queryKey: ["cabins"]
            });
        },
        onError: (err) => { toast.error(err.message) }
    });

    return (
        <>
            <tr className="grid grid-cols-6 gap-6 items-center bg-gray-50 border-b border-b-gray-200 tracking-wide py-4 px-4">
                <th></th>
                <th>{name}</th>
                <th>{maxCapacity > 4 ? `${maxCapacity} особа` : `${maxCapacity} особе`}</th>
                <th>{regularPrice} КМ</th>
                <th>{discount ? `${discount} КМ` : <span>&mdash;</span>}</th>
                <td className='flex gap-2'>
                    <button onClick={() => setShowForm(show => !show)}>
                        Измјени
                    </button>

                    <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
                        Обриши
                    </button>
                </td>
            </tr>
            {showForm && <CreateEditCabinForm cabinToEdit={cabin} />}
        </>
    )
}

export default CabinRow;