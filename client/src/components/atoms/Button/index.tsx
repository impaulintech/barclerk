import React, { FC } from 'react'
import { LogIn } from 'react-feather'

import { Spinner } from '~/shared/icons/SpinnerIcon'

type Props = {
  value: string
  className?: string
  isDisabled?: boolean
  isSubmitting?: boolean
  onClick?: (value?: any) => void
}

const Button: FC<Props> = (props): JSX.Element => {
  const { isDisabled, onClick, value, className, isSubmitting } = props
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isSubmitting}
      className={`
        text-md relative inline-flex w-full items-center justify-center rounded-md border
        border-transparent bg-barclerk-10 py-1.5 px-4 font-medium text-light shadow-sm transition
        duration-150 ease-in-out focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
        hover:bg-barclerk-10/70 disabled:hover:bg-opacity-50 active:scale-95
        ${isSubmitting && 'cursor-not-allowed !bg-barclerk-10/70'}
        ${className}`}
    >
      {isSubmitting ? <Spinner className="max-w-[24px]" /> : value}
    </button>
  )
}

export default Button
