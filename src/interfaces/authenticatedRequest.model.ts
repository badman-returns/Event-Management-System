import { Request } from 'express';
import { User } from './user.model';

interface AuthenticatedRequest extends Request {
    token: string,
    user: User,
}

export { AuthenticatedRequest }