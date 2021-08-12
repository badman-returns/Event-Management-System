import db from './db';
import { Tables } from '../configs/table.config';

export class ParticipantDB {

    constructor() {

    }

    public static viewParticipant(eventId: string | number): Promise<Event>{
        return new Promise((resolve, reject) => {
            db.query(`SELECT ${Tables.PARTICIPANTS}.fullname as participant FROM ${Tables.PARTICIPANTS} WHERE ${Tables.PARTICIPANTS}.eventId=${eventId}`, (err, res) => {
                if (err){
                    return reject(err);
                }
                if (res.length){
                    return resolve(res.map((result: any) => Object.assign({}, result)));
                }
                return resolve(null);
            })
        })
    }

    public static createParticipant(eventId: string | number, userId: string | number, name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${Tables.PARTICIPANTS} WHERE ${Tables.PARTICIPANTS}.eventId=${eventId} AND userId=${userId}`, (err, res) => {
                if(err){
                    return reject(err);
                }
                else if (res.length){
                    return reject(err);
                }
                else {
                    db.query(`INSERT INTO ${Tables.PARTICIPANTS} (eventId, userId, fullname) VALUES ('${eventId}', '${userId}', '${name}')`, (err, res) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(res.insertId);
                    });
                }
            })
        });
    }

}