import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeFileDto } from 'src/modules/employees/dtos/employee-file.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadEmployeeImageService {
  async uploadEmployeeImage(file: EmployeeFileDto) {
    if (!file)
      throw new HttpException(
        'Arquivo não encontrado.',
        HttpStatus.BAD_REQUEST,
      );

    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      throw new HttpException(
        'Apenas arquivos de tipo imagem são permitidos!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    // Verificar se o arquivo já existe
    // const findAllFiles = await supabase.storage
    //   .from('esd-employee-file')
    //   .list();
    // const existingFiles = findAllFiles.data || [];
    // const existingFile = existingFiles.find(
    //   (item: any) => item.name === file.originalname,
    // );

    // if (existingFile) {
    //   throw new HttpException(
    //     'Já existe um arquivo com este nome!',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const data = await supabase.storage
      .from('esd-employee-file')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });
    return data;
  }
}
