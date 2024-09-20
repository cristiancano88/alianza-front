import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CsvService } from 'src/app/shared/services/csv.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { CreateClientComponent } from '../create-client/create-client.component';
import { PaymenModalComponent } from '../paymen-modal/paymen-modal.component';
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

  paymentRequest = {
    referenceCode: 'PRODUCT123',
    description: 'Sample Product',
    amount: '100.00',
    buyerEmail: 'buyer@example.com',
  };

  constructor(
    private _clientsService: ClientsService,
    private dialog: MatDialog,
    private _csvService: CsvService,
    private _paymentService: PaymentService
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
    const csvData = this._csvService.convertToCSV(this.clients, headers);
    this._csvService.downloadCSV(csvData, 'clients.csv');
  }

  initiatePayment() {
    const dialogRef = this.dialog.open(PaymenModalComponent, {
      width: '500px',
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('se cerro el modal de payment');
    });
    // this._paymentService.initiatePayment(this.paymentRequest).subscribe({
    //   next: (response) => {
    //     console.log('Payment URL:', response.payUrl);
    //     window.location.href = response.payUrl; // Redirige al usuario a la URL de pago de PayU
    //   },
    //   error: (error) => {
    //     console.error('Payment Error:', error);
    //   },
    // });
  }
}
