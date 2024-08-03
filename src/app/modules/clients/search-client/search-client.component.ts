import { Component, EventEmitter, Output } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.css'],
})
export class SearchClientComponent {
  @Output()
  foundClients: EventEmitter<Client[]> = new EventEmitter();

  searchTerm: string = '';

  constructor(private _clientsService: ClientsService) {}

  searchClientBySharedKey(): void {
    this._clientsService
      .searchClientBySharedKey(this.searchTerm)
      .subscribe((clients) => {
        this.foundClients.emit(clients);
      });
  }
}
