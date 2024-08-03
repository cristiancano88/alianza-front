import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { ClientsService } from './../../../shared/services/clients.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
  private _takeUntil$ = new Subject<boolean>();

  clients: Client[] = [];

  constructor(private _clientsService: ClientsService) {}

  ngOnInit(): void {
    this._clientsService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }
}
