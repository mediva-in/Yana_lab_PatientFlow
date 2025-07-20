#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mheulppbtdgsfreyijzt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZXVscHBidGRnc2ZyZXlpanp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMjE2OTcsImV4cCI6MjA2ODU5NzY5N30.i7dKxu8BTDUrLMGIVoXQpqVThG9mgnznt0-6QcxgoCs

# Next.js Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mheulppbtdgsfreyijzt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZXVscHBidGRnc2ZyZXlpanp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMjE2OTcsImV4cCI6MjA2ODU5NzY5N30.i7dKxu8BTDUrLMGIVoXQpqVThG9mgnznt0-6QcxgoCs
`

const envPath = path.join(process.cwd(), '.env.local')

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Skipping creation.')
  } else {
    fs.writeFileSync(envPath, envContent)
    console.log('✅ Created .env.local with Supabase configuration')
  }
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message)
  process.exit(1)
}

console.log('\n📋 Next steps:')
console.log('1. Run the database setup SQL in your Supabase dashboard')
console.log('2. Install dependencies: pnpm install')
console.log('3. Start the development server: pnpm dev')
console.log('4. Visit http://localhost:3000 to test the application')
console.log('5. Visit http://localhost:3000/admin to view bookings') 