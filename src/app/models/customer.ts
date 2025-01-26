import { AuditBaseEntity } from './AuditBaseEntity';

export class Customer extends AuditBaseEntity {
  customerName: string = '';
  address: string = '';
  phoneNumber: string = '';
  email: string = '';
}
