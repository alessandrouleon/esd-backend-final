import { randomUUID as uuid } from 'crypto';
export class UserEntity {
  id: string;
  username: string;
  password?: string;
  status: string;
  roles: string;
  employeeId?: string;
  updatedAt: Date;
  deletedAt: Date;

  constructor(props: Omit<UserEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
