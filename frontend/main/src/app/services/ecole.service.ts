import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ecole } from '../models/ecole.model';

@Injectable({
  providedIn: 'root'
})
export class EcoleService {

  private apiUrl = 'http://localhost:8080/api/ecoles';

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

  getAllEcoles(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(`${this.apiUrl}/ecoles`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  getEcoleById(id: String): Observable<Ecole> {
    return this.http.get<Ecole>(`${this.apiUrl}/ecole/${id}`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  createEcole(ecole: Ecole): Observable<Ecole> {
    return this.http.post<Ecole>(`${this.apiUrl}/add`, ecole, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  updateEcole(id: number, ecole: Ecole): Observable<Ecole> {
    return this.http.put<Ecole>(`${this.apiUrl}/update/${id}`, ecole, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  deleteEcole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }
}
