import { Dispatch, SetStateAction, useMemo } from 'react';
import { Practitioner } from '../../types';
import PractitionerListItem from '../PractitionerListItem/PractitionerListItem';
import './PractitionerList.styles.css';

const PractitionerList = (props: {
  practitioners: Practitioner[];
  heading: string;
  setIsPractitionerSelected: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { practitioners, heading, setIsPractitionerSelected } = props;

  const list = useMemo(() => {
    return practitioners?.map((p) => (
      <PractitionerListItem
        practitioner={p}
        key={p.id}
        setIsPractitionerSelected={setIsPractitionerSelected}
      />
    ));
  }, [practitioners]);

  return (
    <div className="practitioner-list-wrapper">
      <h2 className="section-heading mb-1">{heading}</h2>
      {list}
    </div>
  );
};

export default PractitionerList;
