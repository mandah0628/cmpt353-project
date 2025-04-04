import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../utils/axios';

export default function ProfileSettingsPage() {
    const[form, setForm] = useState({
        email:"",
        name:"",
    });

    const [originalData, setOriginalData] = useState({});
    const[userImage, setUserImage] = useState(null);
    const[newImage, setNewImage] = useState(null);

    const[fetching, setFetching] = useState(true);
    const[submitting, setSubmitting] = useState(false);

    const fileInputRef = useRef();

    const handleChange = (e) => {
        setForm( {...form, [e.target.name] : e.target.value} );
    }

    const fetchUserData = async () => {
        try {
            setFetching(true);
            const res = await axiosInstance.get("/user/get-user");

            setOriginalData(res.data.userData);
            setForm(res.data.userData);

            setUserImage(res.data.userData.image);

            console.log(res.data)
        } catch (error) {
            console.error("Error fetching user data")
        } finally {
            setFetching(false);
        }
    }


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setUserImage(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const formData = new FormData()

            if (newImage) {
                formData.append("newImage", newImage);
            }

            if (form.email.trim() !== originalData.email) {
                formData.append("email", form.email);
            }

            if (form.name.trim() !== originalData.name) {
                formData.append("name", form.name);
            }

            await axiosInstance.put("/user/update-user", formData)

            await fetchUserData();
        } catch (error) {
            console.error(error.response?.data?.message)
        } finally {
            setSubmitting(false);
        }
    }


    const handleImageClick = () => {
        fileInputRef.current.click();
    }


    useEffect(() => {
        fetchUserData();
    },[]);


    console.log(form);
    
    return(
        <div className="pt-20 min-h-screen flex items-center justify-center mx-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 rounded shadow-lg w-full max-w-md p-5"
            >

                {/* profile photo */}
                <div className='flex items-center justify-center'>
                    <img
                        onClick={handleImageClick}
                        src={!userImage ? "/default.jpg" : userImage}
                        className='w-35 h-35 cursor-pointer'
                        
                    />
                    <input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className='hidden'
                        title='Click to change'
                    />
                </div>

                {/* email */}
                <div>
                    <label className="block font-semibold">Email:</label>
                    <input 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* email */}
                <div>
                    <label className="block font-semibold ">Name:</label>
                    <textarea
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
                >
                    {submitting ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>

        
    )
}