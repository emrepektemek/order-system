import { AuditBaseEntity } from './auditBaseEntity';

export class Customer extends AuditBaseEntity {
  customerName: string = '';
  address: string = '';
  phoneNumber: string = '';
  email: string = '';
}
