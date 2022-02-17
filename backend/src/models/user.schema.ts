import * as mongoose from 'mongoose';
import { Role } from './role.model';

export interface UserDoc extends Document {
    username: string;
    password: string;
    role:     Role;
}

export const UserDB = mongoose.model<UserDoc>(
    "User",
    new mongoose.Schema({
      username: { type: String },
      password: { type: String },
      role: {
          type: String,
          enum: Role,
          default: Role.User
      }
    }),
    "users"
);
