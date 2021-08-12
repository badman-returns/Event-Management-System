import db from './db';
import { Tables } from '../configs/table.config';
import { Event } from '../interfaces/event.model';

export class EventDB {

    constructor() {

    }

    public static getAllEvents(): Promise<Array<Event>> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${Tables.EVENTS}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(res.map((result: any) => Object.assign({}, result)));
                }
                return resolve(null);
            });
        });
    }

    public static getEventById(eventId: string): Promise<Event> {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${Tables.EVENTS} WHERE id=${eventId}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                if (res.length) {
                    return resolve(res.map((result: any) => Object.assign({}, result))[0]);
                }
                return resolve(null);
            });
        });
    }

    public static createEvent(name: string, startDate: Date, endDate: Date, status: number, price: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${Tables.EVENTS} (name, start_date, end_date, status, price) VALUES ('${name}', '${startDate}', '${endDate}', '${status}', '${price}')`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res.insertId);
            });
        });
    }

    public static updateEvent(eventId: string | number, name: string, startDate: Date, endDate: Date, status: number, price: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${Tables.EVENTS} SET name=?, start_date=?, end_date=?, status=?, price=? WHERE id = ${eventId}`, [name, startDate, endDate, status, price], (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }

    public static deleteEvent(eventId: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            db.query(`DELETE  FROM ${Tables.EVENTS} WHERE id=${eventId}`, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(null);
            });
        });
    }
}