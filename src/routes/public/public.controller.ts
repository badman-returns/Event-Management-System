import { Encryption } from "../../utility";
import { Response } from "express";
import { AuthenticatedRequest, User } from "../../interfaces";
import { UserDB } from "../../model/user";

class PublicController {
    constructor() {

    }

    public static loginByUserIdAndPassword = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const buff = Buffer.from(req.token, 'base64');
            const credential = buff.toString().split(':');
            if (credential.length != 2) {
                return res.status(400).send();
            }
            const username = credential[0];
            const password = credential[1];
            if (!username || !password) {
                return res.status(400).send();
            }

            const user: User = await UserDB.getUserByUsername(username);

            if (!user) {
                res.status(403).send({
                    Message: `You don't have any account with us`,
                    Data: null,
                });
            } else if (user && !Encryption.decryptPassword(password, user.password)) {
                res.status(401).send({
                    Message: `Incorrect password`,
                    Data: null,
                });
            } else {
                delete user.password;
                delete user.createdOn;
                let token: any;
                try{
                    token = await Encryption.createToken(user);
                } catch(err){
                    return res.status(500).end();
                }
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', token);
                res.send(user);
            }
        } catch(error){
            console.log(error);
            return res.status(500).end();
        }
    }
}

const LoginByUserIdAndPassword = PublicController.loginByUserIdAndPassword;

export {
    LoginByUserIdAndPassword,
}
