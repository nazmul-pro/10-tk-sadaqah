export interface IUserModel {
    name: string;
    phoneNumber?: string;
    email?: string;
    isActive?: boolean;
    payments?: IDonate[];
    share?: IShare[];
}

export interface IDonate {
    year: number;
    month: number;
    tk: number;
    paymentMethodType?: string;
    paymentDate?: Date;
}
export interface IShare {
    message: string;
    phoneNumber: string;//all number with json stringfy.
}