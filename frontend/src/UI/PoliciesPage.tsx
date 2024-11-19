// src/pages/PoliciesPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getUserId } from '../Business/localstorage_crud';

interface Policy {
    id: number;
    title: string;
    description: string;
    owner: string;
    date: string;
    category: string;
    vote: number;
}

const PoliciesPage: React.FC = () => {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [filterYear, setFilterYear] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch policies from backend
        fetch('http://localhost:3000/policies')
            .then((res) => res.json())
            .then((data) => setPolicies(data.result))
            .catch((err) => console.error(err));
    }, []);

    const filteredPolicies = policies
        .filter((policy) =>
            filterYear ? policy.date.startsWith(filterYear) : true
        )
        .sort((a, b) => b.vote - a.vote);

    // const handleUpvote = (id: number) => {
    //     fetch(
    //         `http://localhost:3000/${id}/upvote`,
    //         { method: 'POST', headers: { authorization: `Bearer ${getToken()}` } }
    //     )
    //         .then(() => {
    //             setPolicies((prev) =>
    //                 prev.map((policy) =>
    //                     policy.id === id ? { ...policy, vote: policy.vote + 1 } : policy
    //                 )
    //             );
    //         })
    //         .catch((err) => console.error(err));
    // };
    const userid = getUserId();
    const handleUpvote = (id: number) => {
        fetch(`http://localhost:3000/${id}/upvote`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${getToken()}` },
            body: JSON.stringify({ userid }),
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                //alert(getUserId());
                if (data.success) {
                    // If success is true, update the vote count
                    setPolicies((prev) =>
                        prev.map((policy) =>
                            policy.id === id ? { ...policy, vote: policy.vote + 1 } : policy
                        )
                    );
                } else {
                    // Handle the case when success is false
                    if (data.message == 'Already voted') {
                        alert('You have already given vote');
                    }
                    else {
                        //alert(data);
                        alert('You are unauthorize, you can not giving the vote!!!');
                    }
                    // Assuming there is a message or error description
                }
            })
            .catch((err) => {
                console.error('Error while upvoting:', err); // Handle any errors
            });
    };
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        // Format as YYYY-MM-DD
        return date.toISOString().split('T')[0];
    };
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Policies</h1>
            <button
                onClick={() => navigate('/add-policy')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Add Policy
            </button>
            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Filter by Year (e.g., 2023)"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="border p-2"
                />
            </div>
            <div className="mt-6">
                {filteredPolicies.map((policy) => (
                    // <div key={policy.id} className="border p-4 rounded mb-4">
                    //     <h2 className="text-lg font-bold">{policy.title}</h2>
                    //     <p>{policy.description}</p>
                    //     <p className="text-sm text-gray-600">
                    //         {policy.date} | {policy.category}
                    //     </p>
                    //     <p className="text-green-500 font-bold">Votes: {policy.vote}</p>
                    //     <button
                    //         onClick={() => handleUpvote(policy.id)}
                    //         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    //     >
                    //         Vote
                    //     </button>
                    // </div>
                    <div
                        key={policy.id}
                        className="border p-4 rounded shadow-sm bg-gray-50"
                    >
                        <h2 className="text-xl font-semibold">{policy.title}</h2>
                        <p className="text-gray-600">{policy.description}</p>
                        <p className="text-sm text-gray-500">
                            <strong>Owner:</strong> {policy.owner} |{' '}
                            <strong>Date:</strong> {formatDate(policy.date)} |{' '}
                            <strong>Category:</strong> {policy.category}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-green-600 font-bold">
                                Votes: {policy.vote}
                            </span>
                            <button
                                onClick={() => handleUpvote(policy.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Vote
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PoliciesPage;
