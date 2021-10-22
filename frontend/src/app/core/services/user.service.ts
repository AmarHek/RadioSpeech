import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { User } from "@app/models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.backend}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.backend}/users/${id}`);
  }
}
