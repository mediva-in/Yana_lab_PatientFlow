export interface Booking {
  id: string
  created_at: string
  patient_type: "new" | "existing"
  patient_name: string | null
  age: string | null
  phone_number: string
  email_address: string | null
  gender: string | null
  how_did_you_hear: string | null
  coupon_code: string | null
  referrer: string | null
  selected_scans: string[]
  selected_date: string
  selected_time: string
}

export interface CreateBookingData {
  patient_type: "new" | "existing"
  patient_name?: string | null
  age?: string | null
  phone_number: string
  email_address?: string | null
  gender?: string | null
  how_did_you_hear?: string | null
  coupon_code?: string | null
  referrer?: string | null
  selected_scans: string[]
  selected_date: string
  selected_time: string
} 