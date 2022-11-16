import React from 'react'

export type IconName = {
  className?: string
}

export const DashboardIcon: React.FC<IconName> = ({ className }): JSX.Element => {
  return (
    <svg
      className={className}
      viewBox="0 0 22 22"
      fill="currrent"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.97297 9.9723H0C0.477099 4.68412 4.68479 0.477767 9.97297 0V9.9723ZM11.9776 0V10.9746C11.9776 11.5279 11.5292 11.9769 10.9753 11.9769H0C0.507168 17.5952 5.22403 22 10.9746 22C17.0633 22 22 17.064 22 10.9746C22 5.22403 17.5959 0.507836 11.9776 0Z"
        fill="current"
      />
    </svg>
  )
}
