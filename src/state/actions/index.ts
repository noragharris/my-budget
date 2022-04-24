import { ActionType } from '../action-types';

interface GetTransactionsAction {
  type: ActionType.GET_TRANSACTIONS;
}

interface GetTransactionsActionSuccess {
  type: ActionType.GET_TRANSACTIONS_SUCCESS;
  payload: string[]; // TODO: have this return full transaction data
}

interface GetTransactionsActionError {
  type: ActionType.GET_TRANSACTIONS_ERROR;
  payload: string;
}

export type Action =
  | GetTransactionsAction
  | GetTransactionsActionSuccess
  | GetTransactionsActionError;
