import { AuditBaseEntity } from './AuditBaseEntity';

export class Warehouse extends AuditBaseEntity {
  warehouseName: string = '';
  location: string = '';
  capacity: number = 0;
}
