import {WorkshopModel} from "./workshopModels";
import {CustomerModel} from "./customerModels";
import {UserModel} from "./userModels";

export interface WorkshopShiftModel {
    _id: string
    clientId: string,
    workshopId: string,
    maximumParticipants: number;
    extraInfo: string;
    location: LocationModel;
    targetAudience: string,
    level: string,
    date: Date,
    availableUntil: Date
    dayRate?: number
    timestamps: Array<TimeStampModel>
}

interface LocationModel {
    address: string,
    country: "Nederland" | "België",
    postalCode: string,
    city: string
}

export interface TimeStampModel {
    startTime: string;
    title: string;
    endTime: string;
}

export interface RetrievedWorkshopShiftModel {
    dayRate?: number;
    hourRate?: number
    _id: string
    clientId?: string,
    workshopId?: string,
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