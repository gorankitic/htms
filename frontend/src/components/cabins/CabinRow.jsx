
// components
import Modal from '../Modal';
import Table from '../Table';
import Menu from '../Menu';
import CreateEditCabinForm from './CreateEditCabinForm';
import ConfirmDelete from '../ConfirmDelete';
// hooks
import { useDeleteCabin } from '../../hooks/cabins/useDeleteCabin';
// assets
import { HiPencil, HiTrash } from 'react-icons/hi2';

const CabinRow = ({ cabin }) => {
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { _id: cabinId, name, maxCapacity, regularPrice, discount, imageUrl } = cabin;

    return (
        <Table.Row>
            <img src={imageUrl} className="mx-auto object-cover h-[70px] w-[100px]" />
            <div>{name}</div>
            <div>{maxCapacity > 4 ? `${maxCapacity} особа` : `${maxCapacity} особе`}</div>
            <div>{regularPrice} КМ</div>
            <div>{discount ? `${discount} КМ` : <span>&mdash;</span>}</div>
            <Modal>
                <Menu>
                    <Menu.Toggle id={cabinId} />
                    <Menu.List id={cabinId}>

                        <Modal.Open opens="edit">
                            <Menu.Button icon={<HiPencil />}>Измјени</Menu.Button>
                        </Modal.Open>


                        <Modal.Open opens="delete">
                            <Menu.Button icon={<HiTrash />}>Обриши</Menu.Button>
                        </Modal.Open>
                    </Menu.List >

                    <Modal.Window name="edit">
                        <CreateEditCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resourceName={`апартман ${name}`}
                            disabled={isDeleting}
                            onConfirm={() => deleteCabin(cabinId)}
                        />
                    </Modal.Window>
                </Menu >
            </Modal >
        </Table.Row >
    )
}

export default CabinRow;