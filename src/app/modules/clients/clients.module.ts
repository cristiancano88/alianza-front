import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { SearchClientComponent } from './search-client/search-client.component';
import { AdvanceSearchClientComponent } from './advance-search-client/advance-search-client.component';
import { PaymenModalComponent } from './paymen-modal/paymen-modal.component';

@NgModule({
  declarations: [
    ClientsTableComponent,
    SearchClientComponent,
    CreateClientComponent,
    AdvanceSearchClientComponent,
    PaymenModalComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class ClientsModule {}
