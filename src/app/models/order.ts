import { AuditBaseEntity } from './AuditBaseEntity';

export class Order extends AuditBaseEntity {
  customerId: number = 0;
  productId: number = 0;
  orderDate: Date = new Date();
  shipDate: Date = new Date();
  shippingAddress: string = '';
}
