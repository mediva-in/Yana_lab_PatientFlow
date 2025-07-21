# Yana Labs Booking System

A modern booking system for medical diagnostic services built with Next.js, TypeScript, and Supabase.

## Features

- Multi-step booking form for new and existing patients
- Real-time form validation 
- Scan selection with search functionality
- Date and time slot selection with availability checking 
- Prevention of double bookings with visual feedback
- Supabase database integration
- Responsive design
- Toast notifications for user feedback 
- Admin panel for booking management
- Professional medical-themed favicon and branding
- PWA-ready configuration

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account and project

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://mheulppbtdgsfreyijzt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZXVscHBidGRnc2ZyZXlpanp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMjE2OTcsImV4cCI6MjA2ODU5NzY5N30.i7dKxu8BTDUrLMGIVoXQpqVThG9mgnznt0-6QcxgoCs
```

### 2. Database Setup

Run the following SQL script in your Supabase SQL editor to create the bookings table:

```sql
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  patient_type TEXT NOT NULL,
  patient_name TEXT,
  age TEXT,
  phone_number TEXT NOT NULL,
  email_address TEXT,
  gender TEXT,
  how_did_you_hear TEXT,
  coupon_code TEXT,
  referrer TEXT,
  selected_scans TEXT[],
  selected_date DATE NOT NULL,
  selected_time TEXT NOT NULL
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_phone_number ON bookings (phone_number);
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings (selected_date, selected_time);

-- Unique constraint to prevent double bookings
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_booking_slot ON bookings (selected_date, selected_time);
```

### 3. Row Level Security (RLS)

Enable RLS on the bookings table and create appropriate policies:

```sql
-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations (for demo purposes)
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations" ON bookings
  FOR ALL USING (true);
```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Favicon Setup (Optional)

To generate proper ICO and PNG favicon files:

```bash
pnpm run favicon
```

This will show instructions for converting the SVG favicon to ICO and PNG formats.

## Project Structure

```
├── app/
│   ├── actions.ts          # Server actions for booking creation
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main booking form
├── components/
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Client-side Supabase configuration
│   │   ├── server.ts       # Server-side Supabase configuration
│   │   ├── types.ts        # TypeScript types for database
│   │   └── utils.ts        # Database utility functions
│   └── utils.ts            # General utility functions
├── hooks/
│   └── use-toast.ts        # Toast notification hook
└── scripts/
    └── 001-create-bookings-table.sql  # Database schema
```

## Database Schema

The `bookings` table stores the following information:

- `id`: Unique identifier (UUID)
- `created_at`: Timestamp of booking creation
- `patient_type`: "new" or "existing"
- `patient_name`: Patient's full name (for new patients only)
- `age`: Patient's age (for new patients only)
- `phone_number`: Contact phone number
- `email_address`: Email address (for new patients only)
- `gender`: Patient's gender (for new patients only)
- `how_did_you_hear`: Source of information about the service
- `coupon_code`: Optional coupon code
- `referrer`: Optional referrer information
- `selected_scans`: Array of selected scan types
- `selected_date`: Appointment date
- `selected_time`: Appointment time

## API Endpoints

### Server Actions

- `createBooking(data)`: Creates a new booking in the database

### Database Utilities

- `getBookingsByPhone(phoneNumber)`: Retrieves bookings by phone number
- `getBookingById(id)`: Retrieves a specific booking by ID
- `createBooking(data)`: Creates a new booking
- `updateBooking(id, updates)`: Updates an existing booking
- `deleteBooking(id)`: Deletes a booking
- `subscribeToBookings(callback)`: Real-time subscription for new bookings

## Features

### Patient Types
- **New Patient**: Requires full information (name, age, email, gender)
- **Existing Patient**: Only requires phone number and OTP verification

### Scan Categories
- **X-ray**: Chest, Spine, Joint, Dental
- **Ultrasound**: Abdomen, Pelvis, Thyroid, Pregnancy, Heart
- **ECG**: Standard, 24-hour Holter, Stress

### Time Slots
- **Morning**: 09:00 - 11:45 (15-minute intervals)
- **Afternoon**: 12:00 - 15:45 (15-minute intervals)
- **Evening**: 16:00 - 21:45 (15-minute intervals)

### Slot Booking Logic
- **Real-time Availability**: Slots are checked for availability when a date is selected
- **Visual Feedback**: Booked slots are displayed in gray and marked as "Booked"
- **Double Booking Prevention**: Database constraint prevents multiple bookings for the same slot
- **User Experience**: Booked slots are disabled and show tooltips explaining they're unavailable

## Development

### Adding New Features

1. Update the database schema if needed
2. Add corresponding TypeScript types in `lib/supabase/types.ts`
3. Create utility functions in `lib/supabase/utils.ts`
4. Update the UI components as required

### Testing

The application includes comprehensive form validation and error handling. Test the following scenarios:

- New patient booking with all required fields
- Existing patient booking with phone verification
- Form validation for missing fields
- Database error handling
- Network error handling

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

Ensure the following environment variables are set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Security Considerations

- All database operations use parameterized queries
- Row Level Security (RLS) is enabled on the bookings table
- Environment variables are properly configured
- Input validation is implemented on both client and server side

## Support

For issues or questions, please check the Supabase documentation or create an issue in the repository. 
