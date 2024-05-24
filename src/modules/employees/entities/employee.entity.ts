import { randomUUID as uuid } from 'crypto';
import { DepartmentEntity } from 'src/modules/departments/entities/department.entity';
import { LineEntity } from 'src/modules/lines/entities/line.entity';
import { ShiftEntity } from 'src/modules/shifts/entities/shift.entity';

export class EmployeeEntity {
  id: string;
  name: string;
  registration: string;
  imageId?: string;
  boot: string;
  bracelete: string;
  status: string;
  shift?: ShiftEntity;
  shiftId: string;
  department?: DepartmentEntity;
  departmentId: string;
  line?: LineEntity;
  lineId: string;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: Omit<EmployeeEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
