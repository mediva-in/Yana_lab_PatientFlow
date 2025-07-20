"use server"

import type { CreateBookingData } from "@/lib/supabase/types"
import { createBooking as createBookingUtil, getBookedSlotsForDate } from "@/lib/supabase/utils"
import { revalidatePath } from "next/cache"

interface BookingData {
  patientType: "new" | "existing"
  patientName: string
  age: string
  phoneNumber: string
  emailAddress: string
  gender: string
  howDidYouHear: string
  couponCode: string
  referrer: string
  selectedScans: string[]
  selectedDate: string
  selectedTime: string
}

export async function createBooking(data: BookingData) {
  try {
    // Validate required fields
    if (!data.phoneNumber || !data.selectedScans.length || !data.selectedDate || !data.selectedTime) {
      return { success: false, message: "Missing required fields" }
    }

    // Validate patient type specific fields
    if (data.patientType === "new") {
      if (!data.patientName || !data.age || !data.emailAddress || !data.gender) {
        return { success: false, message: "Missing required fields for new patient" }
      }
    }

    // Transform data to match database schema
    const bookingData: CreateBookingData = {
      patient_type: data.patientType,
      patient_name: data.patientType === "new" ? data.patientName : null,
      age: data.patientType === "new" ? data.age : null,
      phone_number: data.phoneNumber,
      email_address: data.patientType === "new" ? data.emailAddress : null,
      gender: data.patientType === "new" ? data.gender : null,
      how_did_you_hear: data.howDidYouHear || null,
      coupon_code: data.couponCode || null,
      referrer: data.referrer || null,
      selected_scans: data.selectedScans,
      selected_date: data.selectedDate,
      selected_time: data.selectedTime,
    }

    const booking = await createBookingUtil(bookingData)

    revalidatePath("/")
    return { 
      success: true, 
      message: "Thank you for booking your appointment! Looking forward to see you.",
      bookingId: booking.id 
    }
  } catch (error) {
    console.error("Error creating booking:", error)
    
    // Check if it's a unique constraint violation (double booking)
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return { 
        success: false, 
        message: "This time slot has already been booked. Please select a different time." 
      }
    }
    
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "An unexpected error occurred" 
    }
  }
}

export async function getBookedSlots(date: string) {
  try {
    const bookedSlots = await getBookedSlotsForDate(date)
    return { success: true, bookedSlots }
  } catch (error) {
    console.error("Error fetching booked slots:", error)
    return { 
      success: false, 
      bookedSlots: [],
      message: error instanceof Error ? error.message : "Failed to fetch booked slots" 
    }
  }
}
