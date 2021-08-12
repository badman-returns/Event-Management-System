import * as express from "express";
import { ValidateBasicAuth, LoadAuthorization, ValidateBearerToken, LoadAuthorizedUser } from "../../middleware";
import { JoinEvent, ViewParticipants } from "./controller/public.participant.controller";
import {  RegisterUser } from "./controller/public.user.controller";
import { LoginByUserIdAndPassword } from "./public.controller";
import { ValidateRegistrationData } from "./validator/publi.register.validation";
class PublicRouting {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {
        // Employee Routes
        this.router.post('/register', [...ValidateRegistrationData], RegisterUser);
        this.router.get('/login', [...ValidateBasicAuth, ...LoadAuthorization], LoginByUserIdAndPassword);

        // Join Event Routes
        this.router.post('/event/join/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], JoinEvent);
        this.router.get('/event/view-participants/:id', [...ValidateBearerToken, ...LoadAuthorization, ...LoadAuthorizedUser], ViewParticipants);
    }
}

const PublicRouter = new PublicRouting().router;

export {
    PublicRouter,
}