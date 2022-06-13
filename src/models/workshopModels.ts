export interface WorkshopModel {
    _id: string;
    name: string;
    content: string;
    materials: string[];
    isActive: boolean | null;
}
