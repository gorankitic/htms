// hooks
import { useNavigate } from "react-router-dom";
// components
import Logout from "../components/Logout";
// assets
import { UserRound } from "lucide-react";

const HeaderMenu = () => {
    const navigate = useNavigate();

    return (
        <ul className="flex gap-1">
            <li>
                <button
                    className='p-2 rounded-md hover:bg-gray-100'
                    onClick={() => navigate("/account")}
                >
                    <UserRound className="h-6 w-6" />
                </button>
            </li>
            <li><Logout /></li>
        </ul>
    )
}

export default HeaderMenu;