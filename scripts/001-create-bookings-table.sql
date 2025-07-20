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

-- Optional: Add an index for faster lookups by phone number
CREATE INDEX IF NOT EXISTS idx_bookings_phone_number ON bookings (phone_number);

-- Add a unique constraint to prevent double bookings for the same date and time
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_booking_slot ON bookings (selected_date, selected_time);

-- Add an index for faster lookups by date and time
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings (selected_date, selected_time);
