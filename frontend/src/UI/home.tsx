import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="w-full bg-blue-600 text-white p-4">
                <nav className="flex justify-between items-center max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold">Policy for the Student</h1>
                    <div className="space-x-4">
                        <Link to="/signup" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100">
                            Signup
                        </Link>
                        <Link to="/signin" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100">
                            Signin
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="text-center">
                <h2 className="text-4xl font-bold mb-6">Welcome to Policy for the Student</h2>
                <p className="text-lg mb-8 text-gray-700">
                    Please sign up or sign in to access.
                </p>
                <div className="space-x-4">
                    <Link
                        to="/signup"
                        className="px-6 py-3 bg-blue-500 text-white text-lg rounded shadow hover:bg-blue-600"
                    >
                        Signup
                    </Link>
                    <Link
                        to="/signin"
                        className="px-6 py-3 bg-gray-500 text-white text-lg rounded shadow hover:bg-gray-600"
                    >
                        Signin
                    </Link>
                </div>
            </main>

            <footer className="mt-10 text-gray-600">
                © 2024 Policy for the Student. All rights reserved.
            </footer>
        </div>
    );
};

export default Home;



