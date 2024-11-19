// src/components/Layout.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if there is a token in localStorage to determine if the user is authenticated
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleSignOut = () => {
        // Clear the token on sign-out
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/signin'); // Redirect to the sign-in page
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-gray-800 text-white px-4 py-3">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold">
                        <Link to="/">MIU Student Policy</Link>
                    </div>
                    <div className="flex gap-4">
                        {/* Conditional rendering based on login status */}
                        {isAuthenticated ? (
                            <button
                                onClick={handleSignOut}
                                className="hover:text-gray-300"
                            >
                                Sign Out
                            </button>
                        ) : (
                            <>
                                <Link to="/signin" className="hover:text-gray-300">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="hover:text-gray-300">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 text-center py-3">
                &copy; {new Date().getFullYear()} MIU Student Policy. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;


