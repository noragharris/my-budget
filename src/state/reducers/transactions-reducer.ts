import Airtable from 'airtable';
import { Transaction } from '../../types';
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface TransactionsState {
  loading: boolean;
  error: string | null;
  data: Airtable.Record<Transaction>[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

export const transactionsReducer = (
  state: TransactionsState = initialState,
  action: Action,
): TransactionsState => {
  switch (action.type) {
    case ActionType.GET_TRANSACTIONS:
      return { loading: true, error: null, data: [] };
    case ActionType.GET_TRANSACTIONS_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.GET_TRANSACTIONS_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};
