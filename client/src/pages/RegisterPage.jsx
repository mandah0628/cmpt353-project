import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate} from 'react-router-dom';

export default function RegisterPage() {
    const [form, setForm] = useState({
        email: "",
        name:"",
        password: "",
        confirmPassword: ""
    });

    const {register, authState, authLoading} = useAuth();
    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");
    const [clientErrors, setClientErrors] = useState({});

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm( {...form, [e.target.name] : e.target.value} );
        setClientErrors({});
        setServerError("");
    }

    const validateForm = () => {
        let errors= {};

        // 1) name field
        if (!form.name) {
            errors.name = "Please enter your name";
        }
        
        // 2) email field
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            errors.email = "Please enter a valid email";
        }

        // 3) password field
        if (!form.password.trim()) {
            errors.password = "Please enter a password";
        } else if (form.password.trim().length < 8) {
            errors.password = "Password must have at least 8 characters"
        }

        // 4) confirm password field
        if (!form.confirmPassword.trim()) {
            errors.confirmPassword = "Plase confirm your password"
        } else if ( form.password.trim() !== form.confirmPassword.trim() ) {
            errors.confirmPassword = "Passwords do no match"
        }

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
            setSubmitting(false);
            return;
        }

        try {
            await register(form);
            navigate("/");
        } catch (error) {
            setServerError(error.message || "Login failed");
        } finally {
            setSubmitting(false);
        }
    }



    useEffect(() => {
        if(authState && !authLoading) {
            navigate("/");
        }
    }, [authState, authLoading, navigate]);




    if (authLoading) {
        return(
            <div className='min-h-screen flex items-center justify-center'>
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className='rounded-2xl shadow-lg p-10 w-100 border-2 '>
                <div className='pb-5'>
                    <h2 className='px-5 text-center font-bold text-2xl'>Register</h2>
                    <p className='text-center'>Please enter your details</p>
                </div>
                

                {/* form container */}
                <form onSubmit={handleSubmit} className='space-y-4'>

                    {/* name */}
                    <input
                        type="text"
                        name='name'
                        placeholder='Your name'
                        value={form.name}
                        onChange={handleChange}
                        className='w-full border-2 px-2 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-200'
                    />
                    {clientErrors.name && (
                        <p className='text-red-500 font-bold text-sm'>{clientErrors.name}</p>
                    )}
                    
                    {/* email */}
                    <input
                        type="email"
                        name='email'
                        placeholder='abc123@example.com'
                        value={form.email}
                        onChange={handleChange}
                        className='w-full border-2 px-2 py-2 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-200'
                    />
                    {clientErrors.email && (
                        <p className='text-red-500 font-bold text-sm'>{clientErrors.email}</p>
                    )}

                    {/* password */}
                    <input
                        type="password"
                        name='password'
                        placeholder='Your password'
                        value={form.password}
                        onChange={handleChange}
                        className='w-full border-2 px-2 py-2 rounded-md focus: outline-none focus:border-blue-500 transition-colors duration-200'
                    />
                    {clientErrors.password && (
                        <p className='text-red-500 font-bold text-sm'>{clientErrors.password}</p>
                    )}

                    {/* confirm password */}
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm your password'
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className='w-full border-2 px-2 py-2 rounded-md focus: outline-none focus:border-blue-500 transition-colors duration-200'
                    >
                    </input>
                    {clientErrors.confirmPassword && (
                        <p className='text-red-500 font-bold text-sm'>{clientErrors.confirmPassword}</p>
                    )}

                    <button
                        type='submit'
                        className='mx-auto block p-2 font-bold border-2 rounded-md hover:bg-blue-300 transition-colors duration-200'
                        disabled={submitting}
                    >
                        {submitting ? "Loading..." : "Register"}
                    </button>

                    <p className='text-center'>
                        Already have an account? 
                        <Link to="/login" className='font-bold hover:text-blue-500 transition-colors duration-300'> Sign In</Link>
                    </p>
                    {serverError.trim() !== "" && (
                        <p className='text-center text-red-500 font-bold text-sm'>{serverError}</p>
                    )}

                </form>
            </div>
        </div>
    );
}