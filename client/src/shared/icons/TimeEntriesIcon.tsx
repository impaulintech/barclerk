import React from 'react'

export type IconName = {
  className?: string
}

export const TimeEntriesIcon: React.FC<IconName> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      viewBox="0 0 26 26"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7 6.24545C10.3256 5.57572 8.78168 5.19995 7.14998 5.19995C5.51827 5.19995 3.97433 5.57572 2.59998 6.24545V19.2455C3.97433 18.5757 5.51827 18.2 7.14998 18.2C9.31916 18.2 11.3332 18.8641 13 20C14.6667 18.8641 16.6808 18.2 18.85 18.2C20.4817 18.2 22.0256 18.5757 23.4 19.2455V6.24545C22.0256 5.57572 20.4817 5.19995 18.85 5.19995C17.2183 5.19995 15.6743 5.57572 14.3 6.24545V15.6C14.3 16.3179 13.7179 16.9 13 16.9C12.282 16.9 11.7 16.3179 11.7 15.6V6.24545Z"
        fill="current"
      />
    </svg>
  )
}
