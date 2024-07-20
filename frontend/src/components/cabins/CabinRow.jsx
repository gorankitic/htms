
// components
import Modal from '../Modal';
import CreateEditCabinForm from './CreateEditCabinForm';
import ConfirmDelete from '../ConfirmDelete';
// hooks
import { useDeleteCabin } from '../../hooks/cabins/useDeleteCabin';

const CabinRow = ({ cabin }) => {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { _id: cabinId, name, maxCapacity, regularPrice, discount } = cabin;

    return (
        <tr className="grid grid-cols-6 gap-6 items-center bg-gray-50 border-b border-b-gray-200 tracking-wide py-4 px-4">
            <th></th>
            <th>{name}</th>
            <th>{maxCapacity > 4 ? `${maxCapacity} особа` : `${maxCapacity} особе`}</th>
            <th>{regularPrice} КМ</th>
            <th>{discount ? `${discount} КМ` : <span>&mdash;</span>}</th>
            <td className='flex gap-2'>
                <Modal>
                    <Modal.Open opens="edit">
                        <button>
                            Измјени
                        </button>
                    </Modal.Open>
                    <Modal.Window name="edit">
                        <CreateEditCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Open>
                        <button>
                            Обриши
                        </button>
                    </Modal.Open>
                    <Modal.Window>
                        <ConfirmDelete
                            resourceName={`апартман ${name}`}
                            disabled={isDeleting}
                            onConfirm={() => deleteCabin(cabinId)}
                        />
                    </Modal.Window>
                </Modal>
            </td>
        </tr>

    )
}

export default CabinRow;