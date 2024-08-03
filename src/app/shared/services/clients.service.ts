import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  // private clientsUrl = '/api';
  private clientsUrl = environment.clientsUrl;

  constructor(private _http: HttpClient) {}

  getClients(): Observable<Client[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this._http.get<Client[]>(`${this.clientsUrl}/clients`, { headers });
  }

  createClient(client: Client): Observable<Client> {
    return this._http.post<Client>(`${this.clientsUrl}/clients`, client);
  }
}
