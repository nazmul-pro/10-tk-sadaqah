export class DonateModel {
    name: string = '';
    phoneNumber: string = '';
    email?: string = '';
    payments: Donate[] = [];
    share: ShareModel[] = [];
}

export class Donate {
    year: number = 0;
    month: number = 0;
    tk: number = 0;
    paymentMethodType?: string = '';
    paymentDate?: Date = new Date();
}
export class ShareModel {
    phoneNumber?: string;
}