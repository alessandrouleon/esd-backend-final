import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeFileDto } from 'src/modules/employees/dtos/employee-file.dto';
import { createClient } from '@supabase/supabase-js';
import { SupabaseValidationMessageHelper } from 'src/utils/message.helps';
import { ENVIRONMENT } from 'src/infrastructure/constants/environment';

@Injectable()
export class UploadEmployeeImageService {
  async uploadEmployeeImage(file: EmployeeFileDto) {
    if (!file)
      throw new HttpException(
        SupabaseValidationMessageHelper.FILE_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );

    if (!file.originalname.match(ENVIRONMENT.regexFileType)) {
      throw new HttpException(
        SupabaseValidationMessageHelper.VALIDATE_FILE_TYPE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const supabase = createClient(
      ENVIRONMENT.supabaseURL,
      ENVIRONMENT.supabaseKEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );
    const data = await supabase.storage
      .from('esd-employee-file')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });
    return data;
  }
}
