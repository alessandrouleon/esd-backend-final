import { CreateShiftDto } from './create-shift.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateShiftDto extends PartialType(CreateShiftDto) {}
