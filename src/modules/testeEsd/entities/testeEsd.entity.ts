import { randomUUID as uuid } from 'crypto';

export class TesteEsdEntity {
  id: string;
  employeeId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: Omit<TesteEsdEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
