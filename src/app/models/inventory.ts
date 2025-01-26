import { AuditBaseEntity } from './AuditBaseEntity';

export class Inventory extends AuditBaseEntity {
  warehouseId: number = 0;
  productId: number = 0;
  stockQuantity: number = 0;
}
