import React from 'react';
import { clearToken, isAuthenticated } from '../Business/localstorage_crud';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        clearToken();
        navigate('/signin');
    };

    if (!isAuthenticated()) {
        navigate('/signin');
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome! You are authenticated.</p>
            <button onClick={handleSignout} className="bg-red-500 text-white px-4 py-2 mt-4">
                Signout
            </button>
        </div>
    );
};

export default Dashboard;
