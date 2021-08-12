import { checkSchema } from "express-validator";
import { UserDB } from "../../../model/user";
import { ValidationResponder } from "../../../middleware";

class RegisterValidator {
    constructor() {

    }

    public static validateRegistrationData() {
        return [
            ...checkSchema({
                fullname: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Full Name is missing',
                    custom: {
                        options: (fullname: string) => {
                            return new Promise((resolve, reject) => {
                                if (fullname == undefined || null) {
                                    reject(false);
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        },
                        errorMessage: 'Full Name is not defined',
                    }
                },
                username: {
                    in: ['body'],
                    exists: true,
                    errorMessage: 'Username is missing',
                    custom: {
                        options: (username: string) => {
                            return new Promise(async (resolve, reject) => {
                                if (username && username != undefined || null) {
                                    const userData = await UserDB.getUserByUsername(username);
                                    if (userData != null) {
                                        return reject(false);
                                    }
                                    else {
                                        return resolve(true);
                                    }
                                }
                                else {
                                    return reject(false);
                                }
                            });
                        },
                        errorMessage: 'Username already exists.',
                    },
                },
                password: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    custom: {
                        options: (password: string) => {
                            return new Promise((resolve, reject) => {
                                let regix = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{6,}$/);

                                if (regix.test(password) == false){
                                    reject(false);                                
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        },
                        errorMessage: 'Password must be alphanumeric with min of 6 charecters. Min one uppercase, one lowecase, one digit and one symbbol is required.'
                    },
                    errorMessage: 'Password is missing',
                },
            }),
            ValidationResponder.fieldValidationResponder(),
        ];
    }
}

const ValidateRegistrationData = RegisterValidator.validateRegistrationData();

export {
    ValidateRegistrationData,
}