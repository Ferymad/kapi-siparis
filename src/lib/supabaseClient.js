import { createClient } from '@supabase/supabase-js'

let supabase

try {
  const supabaseUrl = "https://gxtxlsarqcyrngcsflgs.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dHhsc2FycWN5cm5nY3NmbGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMzkwMjMsImV4cCI6MjA0MzcxNTAyM30.UGtPU8iLRXKhfgDSTgE853sGmaWH-n3TRiX4hdlZI2E"

  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Anon Key:', supabaseAnonKey)

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is missing')
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('Supabase client created successfully')
} catch (error) {
  console.error('Error initializing Supabase client:', error)
}

export { supabase }