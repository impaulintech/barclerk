import React, { FC } from 'react'
import { LogIn } from 'react-feather'

import { Spinner } from '~/shared/icons/SpinnerIcon'

type Props = {
  value: string
  isAuth?: boolean
  className?: string
  isDisabled?: boolean
  isSubmitting?: boolean
  onClick?: (value?: any) => void
}

const Button: FC<Props> = (props): JSX.Element => {
  const { isAuth, isDisabled, onClick, value, className, isSubmitting } = props
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isSubmitting}
      className={`
        inline-flex items-center w-full justify-center border border-transparent bg-barclerk-10 rounded-md
        py-1.5 px-4 text-md font-medium text-light shadow-sm focus:outline-none disabled:cursor-not-allowed
        disabled:opacity-50 hover:bg-barclerk-10/70 disabled:hover:bg-opacity-50 active:scale-95 transition
        ease-in-out duration-150 relative
        ${isSubmitting && '!bg-barclerk-10/70 cursor-not-allowed'}
        ${className}`}
    >
      {isAuth && <LogIn className="w-4 h-4 absolute left-2" />}
      {isSubmitting ? <Spinner className="max-w-[24px]" /> : value}
    </button>
  )
}

export default Button
