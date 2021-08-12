import { checkSchema } from "express-validator";
import { UserDB } from "../../../model/user";
import { ValidationResponder } from "../../../middleware";
import { EventDB } from "../../../model/event";

class ParticipantValidator {
    constructor() {

    }

    public static validateParticipantsData() {
        return [
            ...checkSchema({
                id: {
                    in:['params'],
                    exists: true,
                    isString: true,
                    custom: {
                        options: (id: string) => {
                            return new Promise(async(resolve, reject) => {
                                let response = await EventDB.getEventById(id);
                                if(response != null || undefined){
                                    resolve(true);
                                }
                                else{
                                   reject(false);
                                }
                            });
                        },
                        errorMessage: 'Event does not exists.'
                    },
                    errorMessage: 'Event id is missing',
                }
            }),
            ValidationResponder.fieldValidationResponder(),
        ];
    }
}

const ValidateParticipantsData = ParticipantValidator.validateParticipantsData();

export {
    ValidateParticipantsData,
}