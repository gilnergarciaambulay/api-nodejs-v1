import { config as dotenv } from 'dotenv';

// dotenv
dotenv();

// objecto JSON de la configuracion SQLserver
export const configSqlServer = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    server: process.env.DB_HOST!, // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DB_NAME!,
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}