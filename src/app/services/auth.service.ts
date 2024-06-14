import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_KEY = 'user';
  private secretKey = 'mi-clave-secreta';

  constructor() { }

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
