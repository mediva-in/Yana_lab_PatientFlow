"use client"

import { createBooking, getBookedSlots } from "@/app/actions"; // Import the server actions
import { BookingConfirmationDialog } from "@/components/booking-confirmation-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast"; // Import useToast for feedback
import { Calendar, Clock, MapPin, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type PatientType = "new" | "existing"
type Step = 1 | 2 | 3

interface FormData {
  patientType: PatientType
  patientName: string
  age: string
  phoneNumber: string
  emailAddress: string
  gender: string
  howDidYouHear: string
  couponCode: string
  referrer: string
  otp: string
  selectedScans: string[]
  selectedDate: string
  selectedTime: string
}

const scanCategories = {
  "X-ray": ["Chest X-ray", "Spine X-ray", "Joint X-ray", "Dental X-ray"],
  Ultrasound: ["Abdomen", "Pelvis", "Thyroid", "Pregnancy", "Heart"],
  ECG: ["Standard ECG", "24-hour Holter", "Stress ECG"],
}

const timeSlotsByPeriod = {
  Morning: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45"],
  Afternoon: [
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
  ],
  Evening: [
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
  ],
}

export default function YanaLabsBooking() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [showOTP, setShowOTP] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false) // New state for submission loading
  const [bookedSlots, setBookedSlots] = useState<string[]>([]) // State for booked slots
  const [loadingSlots, setLoadingSlots] = useState(false) // State for loading slots
  const [showConfirmation, setShowConfirmation] = useState(false) // State for confirmation dialog
  const [bookingId, setBookingId] = useState<string>("") // State for booking ID
  const [bookingDataForDialog, setBookingDataForDialog] = useState<any>(null) // State for booking data in dialog
  const { toast } = useToast() // Initialize toast

  const [formData, setFormData] = useState<FormData>({
    patientType: "new",
    patientName: "",
    age: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "",
    howDidYouHear: "",
    couponCode: "",
    referrer: "",
    otp: "",
    selectedScans: [],
    selectedDate: "",
    selectedTime: "",
  })
  const [expandedPeriod, setExpandedPeriod] = useState<string | null>(null)

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isStep1Valid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\d{10}$/

    if (formData.patientType === "new") {
      return (
        formData.patientName &&
        formData.age &&
        phoneRegex.test(formData.phoneNumber) &&
        emailRegex.test(formData.emailAddress) &&
        formData.gender
      )
    } else {
      return phoneRegex.test(formData.phoneNumber) && showOTP && formData.otp.length === 6
    }
  }

  const isStep2Valid = () => {
    return formData.selectedScans.length > 0
  }

  const handleScanToggle = (scan: string) => {
    const updatedScans = formData.selectedScans.includes(scan)
      ? formData.selectedScans.filter((s) => s !== scan)
      : [...formData.selectedScans, scan]
    updateFormData("selectedScans", updatedScans)
  }

  const filteredScans = Object.entries(scanCategories).reduce(
    (acc, [category, scans]) => {
      const filtered = scans.filter((scan) => scan.toLowerCase().includes(searchTerm.toLowerCase()))
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const StepIndicator = () => (
    <div className="relative mb-6">
      <div className="flex items-center justify-between px-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10 relative ${
                step <= currentStep ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            <div className={`text-xs mt-2 text-center ${step <= currentStep ? "text-green-500" : "text-gray-500"}`}>
              {step === 1 && "Fill details"}
              {step === 2 && "Select scan"}
              {step === 3 && "Confirm slot"}
            </div>
          </div>
        ))}
      </div>
      {/* Connecting lines */}
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4">
        <div className="w-8"></div>
        <div className={`flex-1 h-0.5 mx-4 ${currentStep > 1 ? "bg-green-500" : "bg-gray-200"}`}></div>
        <div className="w-8"></div>
        <div className={`flex-1 h-0.5 mx-4 ${currentStep > 2 ? "bg-green-500" : "bg-gray-200"}`}></div>
        <div className="w-8"></div>
      </div>
    </div>
  )

  const DiscountBanner = () => (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6 text-center">
      <p className="text-sm text-gray-700">
        <span className="font-semibold text-orange-600">50% discount</span> as an introductory offer.{" "}
        <span className="font-medium">Call us to book or walk-in to avail!</span>
      </p>
    </div>
  )

  const ContactInfo = () => (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="font-medium text-gray-900 mb-3">Contact Us</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
          <div>
            <p>#549, Ground floor, 14th Main,</p>
            <p>Sector 7, HSR Layout,</p>
            <p>Bangalore, Karnataka, 560102</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <a href="tel:+919900500950" className="text-green-600 hover:text-green-700 font-medium">
            +91 9900500950
          </a>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">Powered by Mediva Healthcare</p>
    </div>
  )

  const handlePatientTypeChange = (type: PatientType) => {
    // Clear all form data when switching patient types
    setFormData({
      patientType: type,
      patientName: "",
      age: "",
      phoneNumber: "",
      emailAddress: "",
      gender: "",
      howDidYouHear: "",
      couponCode: "",
      referrer: "",
      otp: "",
      selectedScans: [],
      selectedDate: "",
      selectedTime: "",
    })
    setShowOTP(false)
  }

  const fetchBookedSlots = async (date: string) => {
    setLoadingSlots(true)
    try {
      const result = await getBookedSlots(date)
      if (result.success) {
        setBookedSlots(result.bookedSlots)
      } else {
        console.error("Failed to fetch booked slots:", result.message)
        setBookedSlots([])
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error)
      setBookedSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const isSlotBooked = (time: string) => {
    return bookedSlots.includes(time)
  }

  const handleConfirmAppointment = async () => {
    setIsSubmitting(true)
    try {
      const result = await createBooking(formData)
   
      if (result.success) {
        console.log("the result da"+result.message)
        toast({
          title: "🎉 Booking Successful!",
          description: result.message,
          variant: "default",
          duration: 5000, // Show for 5 seconds
        })
        
        // Store booking data before resetting form
        const bookingDataForDialog = {
          patientType: formData.patientType,
          patientName: formData.patientName,
          age: formData.age,
          phoneNumber: formData.phoneNumber,
          emailAddress: formData.emailAddress,
          gender: formData.gender,
          selectedScans: formData.selectedScans,
          selectedDate: formData.selectedDate,
          selectedTime: formData.selectedTime,
          bookingId: result.bookingId || "",
        }
        setBookingDataForDialog(bookingDataForDialog)
        
        if (result.bookingId) {
          setBookingId(result.bookingId)
        }
        // Show confirmation dialog
        setShowConfirmation(true)
        
        // Reset form after successful booking
        setFormData({
          patientType: "new",
          patientName: "",
          age: "",
          phoneNumber: "",
          emailAddress: "",
          gender: "",
          howDidYouHear: "",
          couponCode: "",
          referrer: "",
          otp: "",
          selectedScans: [],
          selectedDate: "",
          selectedTime: "",
        })
        setCurrentStep(1)
        setShowOTP(false)
        setBookedSlots([])
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to confirm appointment.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to submit booking:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-center mb-4">
            <Image src="/yana-logo.png" alt="Yana Labs" width={200} height={80} className="h-16 w-auto" />
          </div>
          <DiscountBanner />
          <StepIndicator />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Step 1: Fill Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Patient Type Toggle */}
              <div className="flex rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => handlePatientTypeChange("new")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    formData.patientType === "new" ? "bg-green-500 text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  New patient
                </button>
                <button
                  onClick={() => handlePatientTypeChange("existing")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    formData.patientType === "existing"
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Existing patient
                </button>
              </div>

              {/* Form Fields */}
              {formData.patientType === "new" ? (
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Patient name *"
                      value={formData.patientName}
                      onChange={(e) => updateFormData("patientName", e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Age *"
                      type="number"
                      value={formData.age}
                      onChange={(e) => updateFormData("age", e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Phone number *"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                      className="text-black"
                      maxLength={10}
                    />
                    {formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber) && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number</p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Email address *"
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => updateFormData("emailAddress", e.target.value)}
                      className="text-black"
                    />
                    {formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress) && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
                    )}
                  </div>
                  <div>
                    <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                      <SelectTrigger className="text-gray-500">
                        <SelectValue placeholder="Gender *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={formData.howDidYouHear}
                      onValueChange={(value) => updateFormData("howDidYouHear", value)}
                    >
                      <SelectTrigger className="text-gray-500">
                        <SelectValue placeholder="How did you hear about us? (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="friend">From a Friend</SelectItem>
                        <SelectItem value="doctor">From a Doctor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input
                      placeholder="Coupon code (optional)"
                      value={formData.couponCode}
                      onChange={(e) => updateFormData("couponCode", e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Referrer (optional)"
                      value={formData.referrer}
                      onChange={(e) => updateFormData("referrer", e.target.value)}
                      className="text-black"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="Phone number *"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                      className="text-black"
                      maxLength={10}
                    />
                    {formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber) && (
                      <p className="text-red-500 text-xs mt-1">Please enter a valid 10-digit phone number</p>
                    )}
                  </div>
                  {!showOTP ? (
                    <Button
                      onClick={() => setShowOTP(true)}
                      className="w-full bg-green-500 hover:bg-green-600"
                      disabled={!formData.phoneNumber}
                    >
                      Send OTP
                    </Button>
                  ) : (
                    <div>
                      <Input
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) => updateFormData("otp", e.target.value)}
                        className="text-black"
                      />
                    </div>
                  )}
                  <div>
                    <Input
                      placeholder="Coupon code (optional)"
                      value={formData.couponCode}
                      onChange={(e) => updateFormData("couponCode", e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Referrer (optional)"
                      value={formData.referrer}
                      onChange={(e) => updateFormData("referrer", e.target.value)}
                      className="text-black"
                    />
                  </div>
                </div>
              )}

              <Button
                onClick={() => {
                  setCurrentStep(2)
                  // Show success toast for completing patient details
                  toast({
                    title: "✅ Patient Details Saved!",
                    description: formData.patientType === "new" 
                      ? "Patient information has been saved successfully. Now select your scans."
                      : "Phone verification completed. Now select your scans.",
                    variant: "default",
                    duration: 3000,
                  })
                }}
                disabled={!isStep1Valid()}
                className="w-full bg-green-500 hover:bg-green-600 mt-6"
              >
                Select scan →
              </Button>

              <ContactInfo />
            </div>
          )}

          {/* Step 2: Select Scan */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                Don't know which scan you need?{" "}
                <a href="tel:+919900500950" className="text-green-600 hover:text-green-700 font-medium">
                  Call us
                </a>{" "}
                and we'll help you book the right one!
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search for a specific scan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-black"
                />
              </div>

              {/* Scan Categories */}
              <div className="space-y-6">
                {Object.entries(filteredScans).map(([category, scans]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                    <div className="space-y-2">
                      {scans.map((scan) => (
                        <div key={scan} className="flex items-center space-x-3">
                          <Checkbox
                            id={scan}
                            checked={formData.selectedScans.includes(scan)}
                            onCheckedChange={() => handleScanToggle(scan)}
                          />
                          <Label htmlFor={scan} className="text-sm text-gray-700">
                            {scan}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {formData.selectedScans.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Selected Scans:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedScans.map((scan) => (
                      <Badge key={scan} variant="secondary" className="bg-green-100 text-green-800">
                        {scan}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                >
                  ← Back
                </Button>
                <Button
                  onClick={() => {
                    setCurrentStep(3)
                    // Show success toast for completing scan selection
                    toast({
                      title: "✅ Scans Selected!",
                      description: `${formData.selectedScans.length} scan(s) selected. Now choose your appointment time.`,
                      variant: "default",
                      duration: 3000,
                    })
                  }}
                  disabled={!isStep2Valid()}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  Select Slot →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm Slot */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {/* Selected Scans Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Scans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedScans.map((scan) => (
                      <Badge key={scan} variant="secondary" className="bg-green-100 text-green-800">
                        {scan}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Date Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">Select Date</Label>
                <div className="grid grid-cols-2 gap-2">
                  {generateDates().map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        updateFormData("selectedDate", date)
                        updateFormData("selectedTime", "") // Clear selected time when date changes
                        fetchBookedSlots(date) // Fetch booked slots for selected date
                        // Show success toast for date selection
                        toast({
                          title: "📅 Date Selected!",
                          description: `Appointment date set for ${formatDate(date)}. Now choose your preferred time.`,
                          variant: "default",
                          duration: 3000,
                        })
                      }}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        formData.selectedDate === date
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <Calendar className="w-4 h-4 mx-auto mb-1" />
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {formData.selectedDate && (
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Select Time
                    {loadingSlots && <span className="text-sm text-gray-500 ml-2">(Loading availability...)</span>}
                  </Label>
                  <div className="space-y-3">
                    {Object.entries(timeSlotsByPeriod).map(([period, slots]) => (
                      <div key={period} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => setExpandedPeriod(expandedPeriod === period ? null : period)}
                          className="w-full p-4 text-left font-medium text-gray-900 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                        >
                          <span>{period}</span>
                          <span className="text-gray-500">{expandedPeriod === period ? "−" : "+"}</span>
                        </button>
                        {expandedPeriod === period && (
                          <div className="p-4 pt-0 grid grid-cols-4 gap-2">
                            {slots.map((time) => {
                              const isBooked = isSlotBooked(time)
                              return (
                                <button
                                  key={time}
                                  onClick={() => {
                                    if (!isBooked) {
                                      updateFormData("selectedTime", time)
                                      // Show success toast for time selection
                                      toast({
                                        title: "⏰ Time Selected!",
                                        description: `Appointment time set for ${time}. Ready to confirm your booking!`,
                                        variant: "default",
                                        duration: 3000,
                                      })
                                    }
                                  }}
                                  disabled={isBooked}
                                  className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                                    isBooked
                                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                      : formData.selectedTime === time
                                      ? "bg-green-500 text-white border-green-500"
                                      : "bg-white text-gray-700 border-gray-200 hover:border-green-300"
                                  }`}
                                  title={isBooked ? "This slot is already booked" : ""}
                                >
                                  <Clock className="w-3 h-3 mx-auto mb-1" />
                                  {time}
                                  {isBooked && <span className="block text-xs mt-1">Booked</span>}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={() => setCurrentStep(2)}
                  variant="outline"
                  className="flex-1 border-green-500 text-green-600 hover:bg-green-50"
                >
                  ← Back
                </Button>
                <Button
                  onClick={handleConfirmAppointment} // Call the new handler
                  disabled={!formData.selectedDate || !formData.selectedTime || isSubmitting || isSlotBooked(formData.selectedTime)}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Appointment"}
                </Button>
              </div>

              <ContactInfo />
            </div>
          )}
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      {bookingDataForDialog && (
        <BookingConfirmationDialog
          isOpen={showConfirmation}
          onClose={() => {
            setShowConfirmation(false)
            setBookingDataForDialog(null) // Clear the booking data when dialog closes
          }}
          bookingData={bookingDataForDialog}
        />
      )}
    </div>
  )
}
