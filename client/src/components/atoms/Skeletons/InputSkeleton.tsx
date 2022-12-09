import React, { FC } from 'react'

type Props = {
  className?: string
}

const InputSkeleton: FC<Props> = ({ className }): JSX.Element => {
  return (
    <div
      className={`${className} w-full animate-pulse rounded-md border border-slate-200 bg-slate-100 py-6`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default InputSkeleton
