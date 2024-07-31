// hooks
import { useLogout } from '../hooks/users/useLogout';
// assets
import { LogOut } from 'lucide-react';

const Logout = () => {
    const { logout, isLoading } = useLogout();

    return (
        <button
            onClick={logout}
            disabled={isLoading}
        >
            <LogOut />
        </button>
    )
}

export default Logout;