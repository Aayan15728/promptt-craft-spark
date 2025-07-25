// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ospavdbdzcalcttqxuvi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcGF2ZGJkemNhbGN0dHF4dXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MzQ0MjEsImV4cCI6MjA2ODQxMDQyMX0.sdZ1S0w3Y1tY_qHcsSBoS7D7NN-LPNSRKq3BeIivn_4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});