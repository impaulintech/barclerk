import React from "react";

type Props = {
  value: string;
  isDisabled?: boolean
  onClick?: (value?: any) => void
  className?: string
  isSubmitting: boolean
}

const Button = ({ isDisabled = false, onClick, value, className, isSubmitting }: Props) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isDisabled || isSubmitting}
      className={`
            inline-flex w-full justify-center rounded-sm border border-transparent bg-barclerk-10
            py-1.5 px-4 text-md font-medium text-white shadow-sm focus:outline-none disabled:cursor-not-allowed
            disabled:bg-opacity-50 hover:bg-barclerk-10/70 disabled:hover:bg-opacity-50 active:scale-95
          ${className}`}>
      {value}
    </button>
  );
};

export default Button;
