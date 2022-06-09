export interface RegistrationModel {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

export interface UserProfileModel {
    firstName: string;
    lastName: string;
    emailAddress: string;
    role: 'owner' | 'user';
    isActive: boolean;
    _id: string;
}

export interface UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    role: 'owner' | 'user';
    isActive: boolean | null;
}