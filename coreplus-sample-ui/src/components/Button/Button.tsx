import { ButtonType } from '../../types';

const Button = (props: {
  text: string;
  type?: ButtonType;
  onClick?: () => void;
  isDisabled?: boolean;
}): JSX.Element => {
  const { text, type = 'button', onClick, isDisabled } = props;

  return (
    <button
      className={`text-white focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
        isDisabled
          ? 'cursor-not-allowed bg-blue-400 hover:bg-blue-400'
          : 'bg-blue-700 hover:bg-blue-800'
      }`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
