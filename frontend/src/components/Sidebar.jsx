// hooks
import { useAuthContext } from "../context/AuthContext";
// components
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
// assets
import { HiOutlineHome, HiOutlineCalendarDays, HiOutlineHomeModern, HiOutlineUsers, HiOutlineCog8Tooth } from "react-icons/hi2";

const Sidebar = () => {
    const { user } = useAuthContext();

    return (
        <aside className='py-4 border-r-2 border-gray-200 min-w-80'>
            <Logo />
            <nav className="my-6 mx-8">
                <ul className="space-y-1 py-2 tracking-wider font-medium text-sm">
                    <li className="w-full">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineHome className="navlink-icon" />
                            <span>Почетна</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/bookings"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineCalendarDays className="navlink-icon" />
                            <span>Резервације</span>
                        </NavLink>
                    </li>
                    <li className="w-full">
                        <NavLink
                            to="/cabins"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineHomeModern className="navlink-icon" />
                            <span>Апартмани</span>
                        </NavLink>
                    </li>
                    {(user && user.role === "admin") && (
                        <li className="w-full">
                            <NavLink
                                to="/users"
                                className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                            >
                                <HiOutlineUsers className="navlink-icon" />
                                <span>Корисници</span>
                            </NavLink>
                        </li>
                    )}
                    <li className="w-full">
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => isActive ? "active-navlink" : "navlink"}
                        >
                            <HiOutlineCog8Tooth className="navlink-icon" />
                            <span>Подешавања</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar