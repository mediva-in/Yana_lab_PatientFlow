import { supabaseClient } from "./client"
import { supabaseServer } from "./server"
import type { Booking, CreateBookingData } from "./types"

export async function getBookingsByPhone(phoneNumber: string): Promise<Booking[]> {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .eq("phone_number", phoneNumber)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching bookings:", error)
    throw error
  }

  return data || []
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching booking:", error)
    throw error
  }

  return data
}

export async function createBooking(data: CreateBookingData): Promise<Booking> {
  const { data: booking, error } = await supabaseServer
    .from("bookings")
    .insert([data])
    .select()
    .single()

  if (error) {
    console.error("Error creating booking:", error)
    throw error
  }

  return booking
}

export async function updateBooking(id: string, updates: Partial<CreateBookingData>): Promise<Booking> {
  const { data: booking, error } = await supabaseServer
    .from("bookings")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating booking:", error)
    throw error
  }

  return booking
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabaseServer
    .from("bookings")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting booking:", error)
    throw error
  }
}

// Get booked slots for a specific date
export async function getBookedSlotsForDate(date: string): Promise<string[]> {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("selected_time")
    .eq("selected_date", date)

  if (error) {
    console.error("Error fetching booked slots:", error)
    throw error
  }

  return data?.map(booking => booking.selected_time) || []
}

// Check if a specific slot is available
export async function isSlotAvailable(date: string, time: string): Promise<boolean> {
  const { data, error } = await supabaseServer
    .from("bookings")
    .select("id")
    .eq("selected_date", date)
    .eq("selected_time", time)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
    console.error("Error checking slot availability:", error)
    throw error
  }

  return !data // If no data found, slot is available
}

// Client-side functions for real-time subscriptions
export function subscribeToBookings(callback: (booking: Booking) => void) {
  return supabaseClient
    .channel("bookings")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "bookings",
      },
      (payload) => {
        callback(payload.new as Booking)
      }
    )
    .subscribe()
} 