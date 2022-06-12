export interface CustomerModel {
    _id: string;
    name: string;
    contact: ContactModel;
    location: LocationModel;
    logo: string;
}

interface ContactModel {
    emailAddress: string;
    phoneNumber: string;
}

interface LocationModel {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}