import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GetEmployeeImageService {
  //usando no create employee
  async getSingleFile(file: string) {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });
    const { data } = await supabase.storage.from('esd-employee-file').list();
    return data.find((item) => item.id === file);
  }

  // async getFile(file: string) {
  //   const supabaseURL = process.env.SUPABASE_URL;
  //   const supabaseKEY = process.env.SUPABASE_KEY;

  //   const supabase = createClient(supabaseURL, supabaseKEY, {
  //     auth: {
  //       persistSession: false,
  //     },
  //   });

  //   try {
  //     // Gerar token assinado para acesso à imagem
  //     const signedURL = await supabase.storage
  //       .from('esd-employee-file')
  //       .createSignedUrl(file, 60); // Defina o tempo de validade do token em segundos (aqui, 60 segundos)

  //     //   if (tokenError) {
  //     //     throw new Error(`Error generating signed URL: ${tokenError.message}`);
  //     //   }

  //     return { signedURL, fullPath: `esd-employee-file/${file}` };
  //   } catch (error) {
  //     throw new Error(`An error occurred: ${error.message}`);
  //   }
  //}
}
