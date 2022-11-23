import Link from 'next/link'
import React, { FC } from 'react'
import { HiUser } from 'react-icons/hi'
import { useRouter } from 'next/router'

import { BarClerkWhiteIcon } from '~/shared/icons/LogoIcon'
import { DashboardIcon } from '~/shared/icons/DashboardIcon'
import { GrantOfAidIcon } from '~/shared/icons/GrantOfAidIcon'
import { TimeEntriesIcon } from '~/shared/icons/TimeEntriesIcon'
import { CourtAppearancesIcon } from '~/shared/icons/CourtAppearancesIcon'

type Props = {
  isOpenSidebar: boolean
}

const MatterSidebar: FC<Props> = ({ isOpenSidebar }): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const navs = [
    {
      name: 'Main Dashboard',
      href: `/`,
      Icon: DashboardIcon,
      slug: 'main-dashboard'
    },
    {
      name: 'Client Profile',
      href: `/matter/${id}/client-profile`,
      Icon: HiUser,
      slug: 'client-profile'
    },
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
    <aside
      className={`
        flex h-screen w-full flex-1 flex-shrink-0 flex-col justify-between border-r
        border-[#36C5F0] bg-[#18527D] text-white transition-all duration-300 ease-in-out
        ${isOpenSidebar ? 'max-w-0 translate-x-0 md:max-w-[270px]' : 'max-w-0 -translate-x-full'}
      `}
    >
      <nav className="hidden flex-col overflow-hidden md:flex">
        <header className="inline-flex items-center space-x-3 px-8 py-4">
          <BarClerkWhiteIcon className="h-6 w-6 shrink-0 fill-current text-white" />
          <h1 className="text-lg font-bold uppercase text-white md:text-xl">Barclerk</h1>
        </header>
        <ul>
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
              <Link href={href} className="flex items-center space-x-4 px-9 py-3 active:scale-95">
                <Icon className="h-5 w-5 shrink-0 fill-current text-white" />
                <span className="text-base font-medium line-clamp-1">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default MatterSidebar
