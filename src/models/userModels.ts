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
    transportBody?: transportBody;
    kvkNumber?: string;
    vatId?: string;
    workshopPreferences?: string[];
    emailCampaigns?: boolean;
    textCampaigns?: boolean;
}

interface locationBody {
    address: string;
    postalCode: string;
    city: string;
    country: 'nl' | 'be';
}

interface paymentBody {
    IBAN?: string;
    BIC?: string;
}

interface transportBody {
    hasDriversLicense: boolean;
    hasVehicle: boolean;
}

