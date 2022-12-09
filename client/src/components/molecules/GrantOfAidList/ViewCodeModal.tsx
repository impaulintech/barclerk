import { useRouter } from 'next/router'
import { Dialog, Disclosure } from '@headlessui/react'
import React, { FC, useEffect, useState } from 'react'
import { ChevronRight, ChevronUp, Eye, X } from 'react-feather'

import DialogBox2 from '~/components/templates/DialogBox/DialogBox2'
import { useAppDispatch, useAppSelector } from '~/hooks/reduxSelector'
import InputSkeleton from '~/components/atoms/Skeletons/InputSkeleton'
import { getSingleGrandOfAid } from '~/redux/grant-of-aid/grantOfAidSlice'

type Props = {
  isOpen: boolean
  closeModal: () => void
  grant_id: number
}

const ViewCodeModal: FC<Props> = ({ isOpen, closeModal, grant_id }): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { singleGrantOfAid } = useAppSelector((state) => state.grantOfAid)

  useEffect(() => {
    setIsLoadingCode(true)
    const fetchSingleGrandOfAidCodes = async () => {
      const payload = {
        client_id: id,
        grant_id
      }
      await dispatch(getSingleGrandOfAid(payload))
      setIsLoadingCode(false)
    }
    fetchSingleGrandOfAidCodes()
  }, [grant_id])

  return (
    <DialogBox2 isOpen={isOpen} closeModal={closeModal}>
      <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        <section>
          {/* MODAL HEADER */}
          <header className="flex items-center justify-between space-x-2 border-b border-slate-300 py-4 px-5">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span className="text-lg font-semibold">View Codes</span>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md p-0.5 outline-none transition duration-75 ease-in-out hover:bg-slate-100 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </header>
          {/* MODAL FORM CONTENT */}
          <main className="flex flex-col space-y-4 px-8 py-6 pb-10">
            {isLoadingCode ? (
              <>
                {/* We have a problem with [...Array(4)] because it gives a `key={i}` error */}
                {[0, 1, 2, 3].map((i: number) => (
                  <InputSkeleton key={i} />
                ))}
              </>
            ) : (
              <>
                <article className="w-full">
                  <div className="mx-auto w-full max-w-md space-y-3 rounded-2xl bg-white p-2">
                    <>
                      {singleGrantOfAid?.codes.map((code, i) => (
                        <Disclosure key={code.id}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={`
                                  flex w-full justify-between rounded-lg border border-slate-200 
                                  px-4 py-2 text-left text-sm font-medium ${
                                    open ? 'bg-slate-100 ' : 'bg-white'
                                  }
                                `}
                              >
                                <h2>
                                  Code {i + 1}:{' '}
                                  <span className="font-bold text-barclerk-30">{code.code}</span>
                                </h2>
                                <ChevronRight
                                  className={`${open ? 'rotate-90 transform' : ''} h-5 w-5`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel
                                className={`
                                  mt-1 w-full rounded-b-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-lg 
                                  transition duration-150 ease-in-out hover:shadow-xl
                                `}
                              >
                                <div className="border-b border-slate-200 py-2 px-4">
                                  Name:{' '}
                                  <span className="font-bold text-barclerk-30">{code.name}</span>
                                </div>
                                <nav className="flex flex-col space-y-2 divide-y divide-slate-300">
                                  <>
                                    {code?.types?.map((type) => (
                                      <ul key={type.id}>
                                        <li className="w-full py-2 px-6">
                                          Type:{' '}
                                          <span className="font-bold text-barclerk-30">
                                            {type.type}
                                          </span>
                                        </li>
                                        <li className="w-full py-2 px-6">
                                          Rate:{' '}
                                          <span className="font-bold text-barclerk-30">
                                            {type.rate}
                                          </span>
                                        </li>
                                        <li className="w-full py-2 px-6">
                                          Time:{' '}
                                          <span className="font-bold text-barclerk-30">
                                            {type.time}
                                          </span>
                                        </li>
                                        <li className="w-full py-2 px-6">
                                          Total Allowance:{' '}
                                          <span className="font-bold text-barclerk-30">
                                            {type.total_allowance}
                                          </span>
                                        </li>
                                      </ul>
                                    ))}
                                  </>
                                </nav>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </>
                  </div>
                </article>
              </>
            )}
          </main>
          {/* MODAL FOOTER SUBMIT AND CANCEL BUTTON */}
          <footer className="flex justify-end space-x-3 border-t border-slate-300 bg-slate-50 py-4 px-9">
            <button
              type="button"
              onClick={closeModal}
              className={`
                w-36 rounded border border-slate-300 bg-white py-2
                text-slate-600 outline-none transition duration-75 ease-in-out
                disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-400 hover:bg-white
                hover:text-slate-700 active:scale-95 disabled:active:scale-100
              `}
            >
              Close
            </button>
          </footer>
        </section>
      </Dialog.Panel>
    </DialogBox2>
  )
}

export default ViewCodeModal
