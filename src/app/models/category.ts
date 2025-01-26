import { AuditBaseEntity } from './AuditBaseEntity';

export class Category extends AuditBaseEntity {
  categoryName: string = '';
  description: string = '';
}
