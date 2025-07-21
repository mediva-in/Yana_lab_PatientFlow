"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { getTestPrice } from "@/lib/pricing-data"
import { format } from "date-fns"
import { Calendar, CheckCircle, MapPin, Phone, User } from "lucide-react"

interface BookingConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  bookingData: {
    patientType: "new" | "existing"
    patientName: string
    age: string
    phoneNumber: string
    emailAddress: string
    gender: string
    selectedScans: string[]
    selectedDate: string
    selectedTime: string
    bookingId?: string
  }
}

export function BookingConfirmationDialog({ isOpen, onClose, bookingData }: BookingConfirmationDialogProps) {
  const { toast } = useToast()
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not selected"
    
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return "Invalid date"
      }
      return format(date, "EEEE, MMMM do, yyyy")
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return "Not selected"
    return timeString
  }

  // Don't render if booking data is incomplete
  if (!bookingData.selectedDate || !bookingData.selectedTime) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Booking Confirmed!
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Your appointment has been successfully scheduled
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Booking ID */}
          {bookingData.bookingId && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Booking ID</p>
              <p className="text-sm font-mono text-gray-900">{bookingData.bookingId}</p>
            </div>
          )}

          {/* Patient Information */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Patient Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <Badge variant={bookingData.patientType === "new" ? "default" : "secondary"} className="text-xs">
                  {bookingData.patientType === "new" ? "New Patient" : "Existing Patient"}
                </Badge>
              </div>
              {bookingData.patientType === "new" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{bookingData.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{bookingData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium capitalize">{bookingData.gender}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{bookingData.phoneNumber}</span>
              </div>
              {bookingData.patientType === "new" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{bookingData.emailAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointment Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{formatDate(bookingData.selectedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{formatTime(bookingData.selectedTime)}</span>
              </div>
            </div>
          </div>

          {/* Selected Scans */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Selected Scans</h3>
            <div className="space-y-2">
              {bookingData.selectedScans.map((scan) => {
                const price = getTestPrice(scan);
                return (
                  <div key={scan} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-sm font-medium text-green-800">{scan}</span>
                    {price && (
                      <span className="text-sm font-semibold text-green-600">
                        ₹{price.toLocaleString()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount:</span>
                <span className="font-bold text-lg text-green-600">
                  ₹{bookingData.selectedScans.reduce((total, scan) => {
                    const price = getTestPrice(scan);
                    return total + (price || 0);
                  }, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>



          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 text-sm mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Visit Us
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>#549, Ground floor, 14th Main,</p>
              <p>Sector 7, HSR Layout,</p>
              <p>Bangalore, Karnataka, 560102</p>
              <div className="flex items-center gap-1 mt-2">
                <Phone className="w-3 h-3" />
                <a href="tel:+919900500950" className="text-green-600 hover:text-green-700 font-medium">
                  +91 9900500950
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={() => {
              onClose()
              // Show final success toast
              toast({
                title: "🎉 Thank You!",
                description: "Your booking has been confirmed. We look forward to seeing you!",
                variant: "default",
                duration: 4000,
              })
              // Optionally redirect to home or refresh
              window.location.reload()
            }}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Done
          </Button>
          <Button
            onClick={() => {
              // Add to calendar functionality
              const event = {
                title: `Medical Appointment - ${bookingData.selectedScans.join(", ")}`,
                start: new Date(`${bookingData.selectedDate}T${bookingData.selectedTime}`),
                end: new Date(`${bookingData.selectedDate}T${bookingData.selectedTime}`),
                location: "Yana Labs, HSR Layout, Bangalore",
                description: `Appointment for: ${bookingData.selectedScans.join(", ")}\nPhone: ${bookingData.phoneNumber}`
              }
              
              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${event.end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`
              
              window.open(calendarUrl, '_blank')
            }}
            variant="outline"
            className="flex-1"
          >
            Add to Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 