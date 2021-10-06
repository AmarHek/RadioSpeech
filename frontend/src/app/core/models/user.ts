export enum Role {
  User = "user",
  Moderator = "moderator",
  Admin = "admin"
}

export class User {
  id: number;
  username: string;
  role: Role;
  token?: string;
}
