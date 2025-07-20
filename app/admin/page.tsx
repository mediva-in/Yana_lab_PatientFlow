"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Booking } from "@/lib/supabase/types"
import { getBookingsByPhone } from "@/lib/supabase/utils"
import { Calendar, Clock, Phone, Search, User } from "lucide-react"
import { useState } from "react"

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchPhone, setSearchPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const searchBookings = async () => {
    if (!searchPhone.trim()) return
    
    setLoading(true)
    try {
      const results = await getBookingsByPhone(searchPhone)
      setBookings(results)
    } catch (error) {
      console.error("Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yana Labs - Booking Management</h1>
          <p className="text-gray-600">Search and view patient bookings</p>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Enter phone number to search..."
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === "Enter" && searchBookings()}
                  />
                </div>
              </div>
              <Button onClick={searchBookings} disabled={loading || !searchPhone.trim()}>
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {bookings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Found {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
            </h2>
            
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      <User className="w-4 h-4 inline mr-2" />
                      {booking.patient_name || "Existing Patient"}
                    </CardTitle>
                    <Badge variant={booking.patient_type === "new" ? "default" : "secondary"}>
                      {booking.patient_type === "new" ? "New Patient" : "Existing Patient"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Patient Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><Phone className="w-3 h-3 inline mr-1" /> {booking.phone_number}</p>
                        {booking.email_address && (
                          <p>📧 {booking.email_address}</p>
                        )}
                        {booking.age && (
                          <p>👤 Age: {booking.age}</p>
                        )}
                        {booking.gender && (
                          <p>⚧ Gender: {booking.gender}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Appointment Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {formatDate(booking.selected_date)}
                        </p>
                        <p>
                          <Clock className="w-3 h-3 inline mr-1" />
                          {formatTime(booking.selected_time)}
                        </p>
                        <p>📅 Booked: {formatDate(booking.created_at)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Selected Scans</h4>
                    <div className="flex flex-wrap gap-2">
                      {booking.selected_scans.map((scan) => (
                        <Badge key={scan} variant="outline" className="text-xs">
                          {scan}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {(booking.how_did_you_hear || booking.coupon_code || booking.referrer) && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        {booking.how_did_you_hear && (
                          <p>📢 How did you hear: {booking.how_did_you_hear}</p>
                        )}
                        {booking.coupon_code && (
                          <p>🎫 Coupon: {booking.coupon_code}</p>
                        )}
                        {booking.referrer && (
                          <p>👥 Referrer: {booking.referrer}</p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {bookings.length === 0 && searchPhone && !loading && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No bookings found for this phone number.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 