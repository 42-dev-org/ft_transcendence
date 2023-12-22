import React, { ReactNode } from 'react'
import { Dialog } from '@headlessui/react'


type Props = {
    open :boolean
    onClose: VoidFunction
    title: string
    children: ReactNode
}
function ModalUI({open, onClose, title, children} : Props) {
  
  return (
    <Dialog open={open} onClose={onClose}  className="relative z-50">
      
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto  min-w-[300px] rounded  bg-[#1B1B1B] p-2 border-2 border-[#61606066]">
            <Dialog.Title className='text-white font-semibold text-lg flex justify-center'>{title}</Dialog.Title>
          {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
export default ModalUI