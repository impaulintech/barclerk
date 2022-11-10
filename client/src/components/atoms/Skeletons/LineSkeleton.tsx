import React, { FC } from 'react'

import { skeletonAnimation } from '~/utils/skeletonAnimation'

type Props = {
  className?: string
}

const LineSkeleton: FC<Props> = ({ className }): JSX.Element => {
  return (
    <div
      className={`mb-2.5 h-2 w-full rounded-full bg-slate-200 ${skeletonAnimation} ${className}`}
    ></div>
  )
}

export default LineSkeleton
