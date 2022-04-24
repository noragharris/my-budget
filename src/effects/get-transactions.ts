import { Dispatch } from 'redux';
import { ActionType } from '../state/action-types';
import { Action } from '../state/actions';
import Airtable from 'airtable';

export const getTransactions = (
  maxRecords: number = 10,
  view: string = 'Grid view',
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.GET_TRANSACTIONS });

    const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
    const baseId = process.env.REACT_APP_AIRTABLE_DATABASE;
    const tableName = 'Transactions';

    const dispatchError = (error: string) => {
      return dispatch({
        type: ActionType.GET_TRANSACTIONS_ERROR,
        payload: error,
      });
    };

    try {
      if (!apiKey || !baseId || apiKey === '' || baseId === '') {
        return dispatchError('Missing Parameters');
      }

      const output: any[] = [];
      const base = new Airtable({ apiKey }).base(baseId);
      const response = await base(tableName)
        .select({ maxRecords, view })
        .eachPage(
          function page(records, fetchNextPage) {
            records.map((record) =>
              output.push(record.fields.transactionDescription),
            );
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
