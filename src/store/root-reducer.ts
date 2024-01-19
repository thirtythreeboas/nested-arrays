import {combineReducers} from '@reduxjs/toolkit';
import {form} from '@/store/form/form';
import {NameSpace} from '@/const';

export const rootReducer = combineReducers({
  [NameSpace.FORM]: form.reducer,
});
