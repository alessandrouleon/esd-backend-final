import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ENVIRONMENT } from 'src/infrastructure/constants/environment';

@Injectable()
export class GetEmployeeImageService {
  //Pesquisa imagem se a imagem existe
  async getSingleFile(file: string) {
    const supabase = createClient(
      ENVIRONMENT.supabaseURL,
      ENVIRONMENT.supabaseKEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );
    const { data } = await supabase.storage.from('esd-employee-file').list();
    return data.find((item) => item.id === file);
  }

  //Pesquisa imagem por nome e retorna o path da imagem com o token
  async getFile(file: string) {
    const supabase = createClient(
      ENVIRONMENT.supabaseURL,
      ENVIRONMENT.supabaseKEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    try {
      const signedURL = await supabase.storage
        .from('esd-employee-file')
        .createSignedUrl(file, 86400);
      return signedURL.data;
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
  //Pesquisa todas as imagem
  async listFiles() {
    const supabase = createClient(
      ENVIRONMENT.supabaseURL,
      ENVIRONMENT.supabaseKEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    try {
      const { data, error } = await supabase.storage
        .from('esd-employee-file')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' },
        });
      if (error) {
        throw new Error(`Error listing files: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
  //Pesquisa imagem por id
  async findBySupabaseImageId(id: string) {
    const supabase = createClient(
      ENVIRONMENT.supabaseURL,
      ENVIRONMENT.supabaseKEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    try {
      const { data, error } = await supabase.storage
        .from('esd-employee-file')
        .list('', {
          limit: 100,
          offset: 0,
        });

      if (error) {
        throw new Error(`Error listing files: ${error.message}`);
      }
      const filteredData = data?.filter((file) => file.id === id);

      return filteredData;
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
}
