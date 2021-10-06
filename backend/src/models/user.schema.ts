import mongoose, {Schema, Document} from 'mongoose';

export enum Role {
  User = "user",
  Moderator = "moderator",
  Admin = "admin"
}

export interface User extends Document {
  username: string;
  password: string;
  role: Role;
}

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  role: { type: Role,
          enum: ["user", "moderator", "admin"],
          default: 'user'}
})

export default mongoose.model<User>('User', userSchema, "users");
