import { IsString, Matches } from "class-validator";
import { ShiftMessageHelper } from "src/utils/message.helps";

export class CreateShiftDto {
    id?: string;

    @IsString()
    @Matches(/\S/, { message: ShiftMessageHelper.EMPTY_NAME })
    name: string;

    updatedAt?: Date;
    deletedAt?: Date;
}