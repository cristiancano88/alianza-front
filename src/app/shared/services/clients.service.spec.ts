import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Client } from '../models/client.model';
import { environment } from './../../../environments/environment.prod';
import { clientMock } from './../../../test/mocks/client.mock';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;
  let httpTestingController: HttpTestingController;
  const clientsUrl = environment.clientsUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ClientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get clients', (done) => {
    service.getClients().subscribe((response: Client[]) => {
      expect(response).toStrictEqual([clientMock]);
      done();
    });

    const request = httpTestingController.expectOne(`${clientsUrl}/clients`);
    expect(request.request.method).toEqual('GET');

    request.flush([clientMock]);
  });

  it('should create product', (done) => {
    service.createClient(clientMock).subscribe((response: Client) => {
      expect(response).toStrictEqual(clientMock);
      done();
    });

    const request = httpTestingController.expectOne(`${clientsUrl}/clients`);
    expect(request.request.method).toEqual('POST');

    request.flush(clientMock);
  });

  it('should search clients by shared key', (done) => {
    const mockTerm = 'test';

    service.searchClientBySharedKey(mockTerm).subscribe((clients: Client[]) => {
      expect(clients).toEqual([clientMock]);
      done();
    });

    const req = httpTestingController.expectOne(
      `${clientsUrl}/clients/search?term=${mockTerm}`
    );
    expect(req.request.method).toBe('GET');
    req.flush([clientMock]);
  });
});
