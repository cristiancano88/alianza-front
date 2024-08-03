import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private clientsUrl = environment.clientsUrl;

  constructor(private _http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this._http.get<Client[]>(`${this.clientsUrl}/clients`);
  }

  createClient(client: Client): Observable<Client> {
    return this._http.post<Client>(`${this.clientsUrl}/clients`, client);
  }

  searchClientBySharedKey(term: string): Observable<Client[]> {
    let params = new HttpParams().set('term', term);
    return this._http.get<Client[]>(`${this.clientsUrl}/clients/search`, {
      params,
    });
  }
}
