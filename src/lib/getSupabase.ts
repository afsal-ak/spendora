import { supabase } from "./supabase";

export function getSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured"
    );
  }

  return supabase;
}