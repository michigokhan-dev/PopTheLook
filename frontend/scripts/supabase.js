
const SUPABASE_URL = "https://imkkafqtlvuzloalcfvk.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_aetzVolyZMx-vTdoaZ9zXw_OtEefK-N";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

