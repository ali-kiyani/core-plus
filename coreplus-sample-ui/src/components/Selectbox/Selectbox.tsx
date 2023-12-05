import { useMemo } from 'react';
import { Option } from '../../types';

const Selectbox = (props: {
  placeholder: string;
  options: Option[];
  name: string;
}): JSX.Element => {
  const { placeholder, options, name } = props;

  const selectOptions = useMemo(() => {
    return options?.map((o) => (
      <option value={o?.key} key={o?.key}>
        {o?.value}
      </option>
    ));
  }, [options]);

  return (
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value="" disabled>
        {placeholder}
      </option>
      {selectOptions}
    </select>
  );
};

export default Selectbox;
