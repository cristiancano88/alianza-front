import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentResponse } from '../models/payment-response.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.clientsUrl;

  constructor(private http: HttpClient) {}

  // initiatePayment(paymentRequest: any): Observable<PaymentResponse> {
  getPaymentData(): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.apiUrl}/payments/payu`);
  }
}
