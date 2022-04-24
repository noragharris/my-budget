import Airtable from 'airtable';
import { Transaction } from '../../types';
import { ActionType } from '../action-types';

interface GetTransactionsAction {
  type: ActionType.GET_TRANSACTIONS;
}

interface GetTransactionsActionSuccess {
  type: ActionType.GET_TRANSACTIONS_SUCCESS;
  payload: Airtable.Record<Transaction>[];
}

interface GetTransactionsActionError {
  type: ActionType.GET_TRANSACTIONS_ERROR;
  payload: string;
}

export type Action =
  | GetTransactionsAction
  | GetTransactionsActionSuccess
  | GetTransactionsActionError;
