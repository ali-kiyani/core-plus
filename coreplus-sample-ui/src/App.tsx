import { useCallback, useEffect, useState } from 'react';
import './app.css';
import { PractitionerList, DateFilters } from './components';
import { CHOOSE_PRACTITIONER, REMAINING, SUPERVISORS } from './constants';
import {
  AppointmentDetailsPayload,
  AppointmentsReportPayload,
  Practitioner,
  RevenueReportPayload,
} from './types';
import {
  getAppointmentById,
  getAppointmentsByMonth,
  getPractitionerAppointmentsByMonth,
  getRemainingList,
  getSupervisorsList,
} from './utils';
import { useFormContext } from './contexts/FormContext';
import { useConfigurationsContext } from './contexts/ConfigurationsContext';
import { CONFIG_ACTIONS } from './constants/ReducerActions';
import { RevenuesTable } from './components/RevenuesTable';
import { AppointmentsTable } from './components/AppointmentsTable';
import { AppointmentDetails } from './components/AppointmentDetails';

function App() {
  const { state: formState } = useFormContext();
  const { state: configState, dispatch: configDispatch } =
    useConfigurationsContext();

  const [supervisorPractitioners, setSupervisorPractitioners] = useState<
    Practitioner[]
  >([]);
  const [remainingPractitioners, setRemainingPractitioners] = useState<
    Practitioner[]
  >([]);
  const [revenueReport, setRevenueReport] = useState<RevenueReportPayload>({
    totalCount: 0,
    data: [],
  });
  const [appointmentsReport, setAppointmentsReport] =
    useState<AppointmentsReportPayload>({ totalCount: 0, data: [] });
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetailsPayload>({
      appointment_type: '',
      client_name: '',
      cost: 0,
      date: '',
      duration: 0,
      id: 0,
      practitioner_id: 0,
      revenue: 0,
    });

  const [isPractitionerSelected, setIsPractitionerSelected] = useState(false);

  const generateReport = useCallback(
    (pageNumber?: number) => {
      const skip =
        pageNumber !== undefined
          ? pageNumber
          : configState?.currentRevenuesPage;

      getPractitionerAppointmentsByMonth(
        Number.parseInt(formState?.practitioner),
        new Date(formState?.dateFrom).toLocaleDateString(),
        new Date(formState?.dateTo).toLocaleDateString(),
        skip * configState?.recordsPerPage,
        configState?.recordsPerPage
      ).then((data: RevenueReportPayload) => {
        setRevenueReport(data);

        configDispatch({
          type: CONFIG_ACTIONS.SET_IS_REPORT_GENERATED,
          payload: true,
        });
      });
    },
    [formState, configState]
  );

  const generateAppointmentsReport = useCallback(
    (date: string, pageNumber?: number) => {
      configDispatch({
        type: CONFIG_ACTIONS.SET_SELECTED_REPORT_MONTH,
        payload: date,
      });

      const skip =
        pageNumber !== undefined
          ? pageNumber
          : configState?.currentRevenuesPage;

      getAppointmentsByMonth(
        Number.parseInt(formState?.practitioner),
        date,
        skip * configState?.recordsPerPage,
        configState?.recordsPerPage
      ).then((data: AppointmentsReportPayload) => {
        setAppointmentsReport(data);

        configDispatch({
          type: CONFIG_ACTIONS.SHOW_APPOINTMENTS,
          payload: true,
        });
        configDispatch({
          type: CONFIG_ACTIONS.SHOW_APPOINTMENT_DETAILS,
          payload: false,
        });
      });
    },
    [formState, configState]
  );

  const generateAppointmentDetailsReport = useCallback(
    (appointmentId: number) => {
      getAppointmentById(
        Number.parseInt(formState?.practitioner),
        appointmentId
      ).then((data: AppointmentDetailsPayload) => {
        setAppointmentDetails(data);

        configDispatch({
          type: CONFIG_ACTIONS.SHOW_APPOINTMENT_DETAILS,
          payload: true,
        });
      });
    },
    [formState]
  );

  useEffect(() => {
    if (configState?.isLoadingPractitionerList) {
      getSupervisorsList().then((data) => {
        setSupervisorPractitioners(data);
      });

      getRemainingList().then((data) => {
        setRemainingPractitioners(data);
      });

      configDispatch({
        type: CONFIG_ACTIONS.SET_IS_LOADING_PRACTITIONERS,
        payload: false,
      });
    }
  }, [setRemainingPractitioners, configState]);

  return (
    <div className="h-screen w-full appshell">
      <div className="header flex flex-row items-center p-2 bg-primary shadow-sm">
        <p className="font-bold text-lg">coreplus</p>
      </div>
      <div className="supervisors">
        <PractitionerList
          heading={SUPERVISORS}
          practitioners={supervisorPractitioners}
          setIsPractitionerSelected={setIsPractitionerSelected}
        />
      </div>
      <div className="praclist">
        <PractitionerList
          heading={REMAINING}
          practitioners={remainingPractitioners}
          setIsPractitionerSelected={setIsPractitionerSelected}
        />
      </div>
      <div className="pracinfo">
        {isPractitionerSelected ? (
          !configState?.isReportGenerated ? (
            <div className="center">
              <DateFilters generateReport={generateReport} />
            </div>
          ) : (
            <div className="grid grid-cols-3 pracinfo-content">
              <div className="per-month-col p-3">
                <RevenuesTable
                  revenuesByMonth={revenueReport}
                  generateReport={generateReport}
                  generateAppointmentsReport={generateAppointmentsReport}
                />
              </div>
              {configState?.showAppointments && (
                <div className="appointments-col p-3">
                  <AppointmentsTable
                    appointmentsReport={appointmentsReport}
                    generateAppointmentsReport={generateAppointmentsReport}
                    generateAppointmentDetailsReport={
                      generateAppointmentDetailsReport
                    }
                  />
                </div>
              )}
              {configState?.showAppointmentDetails && (
                <div className="appointment-details-col p-3">
                  <AppointmentDetails appointmentDetails={appointmentDetails} />
                </div>
              )}
            </div>
          )
        ) : (
          <div className="center">{CHOOSE_PRACTITIONER}</div>
        )}
      </div>
    </div>
  );
}

export default App;
