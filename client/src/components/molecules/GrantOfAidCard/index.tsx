import moment from 'moment'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Edit3, Eye, Trash } from 'react-feather'
import React, { FC, useRef, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'

import { useAppDispatch } from '~/hooks/reduxSelector'
import { deleteGrantOfAid } from '~/redux/grant-of-aid/grantOfAidSlice'
import EditGrantOfAidModal from '../GrantOfAidList/EditGrantOfAidModal'
import { IGOLRequest, IGrantOfAid } from '~/redux/grant-of-aid/interface'
import ViewCodesModal from '~/components/molecules/GrantOfAidList/ViewCodeModal'

type Props = {
  grant: IGrantOfAid
}

const GrantofAidCard: FC<Props> = ({ grant }): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  const [isOpenCode, setIsOpenCode] = useState<boolean>(false)
  const [isOpenEditGrantOfAid, setIsOpenEditGrantOfAid] = useState<boolean>(false)

  const deleteButtonRef = useRef<HTMLButtonElement | null>(null)
  const dispatch = useAppDispatch()

  const handleToggleCode = (): void => setIsOpenCode(!isOpenCode)
  const handleToggleEditGrantOfAid = (): void => setIsOpenEditGrantOfAid(!isOpenEditGrantOfAid)

  const handleDeleteGrantOfAid = (grant_id: number, onClose: () => void) => {
    const payload = {
      client_id: id,
      grant_id
    } as IGOLRequest

    if (deleteButtonRef.current) {
      deleteButtonRef.current.innerHTML = 'Deleting...'
      dispatch(deleteGrantOfAid(payload))
        .unwrap()
        .then(() => toast.success('Deleted Successfully'))
        .catch((e: any) => toast.error(e.message))
        .finally(() => {
          if (deleteButtonRef.current) deleteButtonRef.current.innerHTML = 'Yes'
          onClose()
        })
    }
  }

  const openDeleteModal = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="rounded-lg border border-slate-200 bg-white px-8 py-6 shadow-xl">
            <h1 className="text-center text-xl font-bold">Are you sure?</h1>
            <p className="mt-2 text-sm font-medium">You want to delete this message?</p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white">
              <button
                onClick={onClose}
                className="rounded-lg bg-slate-500 py-1 px-6 transition duration-100 ease-in-out hover:bg-slate-600"
              >
                No
              </button>
              <button
                ref={deleteButtonRef}
                onClick={() => handleDeleteGrantOfAid(grant.id, onClose)}
                className="rounded-lg bg-blue-500 py-1 px-6 transition duration-100 ease-in-out hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        )
      }
    })
  }

  return (
    <section className="group flex w-full flex-col space-y-2 rounded-md bg-white p-4 text-sm shadow transition duration-150 ease-in-out hover:shadow-lg">
      <div className="flex items-center space-x-2">
        <h2 className="text-slate-700">Extension:</h2>
        <span
          className={`
            rounded-full border border-green-300 bg-green-50
            px-1 font-medium text-green-600
          `}
        >
          {grant.extension}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <h2 className="text-slate-700">Date Effective:</h2>
        <span className="text-base font-medium text-barclerk-10 line-clamp-1">
          {moment(grant.date_effective).format('DD MMMM YYYY')}
        </span>
      </div>
      <div className="ml-auto flex flex-wrap space-x-2 pt-4 text-xs md:text-sm">
        <div>
          <button
            type="button"
            className={`
              flex items-center rounded border border-transparent px-2 py-1 text-slate-400
              outline-none group-hover:border-slate-300 hover:text-slate-500 active:scale-95
            `}
            onClick={handleToggleCode}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Codes
          </button>
          {/* This will show the View Code Modal */}
          {isOpenCode && (
            <ViewCodesModal
              {...{
                isOpen: isOpenCode,
                closeModal: handleToggleCode,
                grant_id: grant.id
              }}
            />
          )}
        </div>
        <div>
          <button
            type="button"
            className={`
              flex items-center rounded border border-transparent px-2 py-1 text-slate-400
              outline-none group-hover:border-slate-300 hover:text-slate-500 active:scale-95
            `}
            onClick={handleToggleEditGrantOfAid}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Edit
          </button>
          {/* This will show the Edit Grant Of Aid Modal */}
          {isOpenEditGrantOfAid && (
            <EditGrantOfAidModal
              {...{
                isOpen: isOpenEditGrantOfAid,
                closeModal: handleToggleEditGrantOfAid,
                grant_id: grant.id
              }}
            />
          )}
        </div>
        <button
          type="button"
          className={`
            flex items-center rounded border border-transparent px-2 py-1 text-slate-400
            outline-none group-hover:border-slate-300 hover:text-slate-500 active:scale-95
          `}
          onClick={openDeleteModal}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </button>
      </div>
    </section>
  )
}

export default GrantofAidCard
