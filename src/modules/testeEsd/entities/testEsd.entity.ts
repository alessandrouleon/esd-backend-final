import { randomUUID as uuid } from 'crypto';

export class TestEsdEntity {
  id: string;
  boot?: string;
  bracelete?: string;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: Omit<TestEsdEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
