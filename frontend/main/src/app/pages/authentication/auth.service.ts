import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  userinfo(): Observable<any> {
    const headers = this.createAuthorizationHeader();
    if (headers) {
      return this.http.get(`${this.baseUrl}/user-info`, { headers });
    } else {
      return throwError(() => new Error('JWT token not found in local storage'));
    }
  }

  private createAuthorizationHeader(): HttpHeaders | null {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.error("JWT token not found in local storage");
      return null;
    }
  }


  private email: string | null = null;

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string | null {
    return this.email;
  }

  verifyOtp(email: string, otp: string): Observable<string> {
    const params = new HttpParams()
      .set('email', email)
      .set('otp', otp);

    return this.http.post<string>(`${this.baseUrl}/verify-otp`, null, { params });
  }

  forgotPassword(email: string): Observable<any> {
    const requestBody = { email };
    return this.http.post(`${this.baseUrl}/forgot-password`, requestBody, {
      responseType: 'text', // Since the API returns a string response
    });
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<string> {
    const body = {
      email,
      otp,
      newPassword
    };

    return this.http.post<string>(`${this.baseUrl}/reset-password`, body);
  }
}
