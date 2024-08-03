import { Component, EventEmitter, Output } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-advance-search-client',
  templateUrl: './advance-search-client.component.html',
  styleUrls: ['./advance-search-client.component.css'],
})
export class AdvanceSearchClientComponent {
  @Output()
  foundClients: EventEmitter<Client[]> = new EventEmitter();

  name: string = '';
  phone: string = '';
  email: string = '';

  constructor(private _clientsService: ClientsService) {}

  onAdvanceSearchClients(): void {
    this._clientsService
      .advanceSearch(this.name, this.phone, this.email)
      .subscribe((clients: Client[]) => {
        this.foundClients.emit(clients);
      });
  }
}
