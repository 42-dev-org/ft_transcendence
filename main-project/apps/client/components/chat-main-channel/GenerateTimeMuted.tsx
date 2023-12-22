import React, { Fragment, useState } from 'react'
import Button from '../Button'
import Image from "next/image";
import { RiChatPrivateLine } from "react-icons/ri";
import ModalUI from '../Modal';


export default function GenerateTimeMuted(props): JSX.Element {


    // const [componenetChannelModal, setcomponenetChannelModal] = useState("public");

    const onCloseAddChannelModal = () => props.setIsAddOpenChannelModal(false);

  return (
    <ModalUI
        open={props.isAddOpenChannelModal}
        onClose={onCloseAddChannelModal}
        title="Mute"
        >
        <div className="flex justify-center items-center p-3 flex-col  max-h-72 gap-2">

          <div className="flex flex-col">
            <select
            // defaultValue={componenetChannelModal}
              name="channels"
              id=""
              className="rounded-md py-1 px-2"
              // onChange={(e) => setcomponenetChannelModal(e.target.value)}
              >
              <option value="8h">8 hours</option>
              <option value="1w">1 week</option>
              <option value="always">Always</option>
            </select>
          </div>
          <Button onClick={() => {}} title="Submit"></Button>
        </div>
    </ModalUI>
  )
}
