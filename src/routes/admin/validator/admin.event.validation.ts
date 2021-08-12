import { checkSchema } from "express-validator";
import { UserDB } from "../../../model/user";
import { ValidationResponder } from "../../../middleware";
import { AuthenticatedRequest } from "../../../interfaces";
import { NextFunction, Response } from "express";

class AdminEventValidation {
    constructor() {

    }

    public static validateAddEventData() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Event Name is missing',
                    custom: {
                        options: (name: string) => {
                            return new Promise((resolve, reject) => {
                                if (name == undefined || null) {
                                    reject(false);
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        },
                        errorMessage: 'Event Name is not defined',
                    }
                },
                startDate: {
                    in: ['body'],
                    isDate: true,
                    exists: true,
                    errorMessage: 'Start Date is missing',
                },
                endDate: {
                    in: ['body'],
                    isDate: true,
                    exists: true,
                    errorMessage: 'End Date is missing',
                },
                price: {
                    in: ['body'],
                    isNumeric: true,
                    isDecimal: true,
                    errorMessage: 'Price is missing',
                }
               
            }),
            ValidationResponder.fieldValidationResponder(),
        ];
    }
    public static validateUpdateEventData() {
        return [
            ...checkSchema({
                name: {
                    in: ['body'],
                    isString: true,
                    exists: true,
                    errorMessage: 'Event Name is missing',
                    custom: {
                        options: (name: string) => {
                            return new Promise((resolve, reject) => {
                                if (name == undefined || null) {
                                    reject(false);
                                }
                                else {
                                    resolve(true);
                                }
                            });
                        },
                        errorMessage: 'Event Name is not defined',
                    }
                },
                startDate: {
                    in: ['body'],
                    isDate: true,
                    exists: true,
                    errorMessage: 'Start Date is missing',
                },
                endDate: {
                    in: ['body'],
                    isDate: true,
                    exists: true,
                    errorMessage: 'End Date is missing',
                },
                price: {
                    in: ['body'],
                    isNumeric: true,
                    isDecimal: true,
                    errorMessage: 'Price is missing',
                },
                status: {
                    in: ['body'],
                    isBoolean: true,
                    errorMessage: 'Status is missing',
                }
               
            }),
            ValidationResponder.fieldValidationResponder(),
        ];
    }

    public static validateDeleteEventData(){
        return [
            ...checkSchema({
                id: {
                    in: ['params'],
                    exists: true,
                    errorMessage: 'Id is missing',
                }
            })
        ]
    }
}

const ValidateAddEventData = AdminEventValidation.validateAddEventData();
const ValidateUpdateEventData = AdminEventValidation.validateUpdateEventData();
const ValidateDeleteEventData = AdminEventValidation.validateDeleteEventData();

export {
    ValidateAddEventData,
    ValidateUpdateEventData,
    ValidateDeleteEventData,
}