
/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://potpqvvbfuaqawlemfik.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvdHBxdnZiZnVhcWF3bGVtZmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDI3ODEsImV4cCI6MjA5MDAxODc4MX0.DxN080OSf39acg0pnc8GB6Z1axvBBlWig9zkESwxvgsv';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
