import { of } from 'rxjs';
import { clientMock } from '../mocks/client.mock';

export const clientsServiceMock = {
  getClients: jest.fn().mockReturnValue(of([clientMock])),

  createClient: jest.fn().mockReturnValue(of(clientMock)),

  searchClientBySharedKey: jest.fn().mockReturnValue(of([clientMock])),
};
