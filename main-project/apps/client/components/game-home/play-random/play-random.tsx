import React, { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Avatar from "assets-workspace/images/mouarsas.jpeg";
import Image from "next/image";
import spinner from "assets-workspace/images/spinner.gif";
import { friends } from "../invite-friend/data/friends";
import { user } from "../invite-friend/interface/user";
import { useAppSelector } from "../../../store/store";






export default function PlayRandom(): JSX.Element {
    const [timer, setTimer] = useState(60); // Initial timer value in seconds
    const user = useAppSelector(s => s.user.user)

    // Function to decrement the timer every second
    useEffect(() => {
        //emit join random mode
        return () => {
            //emit leave random mode 
        }
    }, [])
   

    return (
        <div className="flex flex-col items-center">
            <div className="w-full px-0 lg:px-12 flex flex-col md:flex-row items-center justify-between ">
                <div className=" w-40 mb-4 mt-10 overflow-hidden">
                    <div className="w-full h-40 flex rounded-lg border border-[#B2F35F] overflow-hidden flex-col">
                        <Image
                            className="w-full h-32 object-cover"
                            alt="profile"
                            src={user?.profileImage || ""}
                            width={300}
                            height={300}
                        />
                        <div className="bg-[#1c1e21] w-full h-8 flex  flex-col items-center">
                            <span className="text-[#e4e6eb] capitalize">{user?.login || ""}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center w-20 h-20 rounded-full border border-[#B2F35F]">
                    <Image
                        className="w-20 h-20 object-cover rounded-full"
                        alt="profile"
                        src={spinner}
                    />
                </div>

                <div className="w-40 mb-4 mt-10 overflow-hidden">
                    <div className="w-full h-40 flex rounded-lg border border-[#B2F35F] overflow-hidden flex-col">
                        <Image
                            className="w-full h-32 object-cover"
                            alt="profile"
                            src={Avatar}
                        />
                        <div className="bg-[#1c1e21] w-full h-8 flex flex-col items-center">
                            <span className="text-[#e4e6eb] capitalize">eheh</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="w-full text-center">
                <p className="text-[#e4e6eb]">
                    Queue: 2/20 waiting in the Queue
                </p>
                
            </div> */}
        </div>


    );
}
