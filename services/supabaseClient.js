import { createClient } from '@supabase/supabase-js'

// Cree un único cliente de supabase para interactuar con su base de datos
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
)

