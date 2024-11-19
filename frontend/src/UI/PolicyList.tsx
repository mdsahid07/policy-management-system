import React from 'react';
import { IPolicy } from '../Business/IPolicy.ts';

interface PolicyListProps {
    policies: IPolicy[];
    onUpvote: (id: number) => void;
}

const PolicyList: React.FC<PolicyListProps> = ({ policies, onUpvote }) => {
    return (
        <div>
            <ul>
                {policies.map((policy) => (
                    <li key={policy.id} className="border-b p-4">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold">{policy.title}</h2>
                            <span className="text-gray-500">{new Date(policy.date).toLocaleDateString()}</span>
                        </div>
                        <p>{policy.description}</p>
                        <p>
                            <strong>Category:</strong> {policy.category}
                        </p>
                        <p>
                            <strong>Owner:</strong> {policy.owner}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <p>
                                <strong>Votes:</strong> {policy.vote}
                            </p>
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                onClick={() => onUpvote(policy.id)}
                            >
                                Upvote
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PolicyList;
