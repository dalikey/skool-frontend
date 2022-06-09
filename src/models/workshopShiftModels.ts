export interface WorkshopShiftModel {
    clientId: string,
    function: string;
    maxAmountOfParticipants: number;
    details: string;
    location: LocationModel;
}

interface LocationModel {
    address: string,
    country: "Nederland" | "België",
    postcode: string,
    city: string,
}