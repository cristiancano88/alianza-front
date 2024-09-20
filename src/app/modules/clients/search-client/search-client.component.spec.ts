import { Client } from './../../../shared/models/client.model';
import { ClientsService } from './../../../shared/services/clients.service';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SearchClientComponent } from './search-client.component';

// describe('SearchClientComponent', () => {
//   let component: SearchClientComponent;
//   let fixture: ComponentFixture<SearchClientComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [SearchClientComponent]
//     });
//     fixture = TestBed.createComponent(SearchClientComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchClientComponent } from './search-client.component';
// import { ClientsService } from '../clients.service'
import { of } from 'rxjs';

describe('SearchClientComponent', () => {
  let component: SearchClientComponent;
  let fixture: ComponentFixture<SearchClientComponent>;
  let clientsServiceSpy: jasmine.SpyObj<ClientsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ClientsService', [
      'searchClientBySharedKey',
    ]);

    TestBed.configureTestingModule({
      declarations: [SearchClientComponent],
      providers: [{ provide: ClientsService, useValue: spy }],
    });

    fixture = TestBed.createComponent(SearchClientComponent);
    component = fixture.componentInstance;
    clientsServiceSpy = TestBed.inject(
      ClientsService
    ) as jasmine.SpyObj<ClientsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit found clients when searchClientBySharedKey is called', () => {
    const mockClients: Client[] = [
      {
        sharedKey: 'cariza',
        name: 'Carlos Ariza',
        email: 'cariza@gmail.com',
        phone: '12345678',
        dataAdded: '20/05/2024',
      },
    ];
    clientsServiceSpy.searchClientBySharedKey.and.returnValue(of(mockClients));

    spyOn(component.foundClients, 'emit');
    component.searchTerm = 'test';
    component.searchClientBySharedKey();

    expect(clientsServiceSpy.searchClientBySharedKey).toHaveBeenCalledWith(
      'test'
    );
    expect(component.foundClients.emit).toHaveBeenCalledWith(mockClients);
  });

  // it('should not emit when no clients are found', () => {
  //   clientsServiceSpy.searchClientBySharedKey.and.returnValue(of([]));

  //   spyOn(component.foundClients, 'emit');
  //   component.searchTerm = 'nonexistent';
  //   component.searchClientBySharedKey();

  //   expect(clientsServiceSpy.searchClientBySharedKey).toHaveBeenCalledWith(
  //     'nonexistent'
  //   );
  //   expect(component.foundClients.emit).toHaveBeenCalledWith([]);
  // });

  // it('should handle empty search term', () => {
  //   clientsServiceSpy.searchClientBySharedKey.and.returnValue(of([]));

  //   spyOn(component.foundClients, 'emit');
  //   component.searchTerm = '';
  //   component.searchClientBySharedKey();

  //   expect(clientsServiceSpy.searchClientBySharedKey).toHaveBeenCalledWith('');
  //   expect(component.foundClients.emit).toHaveBeenCalledWith([]);
  // });
});
