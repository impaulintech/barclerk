import Link from 'next/link'
import React, { FC } from 'react'
import { X } from 'react-feather'
import { useRouter } from 'next/router'

import { BarClerkWhiteIcon } from '~/shared/icons/LogoIcon'
import { DashboardIcon } from '~/shared/icons/DashboardIcon'
import { GrantOfAidIcon } from '~/shared/icons/GrantOfAidIcon'
import { TimeEntriesIcon } from '~/shared/icons/TimeEntriesIcon'
import { CourtAppearancesIcon } from '~/shared/icons/CourtAppearancesIcon'

type Props = {
  isOpenDrawer: boolean
  handleToggleDrawer: () => void
}

const MatterDrawer: FC<Props> = ({ isOpenDrawer, handleToggleDrawer }): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const navs = [
    {
      name: 'Grant of Aid',
      href: `/matter/${id}/grant-of-aid`,
      Icon: GrantOfAidIcon,
      slug: 'grant-of-aid'
    },
    {
      name: 'Court Appearances',
      href: `/matter/${id}/court-appearances`,
      Icon: CourtAppearancesIcon,
      slug: 'court-appearances'
    },
    {
      name: 'Time Entries',
      href: `/matter/${id}/time-entries`,
      Icon: TimeEntriesIcon,
      slug: 'time-entries'
    }
  ]

  return (
    <aside>
      <main
        className={`
        fixed top-0 left-0 z-40 h-full min-h-screen w-full max-w-[280px]
        transform border-[#36C5F0] bg-[#18527D] text-white transition-all duration-300
        ease-in-out scrollbar-thin scrollbar-thumb-slate-500 scrollbar-thumb-rounded-md
        ${isOpenDrawer ? 'z-50 translate-x-0' : '-translate-x-full'}
      `}
      >
        <nav className="flex flex-col">
          <header className="flex items-center justify-between px-6 py-4">
            <div className="inline-flex items-center space-x-3">
              <BarClerkWhiteIcon className="h-6 w-6 shrink-0 fill-current text-white" />
              <h1 className="text-lg font-bold uppercase text-white md:text-xl">Barclerk</h1>
            </div>
            <button className="outline-none active:scale-95" onClick={handleToggleDrawer}>
              <X className="stroke-4 h-6 w-6" />
            </button>
          </header>
          <ul>
            <li
              className={`
              ${
                router.asPath === `/matter/${id}`
                  ? 'bg-[#31A6C9] hover:bg-[#31A6C9]/90 active:bg-[#31A6C9]'
                  : 'hover:bg-[#31A6C9]/10 active:bg-[#31A6C9]/20'
              }
            `}
            >
              <Link
                href={`/matter/${id}`}
                className="flex items-center space-x-4 px-7 py-3 active:scale-95"
              >
                <DashboardIcon className="h-5 w-5 shrink-0 fill-current text-white" />
                <span className="text-base font-medium line-clamp-1">Dashboard</span>
              </Link>
            </li>
            {navs.map(({ name, href, Icon, slug }, i) => (
              <li
                key={i}
                className={`
                ${
                  router.asPath.includes(`/matter/${id}/${slug}`)
                    ? 'bg-[#31A6C9] hover:bg-[#31A6C9]/90 active:bg-[#31A6C9]'
                    : 'hover:bg-[#31A6C9]/10 active:bg-[#31A6C9]/20'
                }
              `}
              >
                <Link href={href} className="flex items-center space-x-4 px-7 py-3 active:scale-95">
                  <Icon className="h-5 w-5 shrink-0 fill-current text-white" />
                  <span className="text-base font-medium line-clamp-1">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <>
        {isOpenDrawer && (
          <div
            onClick={handleToggleDrawer}
            className="fixed inset-0 z-30 cursor-default bg-slate-700/50 backdrop-blur-sm"
          ></div>
        )}
      </>
    </aside>
  )
}

export default MatterDrawer
