// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/users/useSignup";
import { useAuthContext } from "../context/AuthContext";
// libs
import { toast } from "react-hot-toast";
// client-side validation with Yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// components
import SpinnerButton from "../components/SpinnerButton";
// assets
import { Mail, KeyRound, Send, Eye, EyeOff, UserRound } from 'lucide-react';

// Sign up validation schema
const SignUpSchema = yup.object({
    name: yup.string().required("Име и презиме је обавезно."),
    email: yup.string().required("Адреса ел.поште је обавезна.").email("Унесите валидну адресу ел.поште."),
    password: yup.string().required("Лозинка је обавезна.")
});

const SignupForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { signup, isPending } = useSignup();
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({ resolver: yupResolver(SignUpSchema) });

    const onSubmit = async (data) => {
        // React Query provides its own error handling through the onError callback of the mutate function. 
        // This is why you don’t need an explicit try/catch block in the onSubmit function. 
        // When the mutation function (login function) throws an error, 
        // React Query catches it and invokes the onError callback with the error object.
        const { name, email, password } = data;

        signup({ name, email, password }, {
            onError: (error) => {
                setError("root", { type: "server", message: error.message });
            },
            onSuccess: (user) => {
                toast.success(`Нови запослени ${user.name} је регистрован.`);
                reset();
            },
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[600px] rounded-md flex flex-col items-center gap-8 mt-40 mx-auto border-2 shadow-lg border-teal-600 p-10"
        >
            <h1 className="uppercase font-medium text-xl">Направи профил новог запосленог:</h1>
            <div className="relative w-full">
                <input
                    {...register("name")}
                    className="form-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Име и презиме"
                    disabled={isPending}
                />
                <UserRound className="input-icon" />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            <div className="relative w-full">
                <input
                    {...register("email")}
                    className="form-input"
                    type="text"
                    autoComplete="off"
                    placeholder="Адреса електронске поште"
                    disabled={isPending}
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
                    disabled={isPending}
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
                className="btn-teal w-52 h-10"
                disabled={isPending}
            >
                {isPending ? <SpinnerButton /> : "Направи профил"}
                <Send className="button-icon" />
            </button>
        </form>
    )
}

export default SignupForm;