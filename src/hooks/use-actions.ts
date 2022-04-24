import { useAppDispatch } from '../state';
import { bindActionCreators } from 'redux';
import * as effects from '../effects';

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(effects, dispatch);
};
