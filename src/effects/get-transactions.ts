import { Dispatch } from 'redux';
import { ActionType } from '../state/action-types';
import { Action } from '../state/actions';
import Airtable from 'airtable';
import { Transactions } from '../types';

type GetTransactionsQueryParams = {
  maxRecords?: number;
  view?: string;
  returnFields?: string[];
  filterByCategory?: string;
};

const queryByCategory = (searchTerm: string): string => {
  return `category = "${searchTerm}"`;
};

export const getTransactions = (request?: GetTransactionsQueryParams) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.GET_TRANSACTIONS });

    const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
    const baseId = process.env.REACT_APP_AIRTABLE_DATABASE;
    const tableName = 'Transactions';

    const dispatchError = (error: string) => {
      dispatch({
        type: ActionType.GET_TRANSACTIONS_ERROR,
        payload: error,
      });
    };

    try {
      if (!apiKey || !baseId || apiKey === '' || baseId === '') {
        return dispatchError('Missing Parameters');
      }

      const { maxRecords, view, returnFields, filterByCategory } =
        request || {};

      const selectOpts = {
        ...(maxRecords ? { maxRecords: maxRecords } : { maxRecords: 10 }),
        ...(view ? { view: view } : { view: 'Grid view' }),
        ...(returnFields ? { fields: returnFields } : null),
        ...(filterByCategory
          ? { filterByFormula: queryByCategory(filterByCategory) }
          : null),
      };

      const output: Transactions = [];
      const base = new Airtable({ apiKey }).base(baseId);
      const response = await base(tableName)
        .select(selectOpts)
        .eachPage(
          function page(records, fetchNextPage) {
            records.map((record) => output.push(record._rawJson));
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              dispatchError(err.message);
              return;
            }
            dispatch({
              type: ActionType.GET_TRANSACTIONS_SUCCESS,
              payload: output,
            });
          },
        );
      return response;
    } catch (error: any) {
      dispatchError(error.message);
    }
  };
};
