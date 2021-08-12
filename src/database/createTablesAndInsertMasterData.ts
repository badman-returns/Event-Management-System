import { Encryption } from '../utility';
import { Tables } from '../configs/table.config';
import db from '../model/db';

export default class CreateTablesAndInsertMasterData {

    constructor() {

    }

    // User Table
    private static async createUsersTable(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.USERS}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.USERS} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                fullname VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL,
                role VARCHAR(255) NOT NULL,
                wallet VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                createdOn DATETIME default current_timestamp,
                CONSTRAINT contact_unique UNIQUE(username))
                `, (err, res) => {
                    if (err){
                        return reject(err);
                    }
                    if (res.length) {
                        return resolve(true);
                    }
                    return resolve(null);
                }
            )
        })
    }

    private static createSuperAdminUser(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const user = {
                fullname: "Administrator",
                role: "SUPER_ADMIN",
                username: "admin_default_user",
                password: Encryption.encryptPassword(process.env.ADMIN_DEFAULT_PASSWORD),
            };

            db.query(`INSERT IGNORE INTO ${Tables.USERS} SET ?`, user, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }

    public static async createUserTableAndSuperAdminUser() {
        try {
            await CreateTablesAndInsertMasterData.createUsersTable();
        } catch (e) {
            console.error('CREATE SUPER USER TABLE', e);
        }

        try {
            await CreateTablesAndInsertMasterData.createSuperAdminUser();
        } catch (e) {
            console.error('CREATE SUPER ADMIN', e);
        }
    }


    // Events Table
    public static async createEventsTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.EVENTS}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.EVENTS} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                name VARCHAR(255) NOT NULL,
                start_date VARCHAR(255) NOT NULL,
                end_date VARCHAR(255) NOT NULL,
                status BOOLEAN NOT NULL,
                price VARCHAR(255) NOT NULL,
                createdOn DATETIME NOT NULL DEFAULT current_timestamp,                
                CONSTRAINT contacts_unique UNIQUE(id))
            `, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }

    public static async createParticipantsTable() {
        return new Promise((resolve, reject) => {
            // db.query(`DROP TABLE ${Tables.PARTICIPANTS}`)
            db.query(`CREATE TABLE IF NOT EXISTS ${Tables.PARTICIPANTS} (
                id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id),
                eventId INT NOT NULL, FOREIGN KEY (eventId) references ${Tables.EVENTS}(id),
                userId INT NOT NULL, FOREIGN KEY (userId) references ${Tables.USERS}(id),
                fullName VARCHAR(255) NOT NULL,
                CONSTRAINT contacts_unique UNIQUE(id))
            `, (err, res) => {
                if (err) {
                    console.log(err)
                    return reject(err);
                }
                if (res.length) {
                    return resolve(true);
                }
                return resolve(null);
            });
        });
    }
}


