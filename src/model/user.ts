import db from './db';
import { User } from '../interfaces';
import { Tables } from '../configs/table.config';

export class UserDB {

    constructor() {

    }

    // 

    public static getUserByUsername(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${Tables.USERS} WHERE username = '${username}'`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(Object.assign({}, res[0]));
                }
                return resolve(null);
            });
        });
    }

    public static insertUser(fullName: string, userName: string, role: string, wallet: number, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO ${Tables.USERS} (fullname, username, role, wallet, password) VALUES ('${fullName}', '${userName}', '${role}','${wallet}','${password}')`
            db.query(query, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res.insertId);
            })
        })
    }

    public static updateUserWallet(eventId: string| number, price: number): Promise<string>{
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${Tables.USERS} SET wallet=? WHERE id = ${eventId}`, [price], (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        })
    }
}