#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const envContent = `# Mediva Backend API Configuration
NEXT_PUBLIC_MEDIVA_API_URL=http://localhost:8080

# For production, change to your actual Mediva API endpoint
# NEXT_PUBLIC_MEDIVA_API_URL=https://api.mediva.com
`

const envPath = path.join(process.cwd(), '.env.local')

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env.local already exists. Skipping creation.')
  } else {
    fs.writeFileSync(envPath, envContent)
    console.log('✅ Created .env.local with Mediva API configuration')
  }
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message)
  process.exit(1)
}

console.log('\n📋 Next steps:')
console.log('1. Make sure your Mediva backend server is running on http://localhost:8080')
console.log('2. Install dependencies: pnpm install')
console.log('3. Start the development server: pnpm dev')
console.log('4. Visit http://localhost:3000 to test the application')
console.log('5. Visit http://localhost:3000/admin to view bookings') 