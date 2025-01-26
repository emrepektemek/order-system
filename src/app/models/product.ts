import { AuditBaseEntity } from './AuditBaseEntity';

export class Product extends AuditBaseEntity {
  categoryId: number = 0;
  productName: string = '';
  colorId: number = 0;
  sizeId: number = 0;
  unitPrice: number = 0.0;
  description: string = '';
}
