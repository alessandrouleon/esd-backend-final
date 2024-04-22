import { randomUUID as uuid } from "crypto";

export class ShiftEntity {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    constructor(props: Omit<ShiftEntity, 'id'>, id?: string) {
        Object.assign(this, props);
        this.id = id ?? uuid();
    }
}