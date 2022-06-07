export interface WorkshopModel {
    _id: string;
    name: string;
    city: string;
    street: string;
    description: string;
    // date: Date;
    maxParticipants: number;
    imageUrl: string;
    userId: string;
    isActive: boolean | null;
}
