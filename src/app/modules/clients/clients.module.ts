import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsTableComponent } from './clients-table/clients-table.component';

@NgModule({
  declarations: [ClientsTableComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ClientsModule {}
