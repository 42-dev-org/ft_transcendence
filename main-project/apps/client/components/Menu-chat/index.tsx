import { ReactNode } from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'



type Props = {
    iconBtn: ReactNode;
    children: ReactNode
}

export default function MenuItem({iconBtn, children}:Props) {
  return (
    <Popover className="relative" >
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            {iconBtn}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -right-2 z-10 mt-5 flex">
          
           {({ close }) => (
         <div className="flex flex-col gap-1 min-w-max shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5" onClick={() => close()}>
         {children}
   </div>
        )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}