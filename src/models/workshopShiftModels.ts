export interface WorkshopShiftModel {
    clientId: string,
    workshopId: string,
    maximumParticipants: number;
    extraInfo: string;
    location: LocationModel;
    targetAudience: string,
    level: string,
    date: Date,
    availableUntil: Date
    hourRate?: number
    dayRate?: number
    timestamps: Array<TimeStampModel>
}

interface LocationModel {
    address: string,
    country: "Nederland" | "België",
    postalCode: string,
    city: string
}

interface TimeStampModel {
    startTime: string
    endTime: string
}