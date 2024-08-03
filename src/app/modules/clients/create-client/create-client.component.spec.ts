import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { clientMock } from './../../../../test/mocks/client.mock';
import { clientsServiceMock } from './../../../../test/services/clients.service.mock';
import { ClientsService } from './../../../shared/services/clients.service';
import { CreateClientComponent } from './create-client.component';

describe('CreateClientComponent', () => {
  let component: CreateClientComponent;
  let fixture: ComponentFixture<CreateClientComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClientComponent],
      imports: [ReactiveFormsModule, FormsModule, MatDialogModule],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: ClientsService, useValue: clientsServiceMock },
      ],
    });

    fixture = TestBed.createComponent(CreateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder);
  });

  describe('endDate getter', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should return the endDate form control', () => {
      const endDateControl = component.clientForm.get('endDate');
      expect(component.endDate).toBe(endDateControl);
    });

    it('should return null if endDate control does not exist', () => {
      component.clientForm = formBuilder.group({});
      expect(component.endDate).toBeNull();
    });

    it('should update when endDate value changes', () => {
      const newDate = '2023-12-31';
      component.clientForm.patchValue({ endDate: newDate });
      expect(component.endDate?.value).toBe(newDate);
    });

    describe('#onCreateProduct', () => {
      it('should not create product if the form is invalid', () => {
        component.clientForm.get('id')?.setValue('11');
        component.onCreateUser();

        expect(
          component['_clientsService'].createClient
        ).not.toHaveBeenCalledWith(clientMock);
      });

      it('should create product', () => {
        component.clientForm.get('name')?.setValue(clientMock.name);
        component.clientForm.get('phone')?.setValue(clientMock.phone);
        component.clientForm.get('email')?.setValue(clientMock.email);
        component.clientForm.get('startDate')?.setValue('10/12/2024');
        component.clientForm.get('endDate')?.setValue('11/12/2024');

        component.onCreateUser();

        expect(component['_clientsService'].createClient).toHaveBeenCalledWith(
          component.clientForm.value
        );
      });
    });
  });
});
