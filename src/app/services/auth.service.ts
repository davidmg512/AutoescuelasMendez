import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_KEY = 'user';
  private readonly LOGGED_IN = 'logged';
  private secretKey = 'mi-clave-secreta';

  usuario: Usuario | null = null;

  constructor() 
  {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.usuario = storedUser ? this.decryptData(storedUser) : null;
  }

  register(user: any): void {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
    //localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.USER_KEY, encryptedData);
  }

  decryptData(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  login(correo: string, password: string): boolean {
    const storedUser = localStorage.getItem(this.USER_KEY);
    
    if (storedUser) {
      const user = this.decryptData(storedUser);
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
