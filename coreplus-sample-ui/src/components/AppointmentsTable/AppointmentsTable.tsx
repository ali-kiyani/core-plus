import { useCallback, useMemo } from 'react';
import { useConfigurationsContext } from '../../contexts/ConfigurationsContext';
import { AppointmentsReportPayload } from '../../types';
import { CONFIG_ACTIONS } from '../../constants/ReducerActions';
import { Button } from '../Button';

const AppointmentsTable = (props: {
  appointmentsReport: AppointmentsReportPayload;
  generateAppointmentsReport: (date: string) => void;
  generateAppointmentDetailsReport: (appointmentId: number) => void;
}): JSX.Element => {
  const {
    appointmentsReport,
    generateAppointmentsReport,
    generateAppointmentDetailsReport,
  } = props;

  const { state: configState, dispatch: configDispatch } =
    useConfigurationsContext();

  const renderTableBody = useMemo(() => {
    return appointmentsReport?.data?.map((d, i) => (
      <div className="grid grid-cols-4" key={i}>
        <div
          className="p-2 hover"
          onClick={() => generateAppointmentDetailsReport(d?.id)}
        >
          {d?.id}
        </div>
        <div className="p-2">{d?.date}</div>
        <div className="p-2">{d?.cost}</div>
        <div className="p-2">{d?.revenue}</div>
      </div>
    ));
  }, [appointmentsReport]);

  const handlePrev = useCallback(() => {
    configDispatch({ type: CONFIG_ACTIONS.PREV_APPOINTMENTS_PAGE });
    generateAppointmentsReport(configState?.selectedReportMonth);
  }, [configState]);

  const handleNext = useCallback(() => {
    configDispatch({ type: CONFIG_ACTIONS.NEXT_APPOINTMENTS_PAGE });
    generateAppointmentsReport(configState?.selectedReportMonth);
  }, [configState]);

  const totalPages = Math.ceil(
    appointmentsReport?.totalCount / configState?.recordsPerPage
  );
  return (
    <div>
      <h2 className="sec-heading">Appointments Report</h2>
      <hr />
      <div className="mt-3 report-table">
        <div className="grid grid-cols-4 table-header">
          <div className="p-2">Apt. ID</div>
          <div className="p-2">Date</div>
          <div className="p-2">Cost</div>
          <div className="p-2">Revenue</div>
        </div>

        <div className="table-body">
          {appointmentsReport?.data?.length > 0 ? (
            renderTableBody
          ) : (
            <div className="text-center mt-10 mb-10">No Data</div>
          )}
        </div>

        <div className="table-footer p-2">
          <div className="mb-2">
            <span className="mr-2">
              Total Records: {appointmentsReport?.totalCount}
            </span>
            <span className="mr-2 pl-2 bl-1">
              Current Page: {configState?.currentAppointmentsPage + 1}
            </span>
            <span className="pl-2 bl-1">
              Records Per Page: {configState?.recordsPerPage}
            </span>
          </div>
          <hr />
          <div className="buttons grid grid-cols-2 gap-4 mt-2">
            <Button
              text="Prev"
              type="button"
              onClick={handlePrev}
              isDisabled={configState?.currentAppointmentsPage === 0}
            />
            <span className="text-right">
              <Button
                text="Next"
                type="button"
                onClick={handleNext}
                isDisabled={
                  totalPages === 0 ||
                  configState?.currentAppointmentsPage === totalPages - 1
                }
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
