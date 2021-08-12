import { AuthenticatedRequest, ResponseObject } from "../../../interfaces";
import { Response } from 'express';
import { Encryption } from "../../../utility";
import { UserDB } from "../../../model/user";

class UserController {

    constructor() {

    }

    public static registerUser = async (req: AuthenticatedRequest, res: Response) => {
        const fullName = req.body.fullname;
        const userName = req.body.username;
        const role = 'USER';
        const wallet = 5000;
        const password = Encryption.encryptPassword(req.body.password);

        let insertedID: string;
        let response: ResponseObject<any>;

        try {
            insertedID = await UserDB.insertUser(fullName, userName, role, wallet, password);
            response = {
                ResponseData: `user id : ${insertedID}`,
                ResponseMessage: 'User successfully registered',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);
    }
}

const RegisterUser = UserController.registerUser;

export {
    RegisterUser,
}