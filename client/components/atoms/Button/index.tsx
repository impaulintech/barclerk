import React from "react";
import { Spinner } from "shared/icons/SpinnerIcon";

type Props = {
  value: string;
  className?: string;
  isDisabled?: boolean;
  isSubmitting?: boolean;
  onClick?: (value?: any) => void;
};

const Button = ({ isDisabled, onClick, value, className, isSubmitting }: Props) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isSubmitting}
      className={`
        inline-flex w-full justify-center rounded-sm border border-transparent bg-barclerk-10
        py-1.5 px-4 text-md font-medium text-light shadow-sm focus:outline-none disabled:cursor-not-allowed
        disabled:opacity-50 hover:bg-barclerk-10/70 disabled:hover:bg-opacity-50 active:scale-95
        ${isSubmitting && "!bg-barclerk-10/70 cursor-not-allowed"}
        ${className}`}
    >
      {isSubmitting ? <Spinner className="max-w-[24px]"/> : value}
    </button>
  );
};

export default Button;
