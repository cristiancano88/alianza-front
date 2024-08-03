import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CsvService } from 'src/app/shared/services/csv.service';
import { CreateClientComponent } from '../create-client/create-client.component';
import { Client } from './../../../shared/models/client.model';
import { ClientsService } from './../../../shared/services/clients.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements OnInit {
  clients: Client[] = [];

  showAdvanceSearch: boolean = false;

  constructor(
    private _clientsService: ClientsService,
    private dialog: MatDialog,
    private csvService: CsvService
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
      this._getClients();
    });
  }

  toggleAdvanceSearch(): void {
    this.showAdvanceSearch = !this.showAdvanceSearch;
  }

  exportToCSV() {
    const headers = ['sharedKey', 'name', 'email', 'phone', 'dataAdded'];
    const csvData = this.csvService.convertToCSV(this.clients, headers);
    this.csvService.downloadCSV(csvData, 'clients.csv');
  }
}
