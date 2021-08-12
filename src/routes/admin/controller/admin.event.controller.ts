import { Response } from "express";
import { EventDB } from "../../../model/event";
import { AuthenticatedRequest, ResponseObject } from "../../../interfaces";

class AdminEventController {
    constructor(){

    }

    public static createEvent = async (req: AuthenticatedRequest, res: Response) => {
        const name = req.body.name;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const status = 1;
        const price = req.body.price;

        let insertedID: string;
        let response: ResponseObject<any>;

        if(req.body.user && req.body.user.role != 'SUPER_ADMIN'){
            return res.status(401).send({msg: 'Only Admins can create Events'});
        }
        else{
            try {
                insertedID = await EventDB.createEvent(name, startDate, endDate, status, price);
                response = {
                    ResponseData: `Event id : ${insertedID}`,
                    ResponseMessage: 'Event successfully created',
                }
            } catch (error) {
                console.log(error);
                return res.status(500).end();
            }
            return res.send(response);
        }
    }

    public static updateEvent = async(req: AuthenticatedRequest, res: Response) => {
        const eventId = req.params.id;
        const name = req.body.name;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const status = req.body.status;
        const price = req.body.price;

        let response: ResponseObject<any>;

        if(req.body.user && req.body.user.role != 'SUPER_ADMIN'){
            return res.status(401).send({msg: 'Only Admins can update Events'});
        }
        else{
            try {
                await EventDB.updateEvent(eventId,name, startDate, endDate, status, price);
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Event successfully updated',
                }
            } catch (error) {
                console.log(error);
                return res.status(500).end();
            }
            return res.send(response);
        }

    }

    public static deleteEvent = async(req: AuthenticatedRequest, res: Response) => {
        const eventId = req.params.id;
    
        let response: ResponseObject<any>;

        if(req.body.user && req.body.user.role != 'SUPER_ADMIN'){
            return res.status(401).send({msg: 'Only Admins can update Events'});
        }
        else{
            try {
                await EventDB.deleteEvent(eventId);
                response = {
                    ResponseData: null,
                    ResponseMessage: 'Event successfully deleted',
                }
            } catch (error) {
                console.log(error);
                return res.status(500).end();
            }
            return res.send(response);
        }

    }
}

const CreateEvent = AdminEventController.createEvent;
const UpdateEvent = AdminEventController.updateEvent;
const DeleteEvent = AdminEventController.deleteEvent;

export {
    CreateEvent,
    UpdateEvent,
    DeleteEvent,
}