// assets
import LogoImg from "../assets/logo.png";

const Logo = () => {
    return (
        <div className="flex flex-col items-center mt-6">
            <img src={LogoImg} className="mb-2 object-cover max-w-20" />
            <p className="text-xl font-medium uppercase tracking-wider">Хотел Тајан</p>
        </div>
    )
}

export default Logo;