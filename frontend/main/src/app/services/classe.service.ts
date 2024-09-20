import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../models/classe.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private apiUrl = 'http://localhost:8080/api/classes';

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

  getAllClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.apiUrl, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  getClasseById(id: string): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  createClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(this.apiUrl, classe, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  updateClasse(id: string, classe: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/${id}`, classe, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }

  deleteClasse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthorizationHeader(),
      responseType: 'json'
    });
  }
}
