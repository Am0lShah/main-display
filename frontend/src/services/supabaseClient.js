// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zinzncigwjiwahcyfwbi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppbnpuY2lnd2ppd2FoY3lmd2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzgyOTAsImV4cCI6MjA2ODk1NDI5MH0.xr3Pe3CM4WOYms9IbrwkEL77Zp8X4ddvSm2XBGaVr0o'

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  storage: {
    // Add storage configuration
  }
})

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error)
  } else {
    console.log('Supabase connected successfully')
  }
}).catch(error => {
  console.error('Failed to connect to Supabase:', error)
})
