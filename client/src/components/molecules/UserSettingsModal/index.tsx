import { Dialog } from '@headlessui/react'
import React, { FC, useState } from 'react'

import DialogHeader from './DialogHeader'
import { activeComponent } from './ActiveTabComponent'
import DialogBox2 from '~/components/templates/DialogBox/DialogBox2'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

const UserSettingsModal: FC<Props> = ({ isOpen, closeModal }): JSX.Element => {
  const [active, setActive] = useState<string>('Profile')
  const menuList = ['Profile', 'Security']

  const handleChangeTab = (e: React.FormEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLElement).innerText
    setActive(value)
  }

  return (
    <DialogBox2 isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        <DialogHeader
          active={active}
          menuList={menuList}
          handleChangeTab={handleChangeTab}
          closeModal={closeModal}
        />
        {activeComponent(active)}
      </Dialog.Panel>
    </DialogBox2>
  )
}

export default UserSettingsModal
