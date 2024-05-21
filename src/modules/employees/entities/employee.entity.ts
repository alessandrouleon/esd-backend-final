import { randomUUID as uuid } from 'crypto';

export class EmployeeEntity {
  id: string;
  name: string;
  registration: string;
  employeeImage?: string;
  boot: string;
  bracelete: string;
  status: string;
  shiftId: string;
  departmentId: string;
  lineId: string;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: Omit<EmployeeEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
