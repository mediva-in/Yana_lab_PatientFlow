"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  getTestPrice,
  getDisplayNameWithCategory,
  type ScanCategory,
} from "@/lib/pricing-data";
import { format } from "date-fns";
import { Calendar, CheckCircle, MapPin, Phone, User } from "lucide-react";

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    patientType: "new" | "existing";
    patientName: string;
    age: string;
    phoneNumber: string;
    emailAddress: string;
    gender: string;
    selectedScans: string[];
    selectedDate: string;
    selectedTime: string;
    bookingId?: string;
  };
  scanCategories?: Record<string, ScanCategory>;
}

export function BookingConfirmationDialog({
  isOpen,
  onClose,
  bookingData,
  scanCategories,
}: BookingConfirmationDialogProps) {
  const { toast } = useToast();
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not selected";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return format(date, "EEEE, MMMM do, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "Not selected";
    return timeString;
  };

  // Don't render if booking data is incomplete
  if (!bookingData.selectedDate || !bookingData.selectedTime) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] flex flex-col p-4 sm:p-6">
        <DialogHeader className="text-center flex-shrink-0 pb-4">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
            Booking Confirmed!
          </DialogTitle>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
            Your appointment has been successfully scheduled
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1">
          {/* Booking ID */}
          {bookingData.bookingId && (
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
              <p className="text-xs text-gray-500 mb-1">Booking ID</p>
              <p className="text-xs sm:text-sm font-mono text-gray-900 break-all">
                {bookingData.bookingId}
              </p>
            </div>
          )}

          {/* Patient Information */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              Patient Information
            </h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <Badge
                  variant={
                    bookingData.patientType === "new" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {bookingData.patientType === "new"
                    ? "New Patient"
                    : "Existing Patient"}
                </Badge>
              </div>
              {bookingData.patientType === "new" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-right max-w-[60%] break-words">
                      {bookingData.patientName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{bookingData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium capitalize">
                      {bookingData.gender}
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-right break-all">
                  {bookingData.phoneNumber}
                </span>
              </div>
              {bookingData.patientType === "new" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-right max-w-[60%] break-all">
                    {bookingData.emailAddress}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-medium text-gray-900 flex items-center gap-2 text-sm sm:text-base">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              Appointment Details
            </h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-right max-w-[60%] break-words">
                  {formatDate(bookingData.selectedDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">
                  {formatTime(bookingData.selectedTime)}
                </span>
              </div>
            </div>
          </div>

          {/* Selected Scans */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-medium text-gray-900 text-sm sm:text-base">
              Selected Scans
            </h3>
            <div className="space-y-1 sm:space-y-2">
              {bookingData.selectedScans.map((scan) => {
                const price = getTestPrice(scan, scanCategories || {});
                return (
                  <div
                    key={scan}
                    className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <span className="text-xs sm:text-sm font-medium text-green-800 flex-1 pr-2">
                      {getDisplayNameWithCategory(scan, scanCategories || {})}
                    </span>
                    {price && (
                      <span className="text-xs sm:text-sm font-semibold text-green-600 flex-shrink-0">
                        ₹{price.toLocaleString()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">
                  Total Amount:
                </span>
                <span className="font-bold text-base sm:text-lg text-green-600">
                  ₹
                  {bookingData.selectedScans
                    .reduce((total, scan) => {
                      const price = getTestPrice(scan, scanCategories || {});
                      return total + (price || 0);
                    }, 0)
                    .toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
            <h4 className="font-medium text-gray-900 text-xs sm:text-sm mb-2 flex items-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              Visit Us
            </h4>
            <div className="text-xs text-gray-600 space-y-1">
              <p>#549, Ground floor, 14th Main,</p>
              <p>Sector 7, HSR Layout,</p>
              <p>Bangalore, Karnataka, 560102</p>
              <div className="flex items-center gap-1 mt-2">
                <Phone className="w-3 h-3" />
                <a
                  href="tel:+919900500950"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  +91 9900500950
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 flex-shrink-0">
          <Button
            onClick={() => {
              onClose();
              // Show final success toast
              toast({
                title: "🎉 Thank You!",
                description:
                  "Your booking has been confirmed. We look forward to seeing you!",
                variant: "default",
                duration: 4000,
              });
              // Optionally redirect to home or refresh
              window.location.reload();
            }}
            className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm py-2"
          >
            Done
          </Button>
          <Button
            onClick={() => {
              // Add to calendar functionality
              const event = {
                title: `Medical Appointment - ${bookingData.selectedScans.join(
                  ", "
                )}`,
                start: new Date(
                  `${bookingData.selectedDate}T${bookingData.selectedTime}`
                ),
                end: new Date(
                  `${bookingData.selectedDate}T${bookingData.selectedTime}`
                ),
                location: "Yana Labs, HSR Layout, Bangalore",
                description: `Appointment for: ${bookingData.selectedScans.join(
                  ", "
                )}\nPhone: ${bookingData.phoneNumber}`,
              };

              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                event.title
              )}&dates=${
                event.start.toISOString().replace(/[-:]/g, "").split(".")[0]
              }Z/${
                event.end.toISOString().replace(/[-:]/g, "").split(".")[0]
              }Z&location=${encodeURIComponent(
                event.location
              )}&details=${encodeURIComponent(event.description)}`;

              window.open(calendarUrl, "_blank");
            }}
            variant="outline"
            className="flex-1 text-xs sm:text-sm py-2"
          >
            Add to Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
