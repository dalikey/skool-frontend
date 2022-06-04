export interface CredentialsModel {
    firstName: string;
    lastName: string;
    role: string;
    token: string;
    isActive: boolean;
}

export interface LoginModel {
    emailAddress: string;
    password: string;
}

export interface RegistrationModel {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    passwordConfirm: string;
}

export interface ForgotPasswordModel {
    password: string;
    passwordConfirm: string;
}
