import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_KEY = 'user';
  private readonly LOGGED_IN = 'logged';

  usuario: Usuario | null = null;

  constructor() 
  {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.usuario = storedUser ? JSON.parse(storedUser) : null;
  }

  register(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  login(correo: string, password: string): boolean {
    const storedUser = localStorage.getItem(this.USER_KEY);
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.correo === correo && user.password === password) {
        localStorage.setItem(this.LOGGED_IN, 'S');
        this.usuario = user;
        return true;
      }
    }
    return false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_IN) == 'S';
  }

  deleteUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  logout(): void {
    localStorage.setItem(this.LOGGED_IN, 'N');
  }
}
