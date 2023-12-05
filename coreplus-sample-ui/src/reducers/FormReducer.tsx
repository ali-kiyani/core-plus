import { FORM_ACTIONS } from '../constants/ReducerActions';
import { Action, FormState } from '../types';

const initState: FormState = {
  practitioner: '',
  dateFrom: '',
  dateTo: '',
};

export const FormReducer = (state: FormState = initState, action: Action) => {
  switch (action.type) {
    case FORM_ACTIONS.SET_PRACTITIONER:
      return { ...state, practitioner: action.payload };

    case FORM_ACTIONS.SET_DATE_FROM:
      return { ...state, dateFrom: action.payload };

    case FORM_ACTIONS.SET_DATE_TO:
      return { ...state, dateTo: action.payload };

    case FORM_ACTIONS.CLEAR_DATES:
      return {
        ...state,
        dateFrom: initState.dateFrom,
        dateTo: initState.dateTo,
      };

    case FORM_ACTIONS.RESET:
      return { ...state, ...initState };

    default:
      return { ...state };
  }
};
