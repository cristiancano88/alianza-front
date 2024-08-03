import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';
import { CreateClientComponent } from '../create-client/create-client.component';
import { ClientsService } from './../../../shared/services/clients.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
  private _takeUntil$ = new Subject<boolean>();

  clients: Client[] = [];

  constructor(
    private _clientsService: ClientsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getClients();
  }

  private _getClients(): void {
    this._clientsService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  foundClients(clients: Client[]): void {
    this.clients = clients;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateClientComponent, {
      width: '500px',
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this._getClients();
      // this.animal = result;
    });
  }
}
