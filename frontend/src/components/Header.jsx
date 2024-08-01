// components
import HeaderMenu from './HeaderMenu';
import UserAvatar from './UserAvatar';

const Header = () => {
    return (
        <header className='flex justify-between py-2 px-8 border-b-2 border-gray-200'>
            <UserAvatar />
            <HeaderMenu />
        </header>
    )
}

export default Header