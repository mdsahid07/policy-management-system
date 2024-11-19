// src/pages/AddPolicyPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../Business/localstorage_crud';

interface AddPolicyFormProps {
    onAdd: (policy: Policy) => void;
}

interface Policy {
    id: number;
    title: string;
    description: string;
    // owner: string;
    date: string;
    category: string;
    vote: number;
}

const AddPolicyPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        //owner: '',
        date: '',
        category: 'General',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const newPolicy: Policy = {
    //         ...formData,
    //         id: Date.now(),
    //         vote: 0, // Initial vote count
    //     };
    //     console.log('New Policy:', newPolicy);
    //     navigate('/'); // Redirect to Policies List
    // };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:3000/addPolicy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${getToken()}` },
            body: JSON.stringify(formData),
        }).then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                //alert(getUserId());
                if (data.success) {
                    // If success is true, update the vote count
                    alert('Successfully added');
                    navigate('/');
                } else {
                    // Handle the case when success is false

                    alert(data.result);

                    // Assuming there is a message or error description
                }
            })
            .catch((err) => {
                console.error('Error while adding:', err); // Handle any errors
            });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Policy</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border p-2 w-full"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2 w-full"
                    required
                />
                {/* <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    placeholder="Owner"
                    className="border p-2 w-full"
                    required
                /> */}
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                >
                    <option value="General">General</option>
                    <option value="Food">Food</option>
                    <option value="Library">Library</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Education">Education</option>
                    <option value="Visa & Travel">Visa & Travel</option>
                    <option value="Students Lounge">Students Lounge</option>
                </select>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Policy
                </button>
            </form>
        </div>
    );
};

export default AddPolicyPage;
