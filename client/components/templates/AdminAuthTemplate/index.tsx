import React, { ReactNode } from "react";

type Props = { 
  children: ReactNode, 
  hasBorder?: boolean
}

const AdminAuthTemplate = ({ children, hasBorder = false }: Props) => {
  return (
    <main className="bg-barclerk-60 mobile:!bg-barclerk-30 min-h-screen h-full py-10 flex justify-center items-center px-10 mobile:!px-5 mobile:!pb-20 mobile:!pt-10">
      <div className={`bg-barclerk-30 p-20 mobile:p-0 rounded-3xl shadow-2xl mobile:shadow-none ${hasBorder && "!border-t-[15px] !border-barclerk-10 py-10 mobile:!border-none"}`}>
        {children}
      </div>
    </main>
  );
};

export default AdminAuthTemplate;
