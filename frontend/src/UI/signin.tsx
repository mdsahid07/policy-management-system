import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signin: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const validateForm = () => {
        let isValid = true;
        const newErrors = { username: '', password: '' };

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required.';
            isValid = false;
        }

        // Password validation
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        setErrors(newErrors); // Update errors state
        return isValid;
    };
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await signIn(formData);
            //alert(response?.success);
            if (response?.success) {
                navigate('/');
            } else {
                alert('Invalid username or password. Please try again.');
            }

        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded">
                <h1 className="text-2xl font-bold mb-4">Signin</h1>

                {/* Username Field */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className={`block w-full p-2 border rounded ${errors.username ? 'border-red-500' : ''
                            }`}
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        className={`block w-full p-2 border rounded ${errors.password ? 'border-red-500' : ''
                            }`}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Signin
                </button>
            </form>
        </div>
    );
};

export default Signin;
