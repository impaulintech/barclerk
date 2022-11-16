import React from 'react'
import { NextPage } from 'next'

import MatterLayout from '~/components/templates/MatterLayout'

const TimeEntries: NextPage = (): JSX.Element => {
  return (
    <MatterLayout metaTitle="Time Entries">
      <div className="flex h-full items-center justify-center px-8">
        <div className="mx-auto min-h-[90vh] w-full max-w-6xl rounded-lg bg-white p-8 shadow">
          This is the Time Entries
        </div>
      </div>
    </MatterLayout>
  )
}

export default TimeEntries
