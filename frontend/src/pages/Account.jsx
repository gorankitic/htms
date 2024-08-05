// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthContext";
// components
import SpinnerButton from "../components/SpinnerButton";
// services
import { updateUser } from "../services/apiAuth";
// yup validation
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
// assets
import { UserRound, Send } from "lucide-react";
// uploadcare
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import "@uploadcare/react-uploader/core.css"

// validation schema
const updateProfileSchema = yup.object({
    name: yup.string().required("Име и презиме је обавезно.")
}).required();

const Account = () => {
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const { user, dispatch } = useAuthContext();


    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: yupResolver(updateProfileSchema),
        defaultValues: {
            name: user.name,
        }
    });

    const onSubmit = async ({ name }) => {
        let photoUrl = "";
        if (imageUrl) {
            photoUrl = `${imageUrl}/-/scale_crop/200x200/smart_objects_faces_points`;
        } else if (user.photoUrl) {
            photoUrl = user.photoUrl;
        }
        try {
            const updatedUser = await updateUser({ name, photoUrl, userId: user._id });
            localStorage.setItem('user', JSON.stringify(updatedUser));
            dispatch({ type: 'login', payload: updatedUser });
            navigate('/dashboard');
        } catch (error) {
            setError("root", { type: 'server', message: error.message });
        }
    }

    const handleChangeEvent = (item) => {
        setImageUrl(item.allEntries[0].cdnUrl);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-[600px] rounded-md flex flex-col items-center gap-8 mt-40 mx-auto border-2 shadow-lg border-teal-600 p-10"
        >
            <h1 className="uppercase font-medium text-xl">Измјените своје податке:</h1>
            <div className="relative w-full">
                {imageUrl
                    ?
                    <img src={`${imageUrl}/-/scale_crop/200x200/smart_objects_faces_points`} className="profile-img" />
                    :
                    user.photoUrl
                        ?
                        <img src={user.photoUrl} className="profile-img" />
                        :
                        (<div className="rounded-full mx-auto h-[150px] w-[150px] bg-white flex items-center justify-center">
                            <UserRound className="text-gray-400 h-24 w-24 stroke-1" />
                        </div>)
                }
                <div className="text-center my-4">
                    <FileUploaderRegular
                        pubkey={import.meta.env.VITE_UPLOADCARE_PUBKEY}
                        maxLocalFileSizeBytes={4000000}
                        multiple={false}
                        imgOnly={true}
                        sourceList="local"
                        classNameUploader="my-config uc-light"
                        onChange={handleChangeEvent}
                    />
                </div>

                <label className="block mb-1">Име и презиме:</label>
                <input
                    {...register("name")}
                    className="form-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    disabled={isSubmitting}
                />
                <UserRound className="absolute left-4 bottom-[10px] h-5 w-5" />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>
            {errors.root?.type === "server" && <p className="form-error">{errors.root.message}</p>}
            <button
                className="btn-teal w-52 h-10"
                disabled={isSubmitting}
            >
                {isSubmitting ? <SpinnerButton /> : "Измјени профил"}
                <Send className="button-icon" />
            </button>
        </form>
    )
}

export default Account;