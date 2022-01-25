export interface UserModel {
    name: string;
    phoneNumber: string;
    email?: string;
    payments: Donate[];
    share: ShareModel[];
}

export interface Donate {
    year: number;
    month: number;
    tk: number;
    paymentMethodType?: string;
    paymentDate?: Date;
}
export interface ShareModel {
    phoneNumber?: string;
}