# Mediva API Integration

This document describes the integration of the Mediva Patient Booking API into the Yana Labs booking application.

## Overview

The application now makes **direct client-side API calls** to the Mediva Patient Booking API instead of using Next.js server actions. This approach ensures that requests go directly to `http://localhost:8080/patient/createBooking` without any intermediate server logic.

## Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
NEXT_PUBLIC_MEDIVA_API_URL=http://localhost:8080
```

For production, set this to your actual Mediva API endpoint.

## API Integration Details

### Files Modified

1. **`lib/api-client/mediva-client.ts`** - New API client for direct Mediva API calls
2. **`app/actions.ts`** - No longer used (direct API calls from client)
3. **`app/page.tsx`** - Updated to make direct API calls using medivaApiClient

### API Endpoints Used

1. **`POST /patient/createBooking`** - Creates new patient booking
2. **`GET /patient/getTokenStatus/{patientId}`** - Gets patient token status (for future use)

### Request Format

The booking request is transformed from the UI format to match the Mediva API specification:

```typescript
interface CreateBookingRequest {
  patientType: "new" | "existing"
  patientName?: string
  age?: string
  phoneNumber: string
  emailAddress?: string
  gender?: string
  howDidYouHear?: string
  couponCode?: string
  referrer?: string
  selectedScans: string[]
  selectedDate: string
  selectedTime: string
}
```

### Response Format

The API returns a structured response:

```typescript
interface CreateBookingResponse {
  success: boolean
  message: string
  bookingId: string
  booking: Booking
}
```

## Business Logic

1. **Patient Type**: Currently only supports "new" patients (existing patient logic is commented out)
2. **Validation**: All required fields are validated before API call
3. **Queue Integration**: Patients are automatically added to the not checked in queue
4. **Consultation Type**: Automatically determined based on selected scans
5. **Doctor Assignment**: Default doctor type is set to DOCUBE

## Error Handling

The integration includes comprehensive error handling:

- Network errors
- API validation errors
- Server errors
- Timeout handling

## Future Enhancements

1. **Booked Slots API**: Implement endpoint to check slot availability
2. **Token Status**: Add real-time token status checking
3. **Existing Patients**: Re-enable existing patient booking flow
4. **Authentication**: Add JWT token support if required

## Testing

To test the integration:

1. Set up the Mediva API server
2. Configure the environment variable
3. Test booking flow through the UI
4. Verify patient appears in not checked in queue

## Testing

To test the direct API integration:

1. **Test with HTML file**: Open `lib/api-client/test-direct-api.html` in your browser to test the API directly
2. **Test through UI**: Use the booking form in the application
3. **Check Network tab**: Verify requests go to `http://localhost:8080/patient/createBooking`
4. **Console logs**: Check browser console for detailed request/response logs

## Rollback

If needed, you can rollback to the Supabase implementation by:

1. Restoring `app/actions.ts` with Supabase logic
2. Updating `app/page.tsx` to use server actions again
3. Removing the Mediva API client

The UI will continue to work as the interface remains the same. 