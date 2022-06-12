import {WorkshopModel} from "./workshopModels";
import {CustomerModel} from "./customerModels";
import {UserModel} from "./userModels";

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

export interface RetrievedWorkshopShiftModel {
    _id: string
    clientId: string,
    workshopId: string,
    workshop: WorkshopModel
    client: CustomerModel
    maximumParticipants: number
    location: LocationModel
    date: Date
    availableUntil: Date
    extraInfo: string
    level: string
    timestamps: Array<TimeStampModel>
    tariff: number
    total_Amount: number
    participants: Array<any>
    participantUsers: UserModel[]
    candidateUsers: UserModel[]
    candidates: Array<any>
    targetAudience: string

}