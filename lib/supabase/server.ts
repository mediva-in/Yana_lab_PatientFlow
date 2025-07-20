import { createClient } from "@supabase/supabase-js"

// Create a single Supabase client for server-side operations
// This client uses environment variables that are not exposed to the client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
}

export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey)
