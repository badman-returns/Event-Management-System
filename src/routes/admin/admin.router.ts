import * as express from "express";
import multer from 'multer';
import { ValidateBasicAuth, LoadAuthorization, ValidateBearerToken, LoadAuthorizedUser } from "../../middleware";
import { LoginByUserIdAndPassword } from "../public/public.controller";
import { CreateEvent, DeleteEvent, UpdateEvent } from "./controller/admin.event.controller";
import { ValidateAddEventData, ValidateDeleteEventData, ValidateUpdateEventData } from "./validator/admin.event.validation";

class AdminRouting {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {

        // Authentication Routes
        this.router.get('/login', [...ValidateBasicAuth, ...LoadAuthorization], LoginByUserIdAndPassword);

        // Event Routes
        this.router.post('/event/add', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, ...ValidateAddEventData], CreateEvent);
        this.router.post('/event/update/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, ...ValidateUpdateEventData], UpdateEvent);
        this.router.delete('/event/delete/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser, ...ValidateDeleteEventData], DeleteEvent);


    }
}

const AdminRouter = new AdminRouting().router;

export {
    AdminRouter
}
