// hooks
import { useAuthContext } from "../context/AuthContext";

const UserAvatar = () => {
    const { user } = useAuthContext();

    return (
        <div className="flex gap-2 items-center">
            <img
                src={user?.photoUrl || "default-user.jpg"}
                alt={`${user?.name} avatar`}
                className="block w-7 h-7 rounded-full aspect-square object-cover object-center outline-1 outline-gray-500"
            />
            <span className="font-medium text-lg">{user?.name}</span>
        </div>
    )
}

export default UserAvatar;