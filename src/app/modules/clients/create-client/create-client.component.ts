import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientsService } from './../../../shared/services/clients.service';
import { ProductValidator } from './../../../shared/validators/validator';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent {
  clientForm: FormGroup;

  currentDate = new Date();

  erroMessage: string;

  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,
    private _clientsService: ClientsService,
    private _formBuilder: FormBuilder
  ) {
    this.erroMessage = '';

    this.clientForm = this._formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      startDate: [
        this.currentDate.toISOString().slice(0, 10),
        [
          Validators.required,
          ProductValidator.minDateValidator(this.currentDate),
        ],
      ],
      endDate: [
        this.currentDate.toISOString().slice(0, 10),
        [Validators.required],
      ],
    });
  }

  get name() {
    return this.clientForm.get('name');
  }

  get phone() {
    return this.clientForm.get('phone');
  }

  get email() {
    return this.clientForm.get('email');
  }

  get startDate() {
    return this.clientForm.get('startDate');
  }

  get endDate() {
    return this.clientForm.get('endDate');
  }

  ngOnInit(): void {
    this._valueChangesStartDate();
  }

  private _valueChangesStartDate(): void {
    this.startDate?.valueChanges.subscribe((value) => {
      const startDate = new Date(value);
      const endDate = new Date(this.endDate?.value);

      if (startDate.getTime() > endDate.getTime()) {
        this.endDate?.setValue(startDate.toISOString().slice(0, 10));
      }
    });
  }

  onCreateUser(): void {
    if (this.clientForm.invalid) {
      return;
    }

    this._clientsService.createClient(this.clientForm.value).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.error(error.error.message);
        this.erroMessage = error.error.message;
      },
    });
  }
}
