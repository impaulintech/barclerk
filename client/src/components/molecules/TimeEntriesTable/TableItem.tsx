import { FC, Fragment, useState } from 'react'
import Tippy from '@tippyjs/react'
import { Edit, ChevronDown, ChevronUp, Triangle } from 'react-feather'
import { Listbox, Transition } from '@headlessui/react'
import AddNewEntry from '../TimeEntryTableHeader/AddNewEntry';
import { useAppDispatch } from '~/hooks/reduxSelector' 

type Props = {
  timeEntries: any  
}

const TableItem: FC<Props> = (props): JSX.Element => { 
  const { timeEntries } = props || {}
  const [dropdown, setDropdown] = useState<boolean>(false)
  
  const [isOpenNewMatter, setIsOpenNewMatter] = useState<boolean>(false)
  const toggle = () => setIsOpenNewMatter(!isOpenNewMatter)  

  const extensions = ['22W005912/1', '22W005912/2', '22W005912/333333333']
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selected, setSelected] = useState<string>(extensions[selectedIndex])

  const types = ['Travel Time - 1', 'Travel Time - 2', 'Travel Time - 33333333333']
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0)
  const [selectedType, setSelectedType] = useState<string>(types[selectedTypeIndex])

  const codes = ['C137 - 1', 'C137 - 2', 'C137 - 33333333333']
  const [selectedCodeIndex, setSelectedCodeIndex] = useState<number>(0)
  const [selectedCode, setSelectedCode] = useState<string>(codes[selectedCodeIndex])

  return (
    <>
      <tr className="group select-none font-medium text-slate-700 transition duration-75 ease-in-out hover:bg-slate-100">
        <td className="py-2 px-6">
          <Tippy content={'asdasd'}>
            <span className="font-extrabold line-clamp-1 text-barclerk-30">6 June 2022</span>
          </Tippy>
        </td>

        <td className="py-2 px-6"> 
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1 min-w-[125px]">
              <Listbox.Button
                className="
                  relative w-full cursor-default rounded-lg py-1 pr-3
                  text-left focus:outline-none focus-visible:border-indigo-500 
                  focus-visible:ring-2 focus-visible:ring-opacity-75 
                  focus-visible:ring-offset-2 sm:text-sm 
                " 
              >
                <span className="block cursor-pointer truncate">{selected}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <Triangle
                    className="h-1.5 w-1.5 rotate-180 text-slate-900"
                    fill="text-slate-900"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                  {extensions.map((extension, extensionIdx) => (
                    <Listbox.Option
                      key={extensionIdx}
                      onClick={() => {  
                        setSelectedIndex(extensionIdx)
                      }} 
                      className={({ active }) => `
                          relative select-none py-2 pl-1 pr-4 
                          ${active ? 'bg-sats-10 text-slate-900' : 'text-slate-600'}
                        `}
                      value={extension}
                    >
                      {({ selected }) => (
                        <Tippy content={extension} disabled={extension.length <= 15}>
                          <div>
                            <span
                              className={`
                              block truncate text-left 
                              ${selected ? 'font-medium' : 'font-normal'}
                            `}
                            >
                              {extension}
                            </span>
                          </div>
                        </Tippy>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </td>

        <td className="py-2 px-6">
          <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="relative mt-1">
              <Listbox.Button 
                className="
                relative w-full cursor-default rounded-lg py-1 pr-3
                text-left focus:outline-none focus-visible:border-indigo-500 
                focus-visible:ring-2 focus-visible:ring-opacity-75 
                focus-visible:ring-offset-2 sm:text-sm
              "
              >
                <span className="block cursor-pointer truncate">{selectedType}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <Triangle
                    className="h-1.5 w-1.5 rotate-180 text-slate-900"
                    fill="text-slate-900"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {types.map((type, typeIdx) => (
                    <Listbox.Option
                      key={typeIdx}
                      onClick={() => setSelectedTypeIndex(typeIdx)}
                      className={({ active }) => `
                          relative select-none py-2 pl-1 pr-4 
                          ${active ? 'bg-sats-10 text-slate-900' : 'text-slate-600'}
                        `}
                      value={type}
                    >
                      {({ selected }) => (
                        <Tippy content={type} disabled={type.length <= 15}>
                          <div>
                            <span
                              className={`
                              block truncate text-left 
                              ${selected ? 'font-medium' : 'font-normal'}
                            `}
                            >
                              {type}
                            </span>
                          </div>
                        </Tippy>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </td>

        <td className="py-2 px-6">
          <Listbox value={selectedCode} onChange={setSelectedCode}>
            <div className="relative mt-1">
              <Listbox.Button 
                className="
                relative w-full cursor-default rounded-lg py-1 pr-3
                text-left focus:outline-none focus-visible:border-indigo-500 
                focus-visible:ring-2 focus-visible:ring-opacity-75 
                focus-visible:ring-offset-2 sm:text-sm
              "
              >
                <span className="block cursor-pointer truncate">{selectedCode}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                  <Triangle
                    className="h-1.5 w-1.5 rotate-180 text-slate-900"
                    fill="text-slate-900"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {codes.map((code, codeIdx) => (
                    <Listbox.Option
                      key={codeIdx}
                      onClick={() => setSelectedCodeIndex(codeIdx)}
                      className={({ active }) => `
                          relative select-none py-2 pl-1 pr-4 
                          ${active ? 'bg-sats-10 text-slate-900' : 'text-slate-600'}
                        `}
                      value={code}
                    >
                      {({ selected }) => (
                        <Tippy content={code} disabled={code.length <= 15}>
                          <div>
                            <span
                              className={`
                              block truncate text-left 
                              ${selected ? 'font-medium' : 'font-normal'}
                            `}
                            >
                              {code}
                            </span>
                          </div>
                        </Tippy>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </td>

        <td className="py-2 px-6">
          <Tippy content={''} disabled={true}>
            <span className="font-medium line-clamp-1">0.6</span>
          </Tippy>
        </td>

        <td className="py-2 px-6">
          <Tippy content={''} disabled={true}>
            <span className="font-medium line-clamp-1">$66</span>
          </Tippy>
        </td>

        <td className="py-2 px-6">
          <Tippy content={''} disabled={true}>
            <span className="font-extrabold line-clamp-1 text-barclerk-10">$333</span>
          </Tippy>
        </td>

        <td className="h-full items-center justify-between py-2 px-6">
          <AddNewEntry 
            isOpen={isOpenNewMatter} 
            closeModal={toggle} 
            editData={{ 
              description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam quasi aliquam eligendi, placeat qui corporis!', 
              date: '2022-06-06', 
              extension: '22W005912/2', 
              type: 'Travel Time', 
              code: 'C28M', 
              hoursUnit: 0.6, 
              ratePerHour: 66, 
              amount: 333 
          }}/>
          <div className="flex">
            <Tippy content={'Edit this row'}>
              <span
                className="w-[50%] cursor-pointer font-extrabold line-clamp-1"
                onClick={toggle}
              >
                <Edit className="h-5 w-5" />
              </span>
            </Tippy>
            <span
              className="flex w-[50%] cursor-pointer items-center justify-end font-extrabold"
              onClick={() => setDropdown(!dropdown)}
            >
              {dropdown ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
        </td>
      </tr>

      <tr
        className={`
          ${dropdown || 'hidden'} 
          group relative h-[115px] max-h-[115px] select-none font-medium text-slate-700
        `}
      >
        <td colSpan={100} className="h-[115px] w-full py-2 px-6">
          <span className="mb-[9px] font-semibold text-slate-700 opacity-60 line-clamp-1">
            Description
          </span>
          <p className="h-[60px] overflow-y-scroll font-semibold text-slate-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas
            vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum
            quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
            molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit
            sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid.
            Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
            sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam recusandae alias
            error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis
            iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius
            fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod
            quam consequuntur! Commodi minima excepturi repudiandae velit hic maxime doloremque.
            Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe,
            voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate
            excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non
            architecto ab laudantium modi minima sunt esse temporibus sint culpa, recusandae aliquam
            numquam totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam
            quasi aliquam eligendi, placeat qui corporis!
          </p>
        </td>
      </tr> 
    </>
  )
}

export default TableItem
