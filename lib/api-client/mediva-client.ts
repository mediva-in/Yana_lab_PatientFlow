// Mediva Patient Booking API Client
"use client";

const MEDIVA_API_BASE_URL = "https://api.mediva.in";

// Updated request format to match new OpenAPI spec
export interface CreateBookingRequest {
  patientId?: string;
  reason: "PATIENT_NOT_READY" | "RESCHEDULED" | "TECHNICAL_ISSUE" | "OTHER";
  notes?: string;
  name: string;
  phone: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  doctor: "DOCUBE" | "OTHER";
  consultationType: "ECHO" | "ULTRASOUND" | "BOTH";
  originalStartTime?: string;
  tokenNumber?: number;
  originalPosition?: number;
}

// Updated response format to match new OpenAPI spec
export interface CreateBookingResponse {
  success: boolean;
  patient: NotCheckedInPatientEntry;
  movedAt: string;
  message: string;
  originalPosition?: number;
}

export interface NotCheckedInPatientEntry {
  patientId?: string;
  name?: string;
  phone?: string;
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  doctor?: "DOCUBE" | "OTHER";
  consultationType?: "ECHO" | "ULTRASOUND" | "BOTH";
  originalStartTime?: string;
  movedToNotCheckedInAt?: string;
  reason?: "PATIENT_NOT_READY" | "RESCHEDULED" | "TECHNICAL_ISSUE" | "OTHER";
  notes?: string;
  tokenNumber?: number;
  originalPosition?: number;
}

export interface PatientTokenStatusResponse {
  position: string;
  currentTime: string;
  tokenNumber: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
  details?: Record<string, any>;
}

// Service interface for the new API endpoint
export interface Service {
  scanName: string;
  scanPrice: number;
}

export interface GetAllServicesResponse {
  success: boolean;
  services: Service[];
  message?: string;
}

// Raw API response format (array of arrays)
export type RawServiceResponse = [string, string][];

class MedivaApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = MEDIVA_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers: defaultHeaders,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json().catch(() => ({
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));

        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  async createBooking(
    data: CreateBookingRequest
  ): Promise<CreateBookingResponse> {
    return this.makeRequest<CreateBookingResponse>("/patient/createBooking", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getPatientTokenStatus(
    patientId: string,
    terminalId: number
  ): Promise<PatientTokenStatusResponse> {
    return this.makeRequest<PatientTokenStatusResponse>(
      `/patient/getTokenStatus/${patientId}?terminalId=${terminalId}`
    );
  }

  async getAllServices(): Promise<GetAllServicesResponse> {
    const rawResponse = await this.makeRequest<RawServiceResponse>(
      "/patient/get-all-services"
    );

    console.log("Raw API response:", rawResponse);

    // Transform the raw array format to our expected format
    const services: Service[] = rawResponse.map(([scanName, scanPrice]) => ({
      scanName,
      scanPrice: parseFloat(scanPrice) || 0,
    }));

    console.log("Transformed services:", services);

    return {
      success: true,
      services,
      message: "Services retrieved successfully",
    };
  }
}

// Export singleton instance
export const medivaApiClient = new MedivaApiClient();
