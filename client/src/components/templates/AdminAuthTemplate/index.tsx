import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  hasBorder?: boolean
}

const AdminAuthTemplate: FC<Props> = ({ children, hasBorder = false }): JSX.Element => {
  return (
    <main className="bg-slate-100 mobile:!bg-white min-h-screen h-full py-10 flex justify-center items-center px-10 mobile:!px-5 mobile:!pb-20 mobile:!pt-10">
      <div
        className={`bg-white p-10 px-20 mobile:p-0 rounded-2xl shadow-md mobile:shadow-none ${
          hasBorder && '!border-t-[15px] !border-barclerk-10 py-10 mobile:!border-none'
        }`}
      >
        {children}
      </div>
    </main>
  )
}

export default AdminAuthTemplate
