import { CONFIG_ACTIONS } from '../constants/ReducerActions';
import { Action, ConfigurationState } from '../types';

const initState: ConfigurationState = {
  isLoadingPractitionerList: true,
  isReportGenerated: false,
  currentRevenuesPage: 0,
  currentAppointmentsPage: 0,
  recordsPerPage: 10,
  showAppointmentDetails: false,
  showAppointments: false,
  selectedReportMonth: '',
};

export const ConfigurationsReducer = (
  state: ConfigurationState = initState,
  action: Action
) => {
  switch (action.type) {
    case CONFIG_ACTIONS.SET_IS_LOADING_PRACTITIONERS:
      return { ...state, isLoadingPractitionerList: action?.payload };

    case CONFIG_ACTIONS.SET_IS_REPORT_GENERATED:
      return { ...state, isReportGenerated: action?.payload };

    case CONFIG_ACTIONS.SET_RECORDS_PER_PAGE:
      return { ...state, recordsPerPage: action?.payload };

    case CONFIG_ACTIONS.SET_CURRENT_REVENUE_PAGE:
      return { ...state, currentRevenuesPage: action?.payload };

    case CONFIG_ACTIONS.SET_CURRENT_APPOINTMENTS_PAGE:
      return { ...state, currentAppointmentsPage: action?.payload };

    case CONFIG_ACTIONS.NEXT_REVENUE_PAGE:
      return { ...state, currentRevenuesPage: state?.currentRevenuesPage + 1 };

    case CONFIG_ACTIONS.PREV_REVENUE_PAGE:
      return { ...state, currentRevenuesPage: state?.currentRevenuesPage - 1 };

    case CONFIG_ACTIONS.NEXT_APPOINTMENTS_PAGE:
      return {
        ...state,
        currentAppointmentsPage: state?.currentAppointmentsPage + 1,
      };

    case CONFIG_ACTIONS.PREV_APPOINTMENTS_PAGE:
      return {
        ...state,
        currentAppointmentsPage: state?.currentAppointmentsPage - 1,
      };

    case CONFIG_ACTIONS.SHOW_APPOINTMENTS:
      return { ...state, showAppointments: action?.payload };

    case CONFIG_ACTIONS.SHOW_APPOINTMENT_DETAILS:
      return { ...state, showAppointmentDetails: action?.payload };

    case CONFIG_ACTIONS.SET_SELECTED_REPORT_MONTH:
      return { ...state, selectedReportMonth: action?.payload };

    case CONFIG_ACTIONS.RESET:
      return { ...state, ...initState };

    default:
      return { ...state };
  }
};
