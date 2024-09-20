import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PaymentResponse } from 'src/app/shared/models/payment-response.model';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-paymen-modal',
  templateUrl: './paymen-modal.component.html',
  styleUrls: ['./paymen-modal.component.css'],
})
export class PaymenModalComponent {
  payment: PaymentResponse | null = null;

  constructor(
    public dialogRef: MatDialogRef<PaymenModalComponent>,
    private _paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this._getPaymentData();
  }

  private _getPaymentData(): void {
    this._paymentService
      .getPaymentData()
      .subscribe((response: PaymentResponse) => {
        // console.log(response);
        this.payment = response;

        // console.log('Payment URL:', response.payUrl);
        // window.location.href = response.payUrl; // Redirige al usuario a la URL de pago de PayU
      });
  }
}
