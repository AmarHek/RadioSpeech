import UserSchema, {User} from '../models/user.schema';
import { Request, Response, NextFunction } from 'express';
import 'bcrypt';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    UserSchema.findOne({username: req.body.username}).then(user => {

    })
}
