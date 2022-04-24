import { useAppDispatch, effects } from '../state';
import { bindActionCreators } from 'redux';

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(effects, dispatch);
};
