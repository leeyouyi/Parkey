import {createStore, combineReducers} from 'redux';
import {
  loginReducer,
  userInfoReducer,
  userRegisterReducer,
  userConfirmPwdReducer,
  userPasswordReducer,
  userAddLPReducer,
  userModifyLPReducer,
  userSelectLPReducer,
  userUpdateLPReducer,
  userLoadingReducer,
  userUpdateListReducer
} from '../reducer/user';

const rootReducer = combineReducers({
  loginReducer,
  userInfoReducer,
  userRegisterReducer,
  userConfirmPwdReducer,
  userPasswordReducer,
  userAddLPReducer,
  userModifyLPReducer,
  userSelectLPReducer,
  userUpdateLPReducer,
  userLoadingReducer,
  userUpdateListReducer
});

const store = createStore(rootReducer);

export default store;
