import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, ConfigurationState } from '../types';
import { ConfigurationsReducer } from '../reducers/ConfigurationsReducer';

interface ConfigurationsContextType {
  state: ConfigurationState;
  dispatch: Dispatch<Action>;
}

const initialState = {
  state: {
    isLoadingPractitionerList: true,
    isReportGenerated: false,
    currentRevenuesPage: 0,
    currentAppointmentsPage: 0,
    recordsPerPage: 10,
    showAppointmentDetails: false,
    showAppointments: false,
    selectedReportMonth: '',
  },
  dispatch: () => undefined,
};

const ConfigurationsContext =
  createContext<ConfigurationsContextType>(initialState);

interface ConfigurationsContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const ConfigurationsProvider: React.FC<
  ConfigurationsContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(
    ConfigurationsReducer,
    initialState.state
  );

  return (
    <ConfigurationsContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigurationsContext.Provider>
  );
};

export const useConfigurationsContext = () => useContext(ConfigurationsContext);
