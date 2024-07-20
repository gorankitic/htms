
// components
import Modal from '../Modal';
import Table from '../Table';
import CreateEditCabinForm from './CreateEditCabinForm';
import ConfirmDelete from '../ConfirmDelete';
// hooks
import { useDeleteCabin } from '../../hooks/cabins/useDeleteCabin';

const CabinRow = ({ cabin }) => {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { _id: cabinId, name, maxCapacity, regularPrice, discount } = cabin;

    return (
        <Table.Row>
            <div></div>
            <div>{name}</div>
            <div>{maxCapacity > 4 ? `${maxCapacity} особа` : `${maxCapacity} особе`}</div>
            <div>{regularPrice} КМ</div>
            <div>{discount ? `${discount} КМ` : <span>&mdash;</span>}</div>
            <div className='flex gap-2'>
                <Modal>
                    <Modal.Open opens="edit">
                        <button>
                            Измјени
                        </button>
                    </Modal.Open>
                    <Modal.Window name="edit">
                        <CreateEditCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Open opens="delete">
                        <button>
                            Обриши
                        </button>
                    </Modal.Open>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName={`апартман ${name}`}
                            disabled={isDeleting}
                            onConfirm={() => deleteCabin(cabinId)}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>

    )
}

export default CabinRow;