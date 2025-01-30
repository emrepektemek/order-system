export abstract class OrderReportModel {
  orderId: number = 0;

  customerName: string = '';

  productName: string = '';

  customerAddress: string = '';

  customerPhoneNumber: string = '';

  customerEmail: string = '';

  orderDate: Date = new Date();

  shipDate: Date = new Date();

  orderStatus: boolean = true;
}
