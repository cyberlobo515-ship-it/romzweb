const SUPABASE_URL = 'https://nqfamcosztmvieulwzhf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GiNUQ9hbxE12nK4gzmMZ8A_pPy6pbR7'; // To'liq nusxalangan kalitni qo'ying

const { createClient } = window.supabase;
const supa = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DB = {
    // ... (oldingi xabarda berilgan to'liq DB kodi) ...
};