export interface PaymentResponse {
  payUrl: string;
  merchantId: string;
  accountId: string;
  description: string;
  referenceCode: string;
  amount: string;
  currency: string;
  tax: string;
  taxReturnBase: string;
  signature: string;
}
