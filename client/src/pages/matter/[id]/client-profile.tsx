import React from 'react'
import { NextPage } from 'next'

import MatterLayout from '~/components/templates/MatterLayout'
import Breedcrumb from '~/components/atoms/Breedcrumb'

const ClientProfile: NextPage = (): JSX.Element => {
  return (
    <MatterLayout metaTitle="Grant Of Aid">
      <Breedcrumb route="Client Profile" />
    </MatterLayout>
  )
}

export default ClientProfile
