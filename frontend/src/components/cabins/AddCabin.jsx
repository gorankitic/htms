
// components
import Modal from "../Modal";
import CreateEditCabinForm from "./CreateEditCabinForm";
// assets
import { HiOutlinePlus } from "react-icons/hi2";

const AddCabin = () => {

    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <button className="btn-primary ml-auto flex items-center gap-1">
                    <HiOutlinePlus className="stroke-2" />
                    <span>Додај апартман</span>
                </button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateEditCabinForm />
            </Modal.Window>
        </Modal >
    );
}

export default AddCabin;