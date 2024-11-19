import sql from 'mssql';

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'StudentPolicy',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },


};
// const config = {
//     user: 'systemadmin',
//     password: 'Jahid123456',
//     server: 'miusqldemo.database.windows.net',
//     database: 'StudentPolicy',
//     port: 1433,
//     options: {
//         encrypt: true,
//         trustServerCertificate: false,

//     },


// };
export const connectDB = async () => {
    try {
        return await sql.connect(config);
    } catch (error) {
        console.log("Db Connection Error!!!!");
        console.error('Database connection failed:', error);
        throw error;
    }
};
