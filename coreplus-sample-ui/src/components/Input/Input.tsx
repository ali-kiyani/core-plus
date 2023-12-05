import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

const Input = (props: {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}): JSX.Element => {
  const { placeholder, onChange, value, type } = props;

  return (
    <input
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      defaultValue={value}
    />
  );
};

export default Input;
