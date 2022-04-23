import Airtable from 'airtable';
import { Transactions } from './types';

export const useAirtable = (
  apiKey: string | undefined,
  baseId: string | undefined,
  tableName: string,
  view: string = 'Grid view',
  maxRecords: number = 10
): Promise<Transactions> => {
  if (
    !apiKey ||
    !baseId ||
    !tableName ||
    apiKey === '' ||
    baseId === '' ||
    tableName === ''
  ) {
    return new Promise((resolve, reject) =>
      resolve(returnError('missing parameters'))
    );
  }

  const output: any[] = [];
  const base = new Airtable({ apiKey }).base(baseId);
  const getData: Promise<Transactions> = new Promise(
    (resolve, reject) =>
      base(tableName)
        .select({ maxRecords, view })
        .eachPage(
          function page(records, fetchNextPage) {
            records.map((record) => output.push(record.fields));
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              resolve(returnError(err));
            }
            resolve(returnSuccess(output));
          }
        )
  );

  return getData;
};

const returnSuccess = (data: any): Transactions => ({
  success: true,
  data,
  error: '',
});

const returnError = (error: any): Transactions => ({
  success: false,
  data: [],
  error,
});