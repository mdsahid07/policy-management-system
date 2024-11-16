import { createHmac } from 'node:crypto';

const secretKey = 'mySecurity2024';

export const hashPassword = (password: string): string => {
    return createHmac('sha256', secretKey).update(password).digest('base64');
};
