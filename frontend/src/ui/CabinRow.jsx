
// components
import CreateEditCabinForm from './CreateEditCabinForm';
// hooks
import { useState } from 'react';
import { useDeleteCabin } from '../hooks/useDeleteCabin';

const CabinRow = ({ cabin }) => {
    const [showForm, setShowForm] = useState(false);
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { _id: cabinId, name, maxCapacity, regularPrice, discount } = cabin;

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

                    <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
                        Обриши
                    </button>
                </td>
            </tr>
            {showForm && <CreateEditCabinForm cabinToEdit={cabin} />}
        </>
    )
}

export default CabinRow;