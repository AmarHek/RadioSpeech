import mongoose, {Schema, Document} from 'mongoose';

export enum Role {
  Student = "Student",
  Doctor = "Doctor",
  Admin = "Admin"
}

export interface User extends Document {
  username: string;
  password: string;
  role: Role;
}

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  role: { type: Role }
})

export default mongoose.model<User>('User', userSchema, "users");
