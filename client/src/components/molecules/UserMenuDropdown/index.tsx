import { FC } from 'react'
import { Menu } from '@headlessui/react'
import { Settings, LogOut, MoreVertical } from 'react-feather'

import { signOut } from '~/redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import MenuTransition from '~/components/atoms/MenuTransition'

type Props = {
  actions: {
    closeModalToggle: () => void
  }
}

const UserMenuDropDown: FC<Props> = ({ actions: { closeModalToggle } }): JSX.Element => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const fullname = `${user?.first_name} ${user?.last_name}`

  const handleSignOut = async () => {
    await dispatch(signOut())
    window.location.href = '/sign-in'
  }

  return (
    <Menu as="div" className="relative z-30 inline-block text-left">
      <Menu.Button className="flex w-full max-w-[140px] items-center space-x-1">
        <span className="text-sm font-bold text-white line-clamp-1">{fullname}</span>
        <MoreVertical className="h-4 w-4 shrink-0" />
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          className={`
            absolute right-0 mt-3.5 w-44 origin-top-right divide-y divide-slate-200 overflow-hidden rounded-b-md 
          bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none
          `}
        >
          <div>
            <Menu.Item>
              <button
                type="button"
                className={`
                  group flex w-full items-center overflow-hidden px-3 py-2 text-sm font-medium text-slate-600 
                  transition duration-75 ease-in-out hover:bg-slate-100
                `}
                onClick={closeModalToggle}
              >
                <Settings className="mr-3 h-5 w-5" aria-hidden="true" />
                Settings
              </button>
            </Menu.Item>
          </div>
          <div>
            <Menu.Item>
              <button
                className={`
                  group flex w-full items-center overflow-hidden px-3 py-2 text-sm font-medium text-slate-600 
                  transition duration-75 ease-in-out hover:bg-slate-100 
                `}
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  )
}

export default UserMenuDropDown
