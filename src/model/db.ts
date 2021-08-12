import * as mysql from "mysql";
import * as fs from 'fs';
const dotenv = require('dotenv');
dotenv.config();

const Connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        cert: fs.readFileSync("H:/Ailoitte Technologies/BaltimoreCyberTrustRoot.crt.pem"),
        rejectUnauthorized: true,
    }
});

export default Connection;