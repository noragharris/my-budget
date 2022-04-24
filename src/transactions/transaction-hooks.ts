import Airtable from 'airtable';
import { Transactions } from '../types';

export const useTransactions = (
  maxRecords: number,
  fields?: string[],
  filterByFormula?: string,
  view: string = 'Grid view'
): Promise<Transactions> => {
  const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY
  const baseId = process.env.REACT_APP_AIRTABLE_DATABASE
  const tableName = 'Transactions'

  if (
    !apiKey ||
    !baseId ||
    apiKey === '' ||
    baseId === ''
  ) {
    return new Promise((resolve, reject) =>
      resolve(returnError('missing parameters'))
    );
  }

  const selectOpts = {
    maxRecords,
    view,
    ...(fields) && {fields},
    ...(filterByFormula) && {filterByFormula}
  }

  const output: any[] = [];
  const base = new Airtable({ apiKey }).base(baseId);
  const getData: Promise<Transactions> = new Promise(
    (resolve, reject) =>
      base(tableName)
        .select(selectOpts)
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