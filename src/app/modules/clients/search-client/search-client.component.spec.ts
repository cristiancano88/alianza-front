import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { clientMock } from './../../../../test/mocks/client.mock';
import { clientsServiceMock } from './../../../../test/services/clients.service.mock';
import { ClientsService } from './../../../shared/services/clients.service';
import { SearchClientComponent } from './search-client.component';

describe('SearchClientComponent', () => {
  let component: SearchClientComponent;
  let fixture: ComponentFixture<SearchClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchClientComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{ provide: ClientsService, useValue: clientsServiceMock }],
    });

    fixture = TestBed.createComponent(SearchClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit found clients when searchClientBySharedKey is called', () => {
    jest.spyOn<any, string>(component.foundClients, 'emit');
    component.searchTerm = 'test';
    component.searchClientBySharedKey();

    expect(
      component['_clientsService'].searchClientBySharedKey
    ).toHaveBeenCalledWith('test');
    expect(component.foundClients.emit).toHaveBeenCalledWith([clientMock]);
  });

  it('should not emit when no clients are found', () => {
    jest
      .spyOn<any, string>(
        component['_clientsService'],
        'searchClientBySharedKey'
      )
      .mockReturnValue(of([]));

    jest.spyOn(component.foundClients, 'emit');
    component.searchTerm = 'nonexistent';
    component.searchClientBySharedKey();

    expect(
      component['_clientsService'].searchClientBySharedKey
    ).toHaveBeenCalledWith('nonexistent');
    expect(component.foundClients.emit).toHaveBeenCalledWith([]);
  });

  it('should handle empty search term', () => {
    jest
      .spyOn<any, string>(
        component['_clientsService'],
        'searchClientBySharedKey'
      )
      .mockReturnValue(of([]));

    jest.spyOn(component.foundClients, 'emit');
    component.searchTerm = '';
    component.searchClientBySharedKey();

    expect(
      component['_clientsService'].searchClientBySharedKey
    ).toHaveBeenCalledWith('');
    expect(component.foundClients.emit).toHaveBeenCalledWith([]);
  });
});
