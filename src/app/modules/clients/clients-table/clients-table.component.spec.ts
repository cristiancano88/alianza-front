import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { SearchClientComponent } from '../search-client/search-client.component';
import { clientMock } from './../../../../test/mocks/client.mock';
import { clientsServiceMock } from './../../../../test/services/clients.service.mock';
import { ClientsService } from './../../../shared/services/clients.service';
import { CreateClientComponent } from './../create-client/create-client.component';
import { ClientsTableComponent } from './clients-table.component';

describe('ClientsTableComponent', () => {
  let component: ClientsTableComponent;
  let fixture: ComponentFixture<ClientsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsTableComponent, SearchClientComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: ClientsService, useValue: clientsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call _getClients on ngOnInit', () => {
    jest.spyOn<any, string>(component, '_getClients');
    component.ngOnInit();
    expect((component as any)._getClients).toHaveBeenCalled();
  });

  it('should fetch clients on _getClients', () => {
    jest
      .spyOn<any, string>(component['_clientsService'], 'getClients')
      .mockReturnValue(of([clientMock]));

    expect(component['_clientsService'].getClients).toHaveBeenCalled();
    expect(component.clients).toEqual([clientMock]);
  });

  it('should update clients when foundClients is called', () => {
    component.foundClients([clientMock]);
    expect(component.clients).toEqual([clientMock]);
  });

  it('should open dialog when openDialog is called', () => {
    jest.spyOn<any, string>(component['dialog'], 'open');
    component.openDialog();
    expect(component['dialog'].open).toHaveBeenCalledWith(
      CreateClientComponent,
      {
        width: '500px',
        data: { name: '' },
      }
    );
  });
});
