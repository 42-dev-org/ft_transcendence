import React, { Fragment, useState } from 'react'
import Button from '../Button'
import Image from "next/image";
import { RiChatPrivateLine } from "react-icons/ri";
import ModalUI from '../Modal';



export default function ChangePasswordPrivetOrDesabled(): JSX.Element {

    const [isAddOpenChannelModal, setIsAddOpenChannelModal] = useState(false);

    const [componenetChannelModal, setcomponenetChannelModal] = useState("public");

    const onCloseAddChannelModal = () => setIsAddOpenChannelModal(false);

  return (
<Fragment>
    <ModalUI
        open={isAddOpenChannelModal}
        onClose={onCloseAddChannelModal}
        title="Channel situation"
        >
        <div className="flex justify-center items-center p-3 flex-col  max-h-72 gap-2">
          <div className="flex flex-col">

            <select
            defaultValue={componenetChannelModal}
              name="channels"
              id=""
              className="rounded-md py-1 px-2"
              onChange={(e) => setcomponenetChannelModal(e.target.value)}
              >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="protected">Protected</option>
            </select>
          </div>
          {componenetChannelModal === "protected" && (
              <input
              placeholder='Set new password'
              type="password"
              className="h-7 p-1 px-5 rounded-md w-2/3 mr-2  justify-start"
              />
              )}
          <Button onClick={() => {}} title="Submit"></Button>
        </div>
    </ModalUI>

    <div className='text-white'>
            <button
              onClick={() => setIsAddOpenChannelModal(true)}
              title={""}
              className="flex rounded-full text-sm font-medium hover:opacity-90 px-3 py-2 items-center justify-center w-1/3 h-3/4 bg-[#6666]"
              >
              {" "}
            {<RiChatPrivateLine size={30} color='white'/>}
            </button>

    </div>
 </Fragment>
  )
}
