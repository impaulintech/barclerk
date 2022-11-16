import { IoIosMenu } from 'react-icons/io'
import React, { FC, useState } from 'react'

import { BarClerkWhiteIcon } from '~/shared/icons/LogoIcon'
import UserMenuDropDown from '~/components/molecules/UserMenuDropdown'
import UserSettingsModal from '~/components/molecules/UserSettingsModal'

type Props = {
  actions: {
    handleToggleSidebar: () => void
    handleToggleDrawer: () => void
  }
}

const MatterHeader: FC<Props> = (props): JSX.Element => {
  const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
  const { handleToggleSidebar, handleToggleDrawer } = props.actions

  const closeModalToggle = (): void => setIsOpenSettings(!isOpenSettings)

  return (
    <header className="bg-barclerk-10 text-white">
      <nav className="flex w-full items-center justify-between">
        <section className="flex items-center">
          <button
            type="button"
            onClick={handleToggleSidebar}
            className="group mr-2 hidden cursor-pointer px-3 py-3 outline-none hover:bg-[#34b7df]/20 md:block"
          >
            <IoIosMenu className="h-6 w-6 text-white group-active:scale-95" />
          </button>
          <button
            type="button"
            onClick={handleToggleDrawer}
            className="group mr-2 block cursor-pointer px-3 py-3 outline-none hover:bg-[#34b7df]/20 md:hidden"
          >
            <IoIosMenu className="h-6 w-6 text-white group-active:scale-95" />
          </button>
          <div className="block md:hidden">
            <div className="inline-flex items-center space-x-3">
              <BarClerkWhiteIcon className="h-6 w-6 fill-current text-white" />
              <h1 className="text-lg font-bold uppercase text-white">Barclerk</h1>
            </div>
          </div>
        </section>
        <section className="px-4">
          <UserMenuDropDown actions={{ closeModalToggle }} />
          <UserSettingsModal isOpen={isOpenSettings} closeModal={closeModalToggle} />
        </section>
      </nav>
    </header>
  )
}

export default MatterHeader
