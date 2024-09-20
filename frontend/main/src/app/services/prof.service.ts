import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prof } from '../models/prof.model';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  private baseUrl = 'http://localhost:8080/api/profs';

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    } else {
      console.log('JWT token not found in the local storage');
      return new HttpHeaders();
    }
  }

  getAllProfs(): Observable<Prof[]> {
    return this.http.get<Prof[]>(this.baseUrl, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  getProfById(id: string): Observable<Prof> {
    return this.http.get<Prof>(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  createProf(prof: Prof): Observable<Prof> {
    return this.http.post<Prof>(this.baseUrl, prof, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  updateProf(id: string, prof: Prof): Observable<Prof> {
    return this.http.put<Prof>(`${this.baseUrl}/${id}`, prof, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  deleteProf(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }
}
