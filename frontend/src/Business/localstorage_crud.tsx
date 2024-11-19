export const storeToken = (token: string) => {
    localStorage.setItem('authToken', token);
};
export const storeUserId = (userid: string) => {
    localStorage.setItem('userid', userid);
};

export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};
export const getUserId = (): string | null => {
    return localStorage.getItem('userid');
};

export const clearToken = () => {
    localStorage.removeItem('authToken');
};
export const clearUserId = () => {
    localStorage.removeItem('userid');
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};
