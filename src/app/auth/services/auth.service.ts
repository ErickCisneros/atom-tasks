import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_API = environment.BASE_API;
  private httpClient = inject(HttpClient);

  getUser$(email: string) {
    return this.httpClient.get<User>(`${this.BASE_API}/users/${email}`);
  }

  postUser$(user: User) {
    return this.httpClient.post<User>(`${this.BASE_API}/users`, user);
  }
}
