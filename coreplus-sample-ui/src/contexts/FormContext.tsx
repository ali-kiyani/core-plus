import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, FormState } from '../types';
import { FormReducer } from '../reducers/FormReducer';

interface FormContextType {
  state: FormState;
  dispatch: Dispatch<Action>;
}

const initialState: FormContextType = {
  state: {
    practitioner: '',
    dateFrom: '',
    dateTo: '',
  },
  dispatch: () => undefined,
};

const FormContext = createContext<FormContextType>(initialState);

interface FormContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const FormProvider: React.FC<FormContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(FormReducer, initialState.state);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
