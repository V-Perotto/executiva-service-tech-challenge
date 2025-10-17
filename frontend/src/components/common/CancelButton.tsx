import { X } from 'lucide-react';

type CancelButtonProps = {
  text: string;
  styleClass?: string;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'warning' | 'success' | 'dark';
  onClick?: (e: any) => void;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const CancelButton = ({
  text = '',
  styleClass = '',
  variant = 'primary',
  disabled = false,
  onClick,
}: CancelButtonProps) => {
  return (
    <button
      disabled={disabled}
      type='button'
      className={classNames(
        variant === 'primary'
          ? `bg-blue-600 hover:bg-blue-700 border-blue-300 focus:ring-blue-300 focus:shadow-[0_0_0_0.3rem_#0e5690]`
          : variant === 'danger'
          ? `bg-red-600 hover:bg-red-700 border-red-300 focus:ring-red-300 focus:border-red-300 focus:shadow-[0_0_0_0.3rem_#922121]`
          : variant === 'warning'
          ? `bg-yellow-600 hover:bg-yellow-700 border-yellow-300 focus:ring-yellow-300 focus:border-yellow-300 focus:shadow-[0_0_0_0.3rem_#aab41c]`
          : variant === 'success'
          ? `bg-emerald-600 hover:bg-emerald-700 border-emerald-300 focus:ring-emerald-300 focus:border-emerald-300 focus:shadow-[0_0_0_0.3rem_#1d8044]`
          : `bg-gray-500 hover:bg-gray-600 border-gray-300 focus:ring-gray-300 focus:border-gray-300 focus:shadow-[0_0_0_0.3rem_#737a8a]`,
        `w-full inline-flex ${
          disabled && 'hidden'
        } items-center justify-center px-4 py-2 focus-visible:outline-none border border-transparent text-base font-medium rounded-md shadow-sm text-white ${styleClass}`
      )}
      onClick={onClick}
    >
      <span className="mr-1">{text}</span>
      <X />
    </button>
  );
};

export default CancelButton;
