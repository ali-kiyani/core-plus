import { useCallback, useMemo } from 'react';
import { RevenueReportPayload } from '../../types';
import './RevenuesTable.styles.css';
import { useConfigurationsContext } from '../../contexts/ConfigurationsContext';
import { Button } from '../Button';
import { CONFIG_ACTIONS } from '../../constants/ReducerActions';

const RevenuesTable = (props: {
  revenuesByMonth: RevenueReportPayload;
  generateReport: () => void;
  generateAppointmentsReport: (date: string) => void;
}): JSX.Element => {
  const { revenuesByMonth, generateReport, generateAppointmentsReport } = props;

  const { state: configState, dispatch: configDispatch } =
    useConfigurationsContext();

  const renderTableBody = useMemo(() => {
    return revenuesByMonth?.data?.map((d, i) => (
      <div className="grid grid-cols-3" key={i}>
        <div
          className="p-2 hover"
          onClick={() => generateAppointmentsReport(d?.date)}
        >
          {d?.date}
        </div>
        <div className="p-2">{d?.cost}</div>
        <div className="p-2">{d?.revenue}</div>
      </div>
    ));
  }, [revenuesByMonth]);

  const handlePrev = useCallback(() => {
    configDispatch({ type: CONFIG_ACTIONS.PREV_REVENUE_PAGE });
    generateReport();
  }, [configState]);

  const handleNext = useCallback(() => {
    configDispatch({ type: CONFIG_ACTIONS.NEXT_REVENUE_PAGE });
    generateReport();
  }, [configState]);

  const totalPages = Math.ceil(
    revenuesByMonth?.totalCount / configState?.recordsPerPage
  );

  return (
    <div>
      <h2 className="sec-heading">Revenues Per Month Report</h2>
      <hr />
      <div className="mt-3 report-table">
        <div className="grid grid-cols-3 table-header">
          <div className="p-2">Date</div>
          <div className="p-2">Cost</div>
          <div className="p-2">Revenue</div>
        </div>

        <div className="table-body">
          {revenuesByMonth?.data?.length > 0 ? (
            renderTableBody
          ) : (
            <div className="text-center mt-10 mb-10">No Data</div>
          )}
        </div>

        <div className="table-footer p-2">
          <div className="mb-2">
            <span className="mr-2">
              Total Records: {revenuesByMonth?.totalCount}
            </span>
            <span className="mr-2 pl-2 bl-1">
              Current Page: {configState?.currentRevenuesPage + 1}
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
              isDisabled={configState?.currentRevenuesPage === 0}
            />
            <span className="text-right">
              <Button
                text="Next"
                type="button"
                onClick={handleNext}
                isDisabled={
                  totalPages === 0 ||
                  configState?.currentRevenuesPage === totalPages - 1
                }
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenuesTable;
