// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
// client-side validation with Yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import Logo from "../components/Logo";
import Spinner from "../components/Spinner";
// assets
import { Mail, KeyRound, Send, Eye, EyeOff } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/users/useLogin";

// Login validation schema
const SignInSchema = yup.object({
    email: yup.string().required("Адреса ел.поште је обавезна.").email("Унесите валидну адресу ел.поште."),
    password: yup.string().required("Лозинка је обавезна.")
});

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { login, isLoggingIn } = useLogin();
    const { dispatch } = useAuthContext();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(SignInSchema) });

    const onSubmit = async (data) => {
        // React Query provides its own error handling through the onError callback of the mutate function. 
        // This is why you don’t need an explicit try/catch block in the onSubmit function. 
        // When the mutation function (login function) throws an error, 
        // React Query catches it and invokes the onError callback with the error object.
        const { email, password } = data;

        login({ email, password }, {
            onError: (error) => {
                setError("root", { type: "server", message: error.message });
            },
            onSuccess: (user) => {
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: "login", payload: user });
                navigate("/dashboard");
            }
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[600px] rounded-md flex flex-col items-center gap-8 mt-40 mx-auto border-2 shadow-lg border-teal-600 p-10"
        >
            <Logo />
            <h1 className="uppercase font-medium text-2xl">Пријавите се на свој профил</h1>
            <div className="relative w-full">
                <input
                    {...register("email")}
                    className="form-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Адреса електронске поште"
                    disabled={isLoggingIn}
                />
                <Mail className="input-icon" />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>
            <div className="relative w-full">
                <input
                    {...register("password")}
                    className="form-input"
                    type={passwordVisible ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Лозинка"
                    disabled={isLoggingIn}
                />
                <KeyRound className="input-icon" />
                {passwordVisible
                    ?
                    <EyeOff className="input-icon-right" onClick={() => setPasswordVisible(false)} />
                    :
                    <Eye className="input-icon-right" onClick={() => setPasswordVisible(true)} />
                }
                {errors.password && <p className="form-error">{errors.password.message}</p>}
                {errors.root?.type === "server" && <p className="form-error">{errors.root.message}</p>}
            </div>
            <button
                className="btn-teal"
                disabled={isLoggingIn}
            >
                {isLoggingIn ? <Spinner color="text-teal-50" /> : "Пријави се"}
                <Send className="button-icon" />
            </button>
        </form>
    )
}

export default Login;