import Head from 'next/head'
import dynamic from 'next/dynamic'
import React, { FC, ReactNode, useState } from 'react'
import createPersistedState from 'use-persisted-state'

import MatterHeader from '~/components/organisms/MatterHeader'
import MatterDrawer from '~/components/organisms/MatterDrawer'

const MatterSidebar = dynamic(() => import('~/components/organisms/MatterSidebar'), { ssr: false })

type Props = {
  metaTitle: string
  children: ReactNode
}

const useSidebarState = createPersistedState<boolean>('sidebarToggle')

const MatterLayout: FC<Props> = ({ metaTitle, children }): JSX.Element => {
  const [isOpenSidebar, setIsOpenSidebar] = useSidebarState(true)
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

  const handleToggleSidebar = (): void => setIsOpenSidebar(!isOpenSidebar)
  const handleToggleDrawer = (): void => setIsOpenDrawer(!isOpenDrawer)

  return (
    <>
      <Head>
        <title>{`BarClerk | ${metaTitle}`}</title>
      </Head>
      <main className="flex h-screen min-h-screen flex-col">
        <MatterHeader actions={{ handleToggleSidebar, handleToggleDrawer }} />
        <section className="flex overflow-hidden bg-slate-100 text-black">
          <MatterSidebar isOpenSidebar={isOpenSidebar} />
          <div className="block md:hidden">
            <MatterDrawer isOpenDrawer={isOpenDrawer} handleToggleDrawer={handleToggleDrawer} />
          </div>
          <article className="default-scrollbar w-full flex-1 flex-shrink-0 overflow-y-auto">
            {children}
          </article>
        </section>
      </main>
    </>
  )
}

export default MatterLayout
