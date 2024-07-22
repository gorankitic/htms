// hooks
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
// assets
import { HiXMark } from "react-icons/hi2";

// Implement reusable modal - compound component pattern

const ModalContext = createContext();

const Modal = ({ children }) => {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

const Open = ({ children, opens: opensWindow }) => {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(opensWindow) });
}

const Window = ({ children, name }) => {
    const { openName, close } = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return createPortal(
        <div className="fixed top-0 left-0 w-full h-screen backdrop-filter backdrop-blur-sm">
            <div ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 rounded-md shadow-lg py-10 px-10 transition-all">
                <button
                    onClick={close}
                    className="bg-none border-none p-2 rounded-sm transition-transform absolute top-4 right-4 hover:bg-gray-200"
                >
                    <HiXMark />
                </button>
                <div>
                    {cloneElement(children, { onCloseModal: close })}
                </div>
            </div>
        </div>,
        document.body
    )
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;