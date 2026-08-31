import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseAccountRow {
  id: number;
  game: string;
  title: string;
  price_sale: number;
  price_original: number;
  rarity: string;
  rank: string;
  image_url: string;
  created_at: string;
}
