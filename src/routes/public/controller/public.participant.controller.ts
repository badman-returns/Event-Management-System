import { AuthenticatedRequest, ResponseObject } from "../../../interfaces";
import { Response } from 'express';
import { UserDB } from "../../../model/user";
import { EventDB } from "../../../model/event";
import { ParticipantDB } from "../../../model/participants";

class ParticipantController {

    constructor() {

    }

    public static viewParticipants = async(req: AuthenticatedRequest, res:Response) => {
        const eventId = req.params.id;
        
        if (req.user.role != 'USER'){
            res.status(401).send({msg: 'Only user with USER roles are allowed.'})
        }

        let response: ResponseObject<any>;
        try {
            let participants = await ParticipantDB.viewParticipant(eventId);
            response={
                ResponseData: participants,
                ResponseMessage: 'Participants list fetched.',
            }
            return res.send(response);
        } catch (error) {
            res.status(500).end();
        }
    }

    public static joinEvent = async (req: AuthenticatedRequest, res: Response) => {
        const eventId = req.params.id;
        const userId = req.user.id;
        const fullName = req.user.fullname;
        const userCoins = Number(req.user.wallet);

        if (req.user.role != 'USER'){
            res.status(401).send({msg: 'Only user with USER roles are allowed.'})
        }
      
        let insertedID: string;
        let response: ResponseObject<any>;
        try {

            let event = await EventDB.getEventById(eventId);
            let eventPrice = Number(event.price);

            if (userCoins >= eventPrice) {
                let remainingUserCoins = userCoins - eventPrice;
                try{
                    await UserDB.updateUserWallet(userId, remainingUserCoins);
                    insertedID = await ParticipantDB.createParticipant(eventId, userId, fullName);
                    response = {
                        ResponseData: `Participant id : ${insertedID}`,
                        ResponseMessage: 'Participant successfully registered',
                    }
                    return res.send(response);
                }
                catch(error){
                    return res.status(500).end();
                }
            }
            else{
                return res.status(400).send({msg: 'Insufficient coins'})
            }
            
        }
        catch (error) {
            return res.status(500).end();
        }
    }
}

const JoinEvent = ParticipantController.joinEvent;
const ViewParticipants = ParticipantController.viewParticipants;

export {
    JoinEvent,
    ViewParticipants,
}