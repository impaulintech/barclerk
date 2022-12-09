import React, { FC } from 'react'

type Props = {
  className?: string
}

const CardSkeleton: FC<Props> = ({ className }): JSX.Element => {
  return (
    <section
      className={`${className} w-full animate-pulse rounded-md border border-slate-200 bg-slate-100 shadow`}
    >
      <div className="flex flex-col space-y-6 py-5 px-5">
        <div className="space-y-3">
          <div className="h-3 w-32 rounded-full bg-slate-200"></div>
          <div className="h-3 w-48 rounded-full bg-slate-200"></div>
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <div className="h-4 w-10 rounded bg-slate-200"></div>
          <div className="h-4 w-10 rounded bg-slate-200"></div>
          <div className="h-4 w-10 rounded bg-slate-200"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </section>
  )
}

export default CardSkeleton
