import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ENVIRONMENT } from 'src/infrastructure/constants/environment';

@Injectable()
export class GetEmployeeImageService {
  private supabase: SupabaseClient;
  private urlCache: Map<string, { url: string; expiry: number }>;
  private idCache: Map<string, any[]>;

  constructor() {
    this.supabase = createClient(
      ENVIRONMENT.supabaseURL,
      ENVIRONMENT.supabaseKEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );
    this.urlCache = new Map();
    this.idCache = new Map();
  }

  // Pesquisa imagem se a imagem existe
  async getSingleFile(file: string) {
    const { data, error } = await this.supabase.storage
      .from('esd-employee-file')
      .list();

    if (error) {
      throw new Error(`Error listing files: ${error.message}`);
    }
    return data.find((item) => item.id === file);
  }
  // Pesquisa imagen e gera o token caso existe.
  async getFile(file: string) {
    const now = Date.now();

    if (this.urlCache.has(file)) {
      const cached = this.urlCache.get(file);
      if (cached && cached.expiry > now) {
        return cached.url;
      }
    }

    try {
      const { data, error } = await this.supabase.storage
        .from('esd-employee-file')
        .createSignedUrl(file, 86400);

      if (error) {
        throw new Error(`An error occurred: ${error.message}`);
      }

      this.urlCache.set(file, {
        url: data.signedUrl,
        expiry: now + 86400 * 1000,
      });

      return data.signedUrl;
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }

  // Pesquisa todas as imagens
  async listFiles() {
    try {
      const { data, error } = await this.supabase.storage
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

  // Pesquisa imagem por id
  async findBySupabaseImageId(id: string) {
    // Verifica se o resultado está no cache
    if (this.idCache.has(id)) {
      return this.idCache.get(id);
    }

    try {
      const { data, error } = await this.supabase.storage
        .from('esd-employee-file')
        .list('', {
          limit: 100,
          offset: 0,
        });

      if (error) {
        throw new Error(`Error listing files: ${error.message}`);
      }

      const filteredData = data?.filter((file) => file.id === id);

      // Salva o resultado no cache
      this.idCache.set(id, filteredData);

      return filteredData;
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
}
