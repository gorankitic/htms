// hooks
import { createContext, useContext, useState } from "react"
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
// assets
import { HiEllipsisVertical } from "react-icons/hi2";


const MenuContext = createContext();

const Menu = ({ children }) => {
    const [openId, setOpenId] = useState("");
    const [position, setPosition] = useState(null);
    const close = () => setOpenId("");
    const open = setOpenId;

    return (
        <MenuContext.Provider value={{ openId, close, open, position, setPosition }}>
            <div className="flex items-center justify-center">
                {children}
            </div>
        </MenuContext.Provider>
    )
}

const Toggle = ({ id }) => {
    const { openId, close, open, setPosition } = useContext(MenuContext);

    const handleClick = (e) => {
        const rectangle = e.target.closest("button").getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rectangle.width - rectangle.x,
            y: rectangle.y + rectangle.height + 4
        });
        openId === "" || openId !== id ? open(id) : close();
    }

    return (
        <button
            onClick={handleClick}
            className="bg-none border-none p-2 rounded-full transition-all hover:bg-gray-100"
        >
            <HiEllipsisVertical className="h-5 w-5" />
        </button>
    )
}

const List = ({ id, children }) => {
    const { openId, close, position } = useContext(MenuContext);
    const ref = useOutsideClick(close);

    if (openId !== id) return null;

    return createPortal(
        <ul
            ref={ref}
            className={`fixed border shadow-md rounded-sm bg-gray-50`}
            style={{ top: `${position?.y}px`, right: `${position.x}px` }}
        >
            {children}
        </ul>,
        document.body
    );
}

const Button = ({ children, icon, onClick }) => {
    const { close } = useContext(MenuContext);

    const handleClick = () => {
        onClick?.();
        close();
    }

    return (
        <li>
            <button
                onClick={handleClick}
                className="w-full bg-none border-non py-2 px-4 border-b transition-all flex items-center gap-2 hover:bg-gray-100"
            >
                {icon}
                <span>{children}</span>
            </button>
        </li>
    )
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;