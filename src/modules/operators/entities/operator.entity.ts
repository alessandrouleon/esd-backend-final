import { randomUUID as uuid } from 'crypto';

export class OperatorEntity {
  id: string;
  name: string;
  registration: string;
  boot: string;
  bracelete: string;
  status: string;
  shiftId: string;
  departmentId: string;
  lineId: string;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: Omit<OperatorEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
