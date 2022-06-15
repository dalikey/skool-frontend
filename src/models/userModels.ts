import { WorkshopModel } from './workshopModels';
export interface RegistrationModel {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

export interface UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    role: 'owner' | 'user';
    isActive: boolean | null;
}

export interface UserProfileModel {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    role: 'owner' | 'user';
    isActive: boolean;
    nationality?: 'nl' | 'be';
    gender?: 'm' | 'f';
    dateOfBirth?: Date;
    placeOfBirth?: string;
    countryOfOrigin?: string;
    mobileNumber?: string;
    location?: locationBody;
    paymentInfo?: paymentBody;
    transport?: transportBody;
    kvkNumber?: string;
    vatID?: string;
    workshopPreferences?: WorkshopModel[] | string[];
    levelPreferences?: string[];
    emailCampaigns?: boolean;
    textCampaigns?: boolean;
    hourRate?: number;
    contractType?: 'freelancer' | 'full-time';
}

interface locationBody {
    address: string;
    postalCode: string;
    city: string;
    country?: 'nl' | 'be';
}

interface paymentBody {
    IBAN?: string;
    BIC?: string;
}

interface transportBody {
    hasDriversLicense: boolean;
    hasVehicle: boolean;
}

export const defaultUserProfile: UserProfileModel = {
    _id: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    role: 'user',
    isActive: false,
    nationality: undefined,
    gender: undefined,
    dateOfBirth: undefined,
    placeOfBirth: '',
    countryOfOrigin: '',
    mobileNumber: '',
    location: {
        address: '',
        postalCode: '',
        city: '',
        country: undefined,
    },
    paymentInfo: {
        IBAN: '',
        BIC: '',
    },
    transport: {
        hasDriversLicense: false,
        hasVehicle: false,
    },
    kvkNumber: '',
    vatID: '',
    hourRate: 0,
    workshopPreferences: [],
    levelPreferences: [],
    emailCampaigns: false,
    textCampaigns: false,
};
