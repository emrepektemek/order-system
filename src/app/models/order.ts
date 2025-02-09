import { AuditBaseEntity } from './auditBaseEntity';

export class Order extends AuditBaseEntity {
  customerId: number = 0;
  productId: number = 0;
  shippingAddress: string = '';
  quantity: number = 0;
}
