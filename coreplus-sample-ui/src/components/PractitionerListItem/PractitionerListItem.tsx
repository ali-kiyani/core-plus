import { Practitioner } from '../../types';
import { Dispatch, SetStateAction, useCallback } from 'react';
import './PractitionerListItem.styles.css';
import { useFormContext } from '../../contexts/FormContext';
import { CONFIG_ACTIONS, FORM_ACTIONS } from '../../constants/ReducerActions';
import { useConfigurationsContext } from '../../contexts/ConfigurationsContext';

const PractitionerListItem = (props: {
  practitioner: Practitioner;
  setIsPractitionerSelected: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { practitioner, setIsPractitionerSelected } = props;

  const { state, dispatch } = useFormContext();
  const { dispatch: configDispatch } = useConfigurationsContext();

  const generateReport = useCallback(() => {
    configDispatch({ type: CONFIG_ACTIONS.RESET });
    dispatch({ type: FORM_ACTIONS.CLEAR_DATES });
    dispatch({
      type: FORM_ACTIONS.SET_PRACTITIONER,
      payload: practitioner?.id,
    });
    setIsPractitionerSelected(true);
  }, [practitioner]);

  return (
    <div
      className={`practitioner pt-1 pb-1 ${
        state?.practitioner == `${practitioner?.id}` ? 'selected' : ''
      }`}
      onClick={generateReport}
    >
      {practitioner?.name}
    </div>
  );
};

export default PractitionerListItem;
