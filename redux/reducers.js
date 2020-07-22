import { combineReducers } from 'redux';
import settings from './settings/reducer';
import signUp from './sign-up/reducer';

const allReducers = combineReducers({
  settings,
  signUp,
});
export default allReducers;
