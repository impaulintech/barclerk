import React, { FC } from 'react'
import { Settings, X } from 'react-feather'

type Props = {
  active: string
  menuList: string[]
  closeModal: () => void
  handleChangeTab: (e: React.FormEvent<HTMLButtonElement>) => void
}

const DialogHeader: FC<Props> = (props): JSX.Element => {
  const { active, closeModal, menuList, handleChangeTab } = props

  return (
    <header className="flex flex-col pt-4">
      <div className="flex items-center justify-between space-x-2 px-5">
        <div className="flex items-center space-x-2 text-barclerk-10">
          <Settings className="h-5 w-5" />
          <span className="text-xl font-medium">My Settings</span>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="rounded-md p-0.5 outline-none transition duration-75 ease-in-out hover:bg-slate-100 active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="border-b border-slate-300 pt-3">
        <ul className="flex items-center space-x-6 px-5">
          {menuList.map((list, i) => (
            <li key={i}>
              <button
                onClick={handleChangeTab}
                className={`
                  select-none border-b-2 border-transparent font-medium outline-none
                  ${active === list ? 'border-barclerk-10 text-barclerk-10' : 'text-slate-500'}
                `}
              >
                {list}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default DialogHeader
