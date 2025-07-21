/* tslint:disable */
/* eslint-disable */
/**
 * Response DTO for adding a patient to the queue
 * @export
 * @interface AddPatientResponse
 */
export interface AddPatientResponse {
    /**
     * 
     * @type {PatientQueueEntry}
     * @memberof AddPatientResponse
     */
    entry?: PatientQueueEntry;
    /**
     * The position of the patient in the queue (0-based index)
     * @type {number}
     * @memberof AddPatientResponse
     */
    index?: number;
}
/**
 * Request DTO for adding a patient to the queue
 * @export
 * @interface AddPatientToQueueRequest
 */
export interface AddPatientToQueueRequest {
    /**
     * Patient's full name
     * @type {string}
     * @memberof AddPatientToQueueRequest
     */
    name: string;
    /**
     * Patient's phone number
     * @type {string}
     * @memberof AddPatientToQueueRequest
     */
    phone: string;
    /**
     * Patient's age in years
     * @type {number}
     * @memberof AddPatientToQueueRequest
     */
    age: number;
    /**
     * Patient's gender
     * @type {string}
     * @memberof AddPatientToQueueRequest
     */
    gender: AddPatientToQueueRequestGenderEnum;
    /**
     * Type of doctor for consultation
     * @type {string}
     * @memberof AddPatientToQueueRequest
     */
    doctor: AddPatientToQueueRequestDoctorEnum;
    /**
     * Type of consultation required
     * @type {string}
     * @memberof AddPatientToQueueRequest
     */
    consultationType: AddPatientToQueueRequestConsultationTypeEnum;
    /**
     * Current status in the queue
     * @type {string}
     * @memberof AddPatientToQueueRequest
     */
    queueStatus: AddPatientToQueueRequestQueueStatusEnum;
    /**
     * Unique identifier for the patient
     * @type {string}
     * @memberof AddPatientToQueueRequest
     */
    patientId?: string;
    /**
     * Unique identifier for the terminal
     * @type {number}
     * @memberof AddPatientToQueueRequest
     */
    terminalId: number;
}


/**
 * @export
 */
export const AddPatientToQueueRequestGenderEnum = {
    Male: 'MALE',
    Female: 'FEMALE',
    Other: 'OTHER'
} as const;
export type AddPatientToQueueRequestGenderEnum = typeof AddPatientToQueueRequestGenderEnum[keyof typeof AddPatientToQueueRequestGenderEnum];

/**
 * @export
 */
export const AddPatientToQueueRequestDoctorEnum = {
    Docube: 'DOCUBE',
    Other: 'OTHER'
} as const;
export type AddPatientToQueueRequestDoctorEnum = typeof AddPatientToQueueRequestDoctorEnum[keyof typeof AddPatientToQueueRequestDoctorEnum];

/**
 * @export
 */
export const AddPatientToQueueRequestConsultationTypeEnum = {
    Echo: 'ECHO',
    Ultrasound: 'ULTRASOUND',
    Both: 'BOTH'
} as const;
export type AddPatientToQueueRequestConsultationTypeEnum = typeof AddPatientToQueueRequestConsultationTypeEnum[keyof typeof AddPatientToQueueRequestConsultationTypeEnum];

/**
 * @export
 */
export const AddPatientToQueueRequestQueueStatusEnum = {
    Active: 'ACTIVE',
    NotCheckedIn: 'NOT_CHECKED_IN'
} as const;
export type AddPatientToQueueRequestQueueStatusEnum = typeof AddPatientToQueueRequestQueueStatusEnum[keyof typeof AddPatientToQueueRequestQueueStatusEnum];

/**
 * 
 * @export
 * @interface CampaignCreateRequest
 */
export interface CampaignCreateRequest {
    /**
     * Name of the campaign
     * @type {string}
     * @memberof CampaignCreateRequest
     */
    name: string;
    /**
     * Unique coupon code for the campaign
     * @type {string}
     * @memberof CampaignCreateRequest
     */
    couponCode: string;
    /**
     * Item or service for discount
     * @type {string}
     * @memberof CampaignCreateRequest
     */
    discountItem: string;
    /**
     * Discount percentage
     * @type {number}
     * @memberof CampaignCreateRequest
     */
    discountPercentage: number;
    /**
     * Number of coupons available
     * @type {number}
     * @memberof CampaignCreateRequest
     */
    count: number;
    /**
     * Campaign expiry date
     * @type {string}
     * @memberof CampaignCreateRequest
     */
    expiryDate: string;
}
/**
 * 
 * @export
 * @interface CampaignResponse
 */
export interface CampaignResponse {
    /**
     * Unique identifier for the campaign
     * @type {string}
     * @memberof CampaignResponse
     */
    id: string;
    /**
     * Hospital identifier
     * @type {string}
     * @memberof CampaignResponse
     */
    hospitalId: string;
    /**
     * Name of the campaign
     * @type {string}
     * @memberof CampaignResponse
     */
    name: string;
    /**
     * Unique coupon code for the campaign
     * @type {string}
     * @memberof CampaignResponse
     */
    couponCode: string;
    /**
     * Item or service for discount
     * @type {string}
     * @memberof CampaignResponse
     */
    discountItem: string;
    /**
     * Discount percentage
     * @type {number}
     * @memberof CampaignResponse
     */
    discountPercentage: number;
    /**
     * Number of coupons available
     * @type {number}
     * @memberof CampaignResponse
     */
    count: number;
    /**
     * Number of coupons used
     * @type {number}
     * @memberof CampaignResponse
     */
    usedCount?: number;
    /**
     * Campaign expiry date
     * @type {string}
     * @memberof CampaignResponse
     */
    expiryDate: string;
    /**
     * Whether the campaign is active
     * @type {boolean}
     * @memberof CampaignResponse
     */
    isActive?: boolean;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof CampaignResponse
     */
    createdAt?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof CampaignResponse
     */
    updatedAt?: string;
}
/**
 * 
 * @export
 * @interface CampaignUpdateRequest
 */
export interface CampaignUpdateRequest {
    /**
     * Name of the campaign
     * @type {string}
     * @memberof CampaignUpdateRequest
     */
    name?: string;
    /**
     * Item or service for discount
     * @type {string}
     * @memberof CampaignUpdateRequest
     */
    discountItem?: string;
    /**
     * Discount percentage
     * @type {number}
     * @memberof CampaignUpdateRequest
     */
    discountPercentage?: number;
    /**
     * Number of coupons available
     * @type {number}
     * @memberof CampaignUpdateRequest
     */
    count?: number;
    /**
     * Campaign expiry date
     * @type {string}
     * @memberof CampaignUpdateRequest
     */
    expiryDate?: string;
    /**
     * Whether the campaign is active
     * @type {boolean}
     * @memberof CampaignUpdateRequest
     */
    isActive?: boolean;
}
/**
 * 
 * @export
 * @interface CreateFlow
 */
export interface CreateFlow {
    /**
     * The ID of the patient this flow is for
     * @type {number}
     * @memberof CreateFlow
     */
    patientId: number;
    /**
     * 
     * @type {Flow}
     * @memberof CreateFlow
     */
    flow: Flow;
}
/**
 * 
 * @export
 * @interface CreateFlowFromFlowTemplateRequest
 */
export interface CreateFlowFromFlowTemplateRequest {
    /**
     * 
     * @type {number}
     * @memberof CreateFlowFromFlowTemplateRequest
     */
    patientId: number;
    /**
     * 
     * @type {number}
     * @memberof CreateFlowFromFlowTemplateRequest
     */
    flowTemplateId: number;
}
/**
 * 
 * @export
 * @interface CreateTerminalSlotRequest
 */
export interface CreateTerminalSlotRequest {
    /**
     * Terminal's unique identifier
     * @type {number}
     * @memberof CreateTerminalSlotRequest
     */
    terminalId: number;
    /**
     * Day of the week
     * @type {string}
     * @memberof CreateTerminalSlotRequest
     */
    day: CreateTerminalSlotRequestDayEnum;
    /**
     * Start time in HH:mm format
     * @type {string}
     * @memberof CreateTerminalSlotRequest
     */
    startTime: string;
    /**
     * End time in HH:mm format
     * @type {string}
     * @memberof CreateTerminalSlotRequest
     */
    endTime: string;
    /**
     * Name/label for the slot (e.g., Morning, Afternoon)
     * @type {string}
     * @memberof CreateTerminalSlotRequest
     */
    name: string;
}


/**
 * @export
 */
export const CreateTerminalSlotRequestDayEnum = {
    Sunday: 'SUNDAY',
    Monday: 'MONDAY',
    Tuesday: 'TUESDAY',
    Wednesday: 'WEDNESDAY',
    Thursday: 'THURSDAY',
    Friday: 'FRIDAY',
    Saturday: 'SATURDAY'
} as const;
export type CreateTerminalSlotRequestDayEnum = typeof CreateTerminalSlotRequestDayEnum[keyof typeof CreateTerminalSlotRequestDayEnum];

/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * User-friendly error message
     * @type {string}
     * @memberof ErrorResponse
     */
    message?: string;
    /**
     * Specific error code for programmatic handling
     * @type {string}
     * @memberof ErrorResponse
     */
    errorCode?: string;
    /**
     * Additional error details
     * @type {string}
     * @memberof ErrorResponse
     */
    details?: string;
    /**
     * Error timestamp in milliseconds
     * @type {number}
     * @memberof ErrorResponse
     */
    timestamp?: number;
}
/**
 * 
 * @export
 * @interface Flow
 */
export interface Flow {
    /**
     * 
     * @type {string}
     * @memberof Flow
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof Flow
     */
    patientId?: number;
    /**
     * 
     * @type {number}
     * @memberof Flow
     */
    hospitalId?: number;
    /**
     * 
     * @type {Array<FlowEntry>}
     * @memberof Flow
     */
    flowEntries?: Array<FlowEntry>;
}
/**
 * 
 * @export
 * @interface FlowEntry
 */
export interface FlowEntry {
    /**
     * 
     * @type {string}
     * @memberof FlowEntry
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof FlowEntry
     */
    terminalTemplateId?: number;
    /**
     * 
     * @type {number}
     * @memberof FlowEntry
     */
    terminalDataId?: number;
    /**
     * 
     * @type {string}
     * @memberof FlowEntry
     */
    comments?: string;
}
/**
 * 
 * @export
 * @interface FlowHistory
 */
export interface FlowHistory {
    /**
     * 
     * @type {number}
     * @memberof FlowHistory
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof FlowHistory
     */
    patientId?: number;
    /**
     * 
     * @type {number}
     * @memberof FlowHistory
     */
    hospitalId?: number;
    /**
     * 
     * @type {Array<FlowHistoryEntry>}
     * @memberof FlowHistory
     */
    flowHistoryEntries?: Array<FlowHistoryEntry>;
}
/**
 * 
 * @export
 * @interface FlowHistoryEntry
 */
export interface FlowHistoryEntry {
    /**
     * 
     * @type {number}
     * @memberof FlowHistoryEntry
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof FlowHistoryEntry
     */
    position?: number;
    /**
     * 
     * @type {string}
     * @memberof FlowHistoryEntry
     */
    comments?: string;
    /**
     * 
     * @type {TerminalData}
     * @memberof FlowHistoryEntry
     */
    terminalData?: TerminalData;
}
/**
 * 
 * @export
 * @interface GenerateOTPRequest
 */
export interface GenerateOTPRequest {
    /**
     * Mobile number of the user
     * @type {string}
     * @memberof GenerateOTPRequest
     */
    phoneNumber?: string;
}
/**
 * 
 * @export
 * @interface GenerateOTPResponse
 */
export interface GenerateOTPResponse {
    /**
     * Status of the OTP generation
     * @type {string}
     * @memberof GenerateOTPResponse
     */
    status?: string;
}
/**
 * 
 * @export
 * @interface GetNotCheckedInCount200Response
 */
export interface GetNotCheckedInCount200Response {
    /**
     * Number of patients in not checked in queue
     * @type {number}
     * @memberof GetNotCheckedInCount200Response
     */
    count?: number;
    /**
     * Hospital identifier
     * @type {number}
     * @memberof GetNotCheckedInCount200Response
     */
    hospitalId?: number;
}
/**
 * 
 * @export
 * @interface LoginEmailSubmitRequest
 */
export interface LoginEmailSubmitRequest {
    /**
     * Email of the user
     * @type {string}
     * @memberof LoginEmailSubmitRequest
     */
    email?: string;
    /**
     * Password of the user
     * @type {string}
     * @memberof LoginEmailSubmitRequest
     */
    password?: string;
}
/**
 * 
 * @export
 * @interface LoginOTPSubmitRequest
 */
export interface LoginOTPSubmitRequest {
    /**
     * Mobile number of the user
     * @type {string}
     * @memberof LoginOTPSubmitRequest
     */
    phoneNumber?: string;
    /**
     * 6 digit OTP received by the user
     * @type {number}
     * @memberof LoginOTPSubmitRequest
     */
    otp: number;
}
/**
 * 
 * @export
 * @interface LoginTokenResponse
 */
export interface LoginTokenResponse {
    /**
     * JWT token for the user
     * @type {string}
     * @memberof LoginTokenResponse
     */
    token?: string;
}
/**
 * Request to update the markDone status for a patient in the queue
 * @export
 * @interface MarkDoneRequest
 */
export interface MarkDoneRequest {
    /**
     * Unique identifier for the patient
     * @type {string}
     * @memberof MarkDoneRequest
     */
    patientId: string;
    /**
     * 0 means no test,1 means echo,2 means ultrasound,3 means both
     * @type {number}
     * @memberof MarkDoneRequest
     */
    markDone: number;
    /**
     * Unique identifier for the terminal
     * @type {number}
     * @memberof MarkDoneRequest
     */
    terminalId: number;
}
/**
 * Response after updating markDone status
 * @export
 * @interface MarkDoneResponse
 */
export interface MarkDoneResponse {
    /**
     * 
     * @type {PatientQueueEntry}
     * @memberof MarkDoneResponse
     */
    entry?: PatientQueueEntry;
}
/**
 * Generic API response wrapper for consistent response structure
 * @export
 * @interface ModelApiResponse
 */
export interface ModelApiResponse {
    /**
     * HTTP status code
     * @type {number}
     * @memberof ModelApiResponse
     */
    statusCode?: number;
    /**
     * Human-readable message describing the result
     * @type {string}
     * @memberof ModelApiResponse
     */
    message?: string;
    /**
     * The actual data payload
     * @type {any}
     * @memberof ModelApiResponse
     */
    data?: any | null;
}
/**
 * Response DTO for moving a patient in the queue
 * @export
 * @interface MovePatientResponse
 */
export interface MovePatientResponse {
    /**
     * 
     * @type {PatientQueueEntry}
     * @memberof MovePatientResponse
     */
    entry?: PatientQueueEntry;
    /**
     * The new position of the patient in the queue (0-based index)
     * @type {number}
     * @memberof MovePatientResponse
     */
    index?: number;
}
/**
 * Request to add a patient to the active queue. All patient details (patientId, name, phone, age, gender, doctor, consultationType) are required and will be used to create a new entry in the active queue.
 * Hospital ID is automatically obtained from the request context.
 * 
 * @export
 * @interface MoveToActiveRequest
 */
export interface MoveToActiveRequest {
    /**
     * Unique identifier for the patient
     * @type {string}
     * @memberof MoveToActiveRequest
     */
    patientId: string;
    /**
     * Patient's full name
     * @type {string}
     * @memberof MoveToActiveRequest
     */
    name: string;
    /**
     * Patient's phone number
     * @type {string}
     * @memberof MoveToActiveRequest
     */
    phone: string;
    /**
     * Patient's age in years
     * @type {number}
     * @memberof MoveToActiveRequest
     */
    age: number;
    /**
     * Patient's gender
     * @type {string}
     * @memberof MoveToActiveRequest
     */
    gender: MoveToActiveRequestGenderEnum;
    /**
     * Type of doctor for consultation
     * @type {string}
     * @memberof MoveToActiveRequest
     */
    doctor: MoveToActiveRequestDoctorEnum;
    /**
     * Type of consultation required
     * @type {string}
     * @memberof MoveToActiveRequest
     */
    consultationType: MoveToActiveRequestConsultationTypeEnum;
    /**
     * Preferred position in active queue (optional, will be calculated if not provided)
     * @type {number}
     * @memberof MoveToActiveRequest
     */
    preferredPosition?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MoveToActiveRequest
     */
    forceAdd?: boolean;
}


/**
 * @export
 */
export const MoveToActiveRequestGenderEnum = {
    Male: 'MALE',
    Female: 'FEMALE',
    Other: 'OTHER'
} as const;
export type MoveToActiveRequestGenderEnum = typeof MoveToActiveRequestGenderEnum[keyof typeof MoveToActiveRequestGenderEnum];

/**
 * @export
 */
export const MoveToActiveRequestDoctorEnum = {
    Docube: 'DOCUBE',
    Other: 'OTHER'
} as const;
export type MoveToActiveRequestDoctorEnum = typeof MoveToActiveRequestDoctorEnum[keyof typeof MoveToActiveRequestDoctorEnum];

/**
 * @export
 */
export const MoveToActiveRequestConsultationTypeEnum = {
    Echo: 'ECHO',
    Ultrasound: 'ULTRASOUND',
    Both: 'BOTH'
} as const;
export type MoveToActiveRequestConsultationTypeEnum = typeof MoveToActiveRequestConsultationTypeEnum[keyof typeof MoveToActiveRequestConsultationTypeEnum];

/**
 * Response when patient is moved to active queue
 * @export
 * @interface MoveToActiveResponse
 */
export interface MoveToActiveResponse {
    /**
     * Whether the operation was successful
     * @type {boolean}
     * @memberof MoveToActiveResponse
     */
    success?: boolean;
    /**
     * Success message
     * @type {string}
     * @memberof MoveToActiveResponse
     */
    message?: string;
    /**
     * 
     * @type {PatientQueueEntry}
     * @memberof MoveToActiveResponse
     */
    patient?: PatientQueueEntry;
    /**
     * New position in active queue
     * @type {number}
     * @memberof MoveToActiveResponse
     */
    newPosition?: number;
    /**
     * Estimated start time in active queue
     * @type {string}
     * @memberof MoveToActiveResponse
     */
    estimatedStartTime?: string;
    /**
     * Timestamp when the move occurred
     * @type {string}
     * @memberof MoveToActiveResponse
     */
    movedAt?: string;
}
/**
 * Request to add a patient to the not checked in queue. All patient details (name, phone, age, gender, doctor, consultationType) are required and will be used to create a new entry in the not checked in queue.
 * Hospital ID is automatically obtained from the request context.
 * 
 * @export
 * @interface MoveToNotCheckedInRequest
 */
export interface MoveToNotCheckedInRequest {
    /**
     * Unique identifier for the patient
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    patientId?: string;
    /**
     * Reason for moving to not checked in queue
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    reason: MoveToNotCheckedInRequestReasonEnum;
    /**
     * Additional notes about the move
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    notes?: string;
    /**
     * Patient's full name
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    name: string;
    /**
     * Patient's phone number
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    phone: string;
    /**
     * Patient's age in years
     * @type {number}
     * @memberof MoveToNotCheckedInRequest
     */
    age: number;
    /**
     * Patient's gender
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    gender: MoveToNotCheckedInRequestGenderEnum;
    /**
     * Type of doctor for consultation
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    doctor: MoveToNotCheckedInRequestDoctorEnum;
    /**
     * Type of consultation required
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    consultationType: MoveToNotCheckedInRequestConsultationTypeEnum;
    /**
     * Original start time (optional, can be set if known)
     * @type {string}
     * @memberof MoveToNotCheckedInRequest
     */
    originalStartTime?: string;
    /**
     * Original token number assigned to the patient (optional)
     * @type {number}
     * @memberof MoveToNotCheckedInRequest
     */
    tokenNumber?: number;
    /**
     * Original position in active queue (optional)
     * @type {number}
     * @memberof MoveToNotCheckedInRequest
     */
    originalPosition?: number;
}


/**
 * @export
 */
export const MoveToNotCheckedInRequestReasonEnum = {
    PatientNotReady: 'PATIENT_NOT_READY',
    Rescheduled: 'RESCHEDULED',
    TechnicalIssue: 'TECHNICAL_ISSUE',
    Other: 'OTHER'
} as const;
export type MoveToNotCheckedInRequestReasonEnum = typeof MoveToNotCheckedInRequestReasonEnum[keyof typeof MoveToNotCheckedInRequestReasonEnum];

/**
 * @export
 */
export const MoveToNotCheckedInRequestGenderEnum = {
    Male: 'MALE',
    Female: 'FEMALE',
    Other: 'OTHER'
} as const;
export type MoveToNotCheckedInRequestGenderEnum = typeof MoveToNotCheckedInRequestGenderEnum[keyof typeof MoveToNotCheckedInRequestGenderEnum];

/**
 * @export
 */
export const MoveToNotCheckedInRequestDoctorEnum = {
    Docube: 'DOCUBE',
    Other: 'OTHER'
} as const;
export type MoveToNotCheckedInRequestDoctorEnum = typeof MoveToNotCheckedInRequestDoctorEnum[keyof typeof MoveToNotCheckedInRequestDoctorEnum];

/**
 * @export
 */
export const MoveToNotCheckedInRequestConsultationTypeEnum = {
    Echo: 'ECHO',
    Ultrasound: 'ULTRASOUND',
    Both: 'BOTH'
} as const;
export type MoveToNotCheckedInRequestConsultationTypeEnum = typeof MoveToNotCheckedInRequestConsultationTypeEnum[keyof typeof MoveToNotCheckedInRequestConsultationTypeEnum];

/**
 * Response when patient is moved to not checked in queue
 * @export
 * @interface MoveToNotCheckedInResponse
 */
export interface MoveToNotCheckedInResponse {
    /**
     * Whether the operation was successful
     * @type {boolean}
     * @memberof MoveToNotCheckedInResponse
     */
    success?: boolean;
    /**
     * Success message
     * @type {string}
     * @memberof MoveToNotCheckedInResponse
     */
    message?: string;
    /**
     * 
     * @type {NotCheckedInPatientEntry}
     * @memberof MoveToNotCheckedInResponse
     */
    patient?: NotCheckedInPatientEntry;
    /**
     * Original position in active queue
     * @type {number}
     * @memberof MoveToNotCheckedInResponse
     */
    originalPosition?: number;
    /**
     * Timestamp when the move occurred
     * @type {string}
     * @memberof MoveToNotCheckedInResponse
     */
    movedAt?: string;
}
/**
 * Patient entry in not checked in queue
 * @export
 * @interface NotCheckedInPatientEntry
 */
export interface NotCheckedInPatientEntry {
    /**
     * Unique identifier for the patient
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    patientId?: string;
    /**
     * Patient's full name
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    name?: string;
    /**
     * Patient's phone number
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    phone?: string;
    /**
     * Patient's age in years
     * @type {number}
     * @memberof NotCheckedInPatientEntry
     */
    age?: number;
    /**
     * Patient's gender
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    gender?: NotCheckedInPatientEntryGenderEnum;
    /**
     * Type of doctor for consultation
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    doctor?: NotCheckedInPatientEntryDoctorEnum;
    /**
     * Type of consultation required
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    consultationType?: NotCheckedInPatientEntryConsultationTypeEnum;
    /**
     * Original start time when patient was in active queue
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    originalStartTime?: string;
    /**
     * Timestamp when patient was moved to not checked in
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    movedToNotCheckedInAt?: string;
    /**
     * Reason for moving to not checked in queue
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    reason?: NotCheckedInPatientEntryReasonEnum;
    /**
     * Additional notes about the move
     * @type {string}
     * @memberof NotCheckedInPatientEntry
     */
    notes?: string;
    /**
     * Original token number assigned to the patient
     * @type {number}
     * @memberof NotCheckedInPatientEntry
     */
    tokenNumber?: number;
    /**
     * Original position in active queue
     * @type {number}
     * @memberof NotCheckedInPatientEntry
     */
    originalPosition?: number;
}


/**
 * @export
 */
export const NotCheckedInPatientEntryGenderEnum = {
    Male: 'MALE',
    Female: 'FEMALE',
    Other: 'OTHER'
} as const;
export type NotCheckedInPatientEntryGenderEnum = typeof NotCheckedInPatientEntryGenderEnum[keyof typeof NotCheckedInPatientEntryGenderEnum];

/**
 * @export
 */
export const NotCheckedInPatientEntryDoctorEnum = {
    Docube: 'DOCUBE',
    Other: 'OTHER'
} as const;
export type NotCheckedInPatientEntryDoctorEnum = typeof NotCheckedInPatientEntryDoctorEnum[keyof typeof NotCheckedInPatientEntryDoctorEnum];

/**
 * @export
 */
export const NotCheckedInPatientEntryConsultationTypeEnum = {
    Echo: 'ECHO',
    Ultrasound: 'ULTRASOUND',
    Both: 'BOTH'
} as const;
export type NotCheckedInPatientEntryConsultationTypeEnum = typeof NotCheckedInPatientEntryConsultationTypeEnum[keyof typeof NotCheckedInPatientEntryConsultationTypeEnum];

/**
 * @export
 */
export const NotCheckedInPatientEntryReasonEnum = {
    PatientNotReady: 'PATIENT_NOT_READY',
    Rescheduled: 'RESCHEDULED',
    TechnicalIssue: 'TECHNICAL_ISSUE',
    Other: 'OTHER'
} as const;
export type NotCheckedInPatientEntryReasonEnum = typeof NotCheckedInPatientEntryReasonEnum[keyof typeof NotCheckedInPatientEntryReasonEnum];

/**
 * Package test mapping entity
 * @export
 * @interface PackageTest
 */
export interface PackageTest {
    /**
     * Unique identifier for the package test mapping
     * @type {number}
     * @memberof PackageTest
     */
    id?: number;
    /**
     * 
     * @type {TestPackage}
     * @memberof PackageTest
     */
    testPackage?: TestPackage;
    /**
     * 
     * @type {TestSubtype}
     * @memberof PackageTest
     */
    testSubtype?: TestSubtype;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof PackageTest
     */
    createdAt?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof PackageTest
     */
    updatedAt?: string;
}
/**
 * Request DTO for creating package test mapping
 * @export
 * @interface PackageTestRequest
 */
export interface PackageTestRequest {
    /**
     * ID of the test package
     * @type {number}
     * @memberof PackageTestRequest
     */
    packageId: number;
    /**
     * ID of the test subtype
     * @type {number}
     * @memberof PackageTestRequest
     */
    testSubtypeId: number;
}
/**
 * Patient queue entry with all relevant information
 * @export
 * @interface PatientQueueEntry
 */
export interface PatientQueueEntry {
    /**
     * Unique identifier for the queue entry
     * @type {string}
     * @memberof PatientQueueEntry
     */
    id?: string;
    /**
     * Unique identifier for the patient
     * @type {string}
     * @memberof PatientQueueEntry
     */
    patientId?: string;
    /**
     * Patient's full name
     * @type {string}
     * @memberof PatientQueueEntry
     */
    name?: string;
    /**
     * Patient's phone number
     * @type {string}
     * @memberof PatientQueueEntry
     */
    phone?: string;
    /**
     * Patient's age in years
     * @type {number}
     * @memberof PatientQueueEntry
     */
    age?: number;
    /**
     * Patient's gender
     * @type {string}
     * @memberof PatientQueueEntry
     */
    gender?: PatientQueueEntryGenderEnum;
    /**
     * Type of doctor for consultation
     * @type {string}
     * @memberof PatientQueueEntry
     */
    doctor?: PatientQueueEntryDoctorEnum;
    /**
     * Estimated or actual start time of the consultation
     * @type {string}
     * @memberof PatientQueueEntry
     */
    startTime?: string;
    /**
     * Type of consultation required
     * @type {string}
     * @memberof PatientQueueEntry
     */
    consultationType?: PatientQueueEntryConsultationTypeEnum;
    /**
     * Current status in the queue
     * @type {string}
     * @memberof PatientQueueEntry
     */
    queueStatus?: PatientQueueEntryQueueStatusEnum;
    /**
     * 0 means no test,1 means echo,2 means ultrasound,3 means both
     * @type {number}
     * @memberof PatientQueueEntry
     */
    markDone?: number;
}


/**
 * @export
 */
export const PatientQueueEntryGenderEnum = {
    Male: 'MALE',
    Female: 'FEMALE',
    Other: 'OTHER'
} as const;
export type PatientQueueEntryGenderEnum = typeof PatientQueueEntryGenderEnum[keyof typeof PatientQueueEntryGenderEnum];

/**
 * @export
 */
export const PatientQueueEntryDoctorEnum = {
    Docube: 'DOCUBE',
    Other: 'OTHER'
} as const;
export type PatientQueueEntryDoctorEnum = typeof PatientQueueEntryDoctorEnum[keyof typeof PatientQueueEntryDoctorEnum];

/**
 * @export
 */
export const PatientQueueEntryConsultationTypeEnum = {
    Echo: 'ECHO',
    Ultrasound: 'ULTRASOUND',
    Both: 'BOTH'
} as const;
export type PatientQueueEntryConsultationTypeEnum = typeof PatientQueueEntryConsultationTypeEnum[keyof typeof PatientQueueEntryConsultationTypeEnum];

/**
 * @export
 */
export const PatientQueueEntryQueueStatusEnum = {
    Active: 'ACTIVE',
    NotCheckedIn: 'NOT_CHECKED_IN'
} as const;
export type PatientQueueEntryQueueStatusEnum = typeof PatientQueueEntryQueueStatusEnum[keyof typeof PatientQueueEntryQueueStatusEnum];

/**
 * 
 * @export
 * @interface ReferralAnalyticsResponse
 */
export interface ReferralAnalyticsResponse {
    /**
     * Total number of referrals
     * @type {number}
     * @memberof ReferralAnalyticsResponse
     */
    totalReferrals?: number;
    /**
     * Total number of campaigns
     * @type {number}
     * @memberof ReferralAnalyticsResponse
     */
    totalCampaigns?: number;
    /**
     * Total value generated
     * @type {number}
     * @memberof ReferralAnalyticsResponse
     */
    totalValue?: number;
    /**
     * Top performing referrers
     * @type {Array<ReferralResponse>}
     * @memberof ReferralAnalyticsResponse
     */
    topReferrers?: Array<ReferralResponse>;
    /**
     * Currently active campaigns
     * @type {Array<CampaignResponse>}
     * @memberof ReferralAnalyticsResponse
     */
    activeCampaigns?: Array<CampaignResponse>;
}
/**
 * 
 * @export
 * @interface ReferralCreateRequest
 */
export interface ReferralCreateRequest {
    /**
     * Name of the referral entity
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    name: string;
    /**
     * Description of the referral
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    description?: string;
    /**
     * Phone number of the referral entity
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    phoneNumber?: string;
    /**
     * Email address of the referral entity
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    email?: string;
    /**
     * Address of the referral entity
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    address?: string;
    /**
     * Type of referrer
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    referrerType?: ReferralCreateRequestReferrerTypeEnum;
    /**
     * Type of referral
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    referralType: ReferralCreateRequestReferralTypeEnum;
    /**
     * Payout amount or percentage
     * @type {string}
     * @memberof ReferralCreateRequest
     */
    payout: string;
}


/**
 * @export
 */
export const ReferralCreateRequestReferrerTypeEnum = {
    Doctor: 'DOCTOR',
    Pharmacy: 'PHARMACY',
    Lab: 'LAB',
    Other: 'OTHER'
} as const;
export type ReferralCreateRequestReferrerTypeEnum = typeof ReferralCreateRequestReferrerTypeEnum[keyof typeof ReferralCreateRequestReferrerTypeEnum];

/**
 * @export
 */
export const ReferralCreateRequestReferralTypeEnum = {
    Referral: 'REFERRAL',
    Campaign: 'CAMPAIGN'
} as const;
export type ReferralCreateRequestReferralTypeEnum = typeof ReferralCreateRequestReferralTypeEnum[keyof typeof ReferralCreateRequestReferralTypeEnum];

/**
 * 
 * @export
 * @interface ReferralResponse
 */
export interface ReferralResponse {
    /**
     * Unique identifier for the referral
     * @type {string}
     * @memberof ReferralResponse
     */
    id: string;
    /**
     * Hospital identifier
     * @type {string}
     * @memberof ReferralResponse
     */
    hospitalId: string;
    /**
     * Name of the referral entity
     * @type {string}
     * @memberof ReferralResponse
     */
    name: string;
    /**
     * Description of the referral
     * @type {string}
     * @memberof ReferralResponse
     */
    description?: string;
    /**
     * Phone number of the referral entity
     * @type {string}
     * @memberof ReferralResponse
     */
    phoneNumber?: string;
    /**
     * Email address of the referral entity
     * @type {string}
     * @memberof ReferralResponse
     */
    email?: string;
    /**
     * Address of the referral entity
     * @type {string}
     * @memberof ReferralResponse
     */
    address?: string;
    /**
     * Type of referrer
     * @type {string}
     * @memberof ReferralResponse
     */
    referrerType?: ReferralResponseReferrerTypeEnum;
    /**
     * Type of referral
     * @type {string}
     * @memberof ReferralResponse
     */
    referralType: ReferralResponseReferralTypeEnum;
    /**
     * Payout amount or percentage
     * @type {string}
     * @memberof ReferralResponse
     */
    payout: string;
    /**
     * Number of referrals made
     * @type {number}
     * @memberof ReferralResponse
     */
    count?: number;
    /**
     * Percentage of total referrals
     * @type {number}
     * @memberof ReferralResponse
     */
    percentage?: number;
    /**
     * Total value generated
     * @type {number}
     * @memberof ReferralResponse
     */
    value?: number;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof ReferralResponse
     */
    createdAt?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof ReferralResponse
     */
    updatedAt?: string;
}


/**
 * @export
 */
export const ReferralResponseReferrerTypeEnum = {
    Doctor: 'DOCTOR',
    Pharmacy: 'PHARMACY',
    Lab: 'LAB',
    Other: 'OTHER'
} as const;
export type ReferralResponseReferrerTypeEnum = typeof ReferralResponseReferrerTypeEnum[keyof typeof ReferralResponseReferrerTypeEnum];

/**
 * @export
 */
export const ReferralResponseReferralTypeEnum = {
    Referral: 'REFERRAL',
    Campaign: 'CAMPAIGN'
} as const;
export type ReferralResponseReferralTypeEnum = typeof ReferralResponseReferralTypeEnum[keyof typeof ReferralResponseReferralTypeEnum];

/**
 * 
 * @export
 * @interface ReferralUpdateRequest
 */
export interface ReferralUpdateRequest {
    /**
     * Name of the referral entity
     * @type {string}
     * @memberof ReferralUpdateRequest
     */
    name?: string;
    /**
     * Description of the referral
     * @type {string}
     * @memberof ReferralUpdateRequest
     */
    description?: string;
    /**
     * Phone number of the referral entity
     * @type {string}
     * @memberof ReferralUpdateRequest
     */
    phoneNumber?: string;
    /**
     * Email address of the referral entity
     * @type {string}
     * @memberof ReferralUpdateRequest
     */
    email?: string;
    /**
     * Address of the referral entity
     * @type {string}
     * @memberof ReferralUpdateRequest
     */
    address?: string;
    /**
     * Type of referrer
     * @type {string}
     * @memberof ReferralUpdateRequest
     */
    referrerType?: ReferralUpdateRequestReferrerTypeEnum;
    /**
     * Payout amount or percentage
     * @type {string}
     * @memberof ReferralUpdateRequest
     */
    payout?: string;
    /**
     * Number of referrals made
     * @type {number}
     * @memberof ReferralUpdateRequest
     */
    count?: number;
}


/**
 * @export
 */
export const ReferralUpdateRequestReferrerTypeEnum = {
    Doctor: 'DOCTOR',
    Pharmacy: 'PHARMACY',
    Lab: 'LAB',
    Other: 'OTHER'
} as const;
export type ReferralUpdateRequestReferrerTypeEnum = typeof ReferralUpdateRequestReferrerTypeEnum[keyof typeof ReferralUpdateRequestReferrerTypeEnum];

/**
 * Response when patient is removed from not checked in queue
 * @export
 * @interface RemoveNotCheckedInResponse
 */
export interface RemoveNotCheckedInResponse {
    /**
     * Whether the operation was successful
     * @type {boolean}
     * @memberof RemoveNotCheckedInResponse
     */
    success?: boolean;
    /**
     * Success message
     * @type {string}
     * @memberof RemoveNotCheckedInResponse
     */
    message?: string;
    /**
     * 
     * @type {NotCheckedInPatientEntry}
     * @memberof RemoveNotCheckedInResponse
     */
    removedPatient?: NotCheckedInPatientEntry;
    /**
     * Timestamp when the removal occurred
     * @type {string}
     * @memberof RemoveNotCheckedInResponse
     */
    removedAt?: string;
}
/**
 * Response DTO for removing a patient from the queue
 * @export
 * @interface RemovePatientResponse
 */
export interface RemovePatientResponse {
    /**
     * 
     * @type {PatientQueueEntry}
     * @memberof RemovePatientResponse
     */
    entry?: PatientQueueEntry;
}
/**
 * WhatsApp message confirmation entry stored in Redis
 * @export
 * @interface SuperMessageProUltraMax
 */
export interface SuperMessageProUltraMax {
    /**
     * Unique identifier for the message confirmation
     * @type {number}
     * @memberof SuperMessageProUltraMax
     */
    id?: number;
    /**
     * Patient's phone number
     * @type {string}
     * @memberof SuperMessageProUltraMax
     */
    phoneNumber?: string;
    /**
     * Patient's full name
     * @type {string}
     * @memberof SuperMessageProUltraMax
     */
    name?: string;
    /**
     * Token time as epoch milliseconds
     * @type {number}
     * @memberof SuperMessageProUltraMax
     */
    tokenTime?: number;
    /**
     * Patient's unique identifier
     * @type {number}
     * @memberof SuperMessageProUltraMax
     */
    patientId?: number;
    /**
     * Patient's position in the queue
     * @type {number}
     * @memberof SuperMessageProUltraMax
     */
    position?: number;
    /**
     * Token number assigned to the patient
     * @type {number}
     * @memberof SuperMessageProUltraMax
     */
    tokenNumber?: number;
    /**
     * Type of WhatsApp message to be sent
     * @type {string}
     * @memberof SuperMessageProUltraMax
     */
    messageType?: SuperMessageProUltraMaxMessageTypeEnum;
}


/**
 * @export
 */
export const SuperMessageProUltraMaxMessageTypeEnum = {
    OneHrReminder: 'OneHrReminder',
    PostCheckin: 'PostCheckin',
    YoureNext: 'YoureNext',
    InternalQueueChange: 'InternalQueueChange',
    AppointmentConfirmation: 'AppointmentConfirmation'
} as const;
export type SuperMessageProUltraMaxMessageTypeEnum = typeof SuperMessageProUltraMaxMessageTypeEnum[keyof typeof SuperMessageProUltraMaxMessageTypeEnum];

/**
 * 
 * @export
 * @interface TerminalAttributeData
 */
export interface TerminalAttributeData {
    /**
     * 
     * @type {number}
     * @memberof TerminalAttributeData
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TerminalAttributeData
     */
    terminalAttributeTemplateId?: number;
    /**
     * 
     * @type {Array<TerminalAttributeFieldData>}
     * @memberof TerminalAttributeData
     */
    terminalAttributeFieldDataList?: Array<TerminalAttributeFieldData>;
}
/**
 * 
 * @export
 * @interface TerminalAttributeDataCreate
 */
export interface TerminalAttributeDataCreate {
    /**
     * ID of the parent TerminalData
     * @type {number}
     * @memberof TerminalAttributeDataCreate
     */
    terminalDataId: number;
    /**
     * ID of the associated TerminalAttributeTemplate
     * @type {number}
     * @memberof TerminalAttributeDataCreate
     */
    terminalAttributeTemplateId: number;
}
/**
 * 
 * @export
 * @interface TerminalAttributeFieldData
 */
export interface TerminalAttributeFieldData {
    /**
     * 
     * @type {number}
     * @memberof TerminalAttributeFieldData
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TerminalAttributeFieldData
     */
    terminalAttributeFieldTemplateId?: number;
    /**
     * Field value
     * @type {string}
     * @memberof TerminalAttributeFieldData
     */
    value?: string;
}
/**
 * 
 * @export
 * @interface TerminalAttributeFieldDataCreate
 */
export interface TerminalAttributeFieldDataCreate {
    /**
     * ID of the parent TerminalAttributeData
     * @type {number}
     * @memberof TerminalAttributeFieldDataCreate
     */
    terminalAttributeDataId: number;
    /**
     * ID of the associated TerminalAttributeFieldTemplate
     * @type {number}
     * @memberof TerminalAttributeFieldDataCreate
     */
    terminalAttributeFieldTemplateId: number;
    /**
     * The actual value for this field
     * @type {string}
     * @memberof TerminalAttributeFieldDataCreate
     */
    value: string;
}
/**
 * 
 * @export
 * @interface TerminalAttributeFieldTemplate
 */
export interface TerminalAttributeFieldTemplate {
    /**
     * Unique identifier for the terminal attribute field template
     * @type {number}
     * @memberof TerminalAttributeFieldTemplate
     */
    id?: number;
    /**
     * Name of the field
     * @type {string}
     * @memberof TerminalAttributeFieldTemplate
     */
    name?: string;
    /**
     * Enum value of field type
     * @type {string}
     * @memberof TerminalAttributeFieldTemplate
     */
    fieldType?: TerminalAttributeFieldTemplateFieldTypeEnum;
    /**
     * Optional description of the field
     * @type {string}
     * @memberof TerminalAttributeFieldTemplate
     */
    description?: string;
    /**
     * Indicates whether the field is required
     * @type {boolean}
     * @memberof TerminalAttributeFieldTemplate
     */
    isRequired?: boolean;
}


/**
 * @export
 */
export const TerminalAttributeFieldTemplateFieldTypeEnum = {
    String: 'STRING',
    Doctor: 'DOCTOR',
    File: 'FILE',
    ClockTime: 'CLOCK_TIME',
    ClockDate: 'CLOCK_DATE',
    ClockDateTime: 'CLOCK_DATE_TIME',
    Timer: 'TIMER'
} as const;
export type TerminalAttributeFieldTemplateFieldTypeEnum = typeof TerminalAttributeFieldTemplateFieldTypeEnum[keyof typeof TerminalAttributeFieldTemplateFieldTypeEnum];

/**
 * 
 * @export
 * @interface TerminalAttributeTemplate
 */
export interface TerminalAttributeTemplate {
    /**
     * Unique identifier for the terminal attribute template
     * @type {number}
     * @memberof TerminalAttributeTemplate
     */
    id?: number;
    /**
     * Name of the attribute template
     * @type {string}
     * @memberof TerminalAttributeTemplate
     */
    name?: string;
    /**
     * Pricing information for the attribute group
     * @type {number}
     * @memberof TerminalAttributeTemplate
     */
    pricing?: number;
    /**
     * 
     * @type {Array<TerminalAttributeFieldTemplate>}
     * @memberof TerminalAttributeTemplate
     */
    terminalAttributeFieldTemplateList?: Array<TerminalAttributeFieldTemplate>;
}
/**
 * 
 * @export
 * @interface TerminalData
 */
export interface TerminalData {
    /**
     * 
     * @type {number}
     * @memberof TerminalData
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TerminalData
     */
    terminalTemplateId?: number;
    /**
     * 
     * @type {Array<TerminalAttributeData>}
     * @memberof TerminalData
     */
    terminalAttributeDataList?: Array<TerminalAttributeData>;
}
/**
 * 
 * @export
 * @interface TerminalDataCreate
 */
export interface TerminalDataCreate {
    /**
     * ID of the associated TerminalTemplate
     * @type {number}
     * @memberof TerminalDataCreate
     */
    terminalTemplateId: number;
}
/**
 * 
 * @export
 * @interface TerminalSlotResponse
 */
export interface TerminalSlotResponse {
    /**
     * 
     * @type {number}
     * @memberof TerminalSlotResponse
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof TerminalSlotResponse
     */
    terminalId?: number;
    /**
     * 
     * @type {string}
     * @memberof TerminalSlotResponse
     */
    startTime?: string;
    /**
     * 
     * @type {string}
     * @memberof TerminalSlotResponse
     */
    endTime?: string;
    /**
     * (Optional) Day of the week to filter the slots.
     * @type {string}
     * @memberof TerminalSlotResponse
     */
    day?: TerminalSlotResponseDayEnum;
    /**
     * Name/label for the slot (e.g., Morning, Afternoon)
     * @type {string}
     * @memberof TerminalSlotResponse
     */
    name?: string;
}


/**
 * @export
 */
export const TerminalSlotResponseDayEnum = {
    Sunday: 'SUNDAY',
    Monday: 'MONDAY',
    Tuesday: 'TUESDAY',
    Wednesday: 'WEDNESDAY',
    Thursday: 'THURSDAY',
    Friday: 'FRIDAY',
    Saturday: 'SATURDAY'
} as const;
export type TerminalSlotResponseDayEnum = typeof TerminalSlotResponseDayEnum[keyof typeof TerminalSlotResponseDayEnum];

/**
 * 
 * @export
 * @interface TerminalTemplate
 */
export interface TerminalTemplate {
    /**
     * Unique identifier for the terminal template
     * @type {number}
     * @memberof TerminalTemplate
     */
    id?: number;
    /**
     * Name of the terminal template
     * @type {string}
     * @memberof TerminalTemplate
     */
    name?: string;
    /**
     * Optional description of the terminal template
     * @type {string}
     * @memberof TerminalTemplate
     */
    description?: string;
    /**
     * 
     * @type {Array<TerminalAttributeTemplate>}
     * @memberof TerminalTemplate
     */
    terminalAttributeTemplateList?: Array<TerminalAttributeTemplate>;
}
/**
 * Test category entity
 * @export
 * @interface TestCategory
 */
export interface TestCategory {
    /**
     * Unique identifier for the test category
     * @type {number}
     * @memberof TestCategory
     */
    id?: number;
    /**
     * Name of the test category
     * @type {string}
     * @memberof TestCategory
     */
    name?: string;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof TestCategory
     */
    createdAt?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof TestCategory
     */
    updatedAt?: string;
}
/**
 * Request DTO for creating/updating test category
 * @export
 * @interface TestCategoryRequest
 */
export interface TestCategoryRequest {
    /**
     * Name of the test category
     * @type {string}
     * @memberof TestCategoryRequest
     */
    name: string;
}
/**
 * Test package entity
 * @export
 * @interface TestPackage
 */
export interface TestPackage {
    /**
     * Unique identifier for the test package
     * @type {number}
     * @memberof TestPackage
     */
    id?: number;
    /**
     * Name of the test package
     * @type {string}
     * @memberof TestPackage
     */
    name?: string;
    /**
     * Description of the test package
     * @type {string}
     * @memberof TestPackage
     */
    description?: string;
    /**
     * Package price in Indian Rupees
     * @type {number}
     * @memberof TestPackage
     */
    priceInr?: number;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof TestPackage
     */
    createdAt?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof TestPackage
     */
    updatedAt?: string;
}
/**
 * Request DTO for creating/updating test package
 * @export
 * @interface TestPackageRequest
 */
export interface TestPackageRequest {
    /**
     * Name of the test package
     * @type {string}
     * @memberof TestPackageRequest
     */
    name: string;
    /**
     * Description of the test package
     * @type {string}
     * @memberof TestPackageRequest
     */
    description?: string;
    /**
     * Package price in Indian Rupees
     * @type {number}
     * @memberof TestPackageRequest
     */
    priceInr: number;
}
/**
 * Test subtype entity
 * @export
 * @interface TestSubtype
 */
export interface TestSubtype {
    /**
     * Unique identifier for the test subtype
     * @type {number}
     * @memberof TestSubtype
     */
    id?: number;
    /**
     * 
     * @type {TestCategory}
     * @memberof TestSubtype
     */
    testCategory?: TestCategory;
    /**
     * Name of the test subtype
     * @type {string}
     * @memberof TestSubtype
     */
    name?: string;
    /**
     * Approximate price in Indian Rupees
     * @type {number}
     * @memberof TestSubtype
     */
    approxPriceInr?: number;
    /**
     * Creation timestamp
     * @type {string}
     * @memberof TestSubtype
     */
    createdAt?: string;
    /**
     * Last update timestamp
     * @type {string}
     * @memberof TestSubtype
     */
    updatedAt?: string;
}
/**
 * Request DTO for creating/updating test subtype
 * @export
 * @interface TestSubtypeRequest
 */
export interface TestSubtypeRequest {
    /**
     * ID of the test category
     * @type {number}
     * @memberof TestSubtypeRequest
     */
    categoryId: number;
    /**
     * Name of the test subtype
     * @type {string}
     * @memberof TestSubtypeRequest
     */
    name: string;
    /**
     * Approximate price in Indian Rupees
     * @type {number}
     * @memberof TestSubtypeRequest
     */
    approxPriceInr: number;
}
/**
 * Request to update patient timing in not checked in queue
 * @export
 * @interface UpdateNotCheckedInTimingRequest
 */
export interface UpdateNotCheckedInTimingRequest {
    /**
     * New preferred start time for the patient
     * @type {string}
     * @memberof UpdateNotCheckedInTimingRequest
     */
    newStartTime: string;
    /**
     * Reason for timing update
     * @type {string}
     * @memberof UpdateNotCheckedInTimingRequest
     */
    reason?: string;
}
/**
 * Request DTO for updating a slot
 * @export
 * @interface UpdateTerminalSlotRequest
 */
export interface UpdateTerminalSlotRequest {
    /**
     * Day of the week
     * @type {string}
     * @memberof UpdateTerminalSlotRequest
     */
    day: UpdateTerminalSlotRequestDayEnum;
    /**
     * Start time in HH:mm format
     * @type {string}
     * @memberof UpdateTerminalSlotRequest
     */
    startTime: string;
    /**
     * End time in HH:mm format
     * @type {string}
     * @memberof UpdateTerminalSlotRequest
     */
    endTime: string;
    /**
     * Name/label for the slot (e.g., Morning, Afternoon)
     * @type {string}
     * @memberof UpdateTerminalSlotRequest
     */
    name: string;
}


/**
 * @export
 */
export const UpdateTerminalSlotRequestDayEnum = {
    Sunday: 'SUNDAY',
    Monday: 'MONDAY',
    Tuesday: 'TUESDAY',
    Wednesday: 'WEDNESDAY',
    Thursday: 'THURSDAY',
    Friday: 'FRIDAY',
    Saturday: 'SATURDAY'
} as const;
export type UpdateTerminalSlotRequestDayEnum = typeof UpdateTerminalSlotRequestDayEnum[keyof typeof UpdateTerminalSlotRequestDayEnum];

