#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🎨 Yana Labs Favicon Generator')
console.log('================================')

console.log('\n📋 Instructions to generate proper favicon files:')
console.log('1. The SVG favicon has been created at: public/favicon.svg')
console.log('2. To generate ICO and PNG files, you can use online tools:')
console.log('   - Convert SVG to ICO: https://convertio.co/svg-ico/')
console.log('   - Convert SVG to PNG: https://convertio.co/svg-png/')
console.log('3. Or use command line tools:')
console.log('   - Install ImageMagick: brew install imagemagick (macOS)')
console.log('   - Convert to ICO: convert public/favicon.svg public/favicon.ico')
console.log('   - Convert to PNG: convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png')

console.log('\n🎯 Favicon Design:')
console.log('- Medical cross symbol representing healthcare')
console.log('- Stethoscope representing diagnostic services')
console.log('- Green color (#10B981) matching Yana Labs brand')
console.log('- Clean, professional design suitable for medical services')

console.log('\n✅ Current setup includes:')
console.log('- SVG favicon (works in modern browsers)')
console.log('- Web app manifest for PWA support')
console.log('- Proper metadata for SEO')
console.log('- Apple touch icon support')

console.log('\n🚀 Your app now has:')
console.log('- Title: "Yana Labs Booking"')
console.log('- Professional medical-themed favicon')
console.log('- PWA-ready configuration') 