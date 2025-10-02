import dotenv from 'dotenv';
dotenv.config();

// Dummy supabase client untuk development
class DummySupabase {
  async from(table: string) {
    return { select: async () => ({ data: [], error: null }) };
  }
}

export const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_KEY
  ? require('@supabase/supabase-js').createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  : new DummySupabase();

console.log('Supabase initialized (real or dummy)');
