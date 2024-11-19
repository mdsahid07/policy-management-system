import axios from 'axios';

const API_URL = 'http://localhost:3000/policies';

export const getPolicies = async () => {
    const response = await axios.get(API_URL);
    return response.data.result;
};

export const addPolicy = async (policy: any, token: string) => {
    const response = await axios.post(API_URL, policy, {
        headers: { Authorization: token },
    });
    return response.data;
};

export const upvotePolicy = async (id: string, token: string) => {
    const response = await axios.post(`${API_URL}/${id}/upvote`, null, {
        headers: { Authorization: token },
    });
    return response.data;
};