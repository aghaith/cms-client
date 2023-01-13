import { DropDownOption } from 'interfaces/common.model';

export class Campaign {
    _id?: string;
    name?: string;
    type?: string;
    accountId?: number;
    dateCreated?: string; 
    contacts?: string[];
}

export class ClonedCampaign {
    name?: string;
    type?: string;
    dateCreated?: Date;
    copy?: boolean;
}

export class NewCampaign {
    name?: string;
    type?: string;
    accountId?: number;
    contacts?: DropDownOption[];
}