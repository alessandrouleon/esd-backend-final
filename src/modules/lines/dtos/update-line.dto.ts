import { CreateLineDto } from './create-line.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateLineDto extends PartialType(CreateLineDto) {}
