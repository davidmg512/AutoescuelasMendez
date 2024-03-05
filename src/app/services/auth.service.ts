import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_KEY = 'user';

  constructor() { }

  register(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  login(correo: string, password: string): boolean {
    const storedUser = localStorage.getItem(this.USER_KEY);
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.correo === correo && user.password === password) {
        return true;
      }
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
