import Airtable from 'airtable'

export type Transactions = {
    success: boolean;
    data: Airtable.Record<any>[];
    error: string;
}