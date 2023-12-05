import { DATE_FROM, DATE_TO } from '../../constants';
import { Input } from '../Input';
import { Button } from '../Button';
import { useCallback } from 'react';
import { useFormContext } from '../../contexts/FormContext';
import { FORM_ACTIONS } from '../../constants/ReducerActions';
import './DateFilters.styles.css';

const DateFilters = (props: {
  generateReport: (pageNumber?: number) => void;
}): JSX.Element => {
  const { generateReport } = props;

  const { state, dispatch } = useFormContext();

  const onDateFromChanged = useCallback((e: any) => {
    dispatch({ type: FORM_ACTIONS.SET_DATE_FROM, payload: e?.target?.value });
  }, []);
  const onDateToChanged = useCallback((e: any) => {
    dispatch({ type: FORM_ACTIONS.SET_DATE_TO, payload: e?.target?.value });
  }, []);

  const isDisabled = !(
    state?.practitioner !== '' &&
    state?.dateFrom !== '' &&
    state?.dateTo !== ''
  );

  return (
    <div className="filter-row flex gap-5">
      <div>
        <div className="sec-heading">From:</div>
        <Input
          placeholder={DATE_FROM}
          type="month"
          value={state?.dateFrom}
          onChange={onDateFromChanged}
        />
      </div>

      <div>
        <div className="sec-heading">To:</div>
        <Input
          placeholder={DATE_TO}
          type="month"
          value={state?.dateTo}
          onChange={onDateToChanged}
        />
      </div>

      <div className="generate-button">
        <Button
          text="Generate"
          type="button"
          onClick={() => generateReport()}
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default DateFilters;
