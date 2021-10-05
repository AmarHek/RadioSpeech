export enum Role {
  Student = "Student",
  Doctor = "Doctor",
  Admin = "Admin"
}

export class User {
  id: number;
  username: string;
  role: Role;
  token?: string;
}
