"use client";
import Image from "next/image";
import React from "react";
import Button from "../../../../components/Button";
import AchevementCard from "../../../../components/Card/AchevementCard";
import HistoryCard from "../../../../components/Card/historyCard";
import withAuth from "../../../../hoc/auth";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../api";

const data = {
  name: "zakaria",
  url: "https://cdn.intra.42.fr/users/47192a7a27a46c2c714c6723e30a3cd2/zmaziane.jpg",
};

const data2 = {
  name: "amounach",
  url: "https://cdn.intra.42.fr/users/e02b4524213b7315479b9ed9f3551093/amounach.jpg",
};
const dataAchevment = [
  {
    name: "Member VIP",
    url: "https://media.istockphoto.com/id/1368016954/vector/vip-invitation-with-shiny-glowing-silver-crown-on-shield-and-ribbon-on-gray-curtain.jpg?s=1024x1024&w=is&k=20&c=Z1H06-rL5uoKjZWYpa6eUvUQVdWPZp9DVurIiCjTl30=",
  },
  {
    name: "Play first game",
    url: "https://media.istockphoto.com/id/1425117356/photo/security-shield-check-mark-icon-on-dark-background-3d-render-concept.jpg?s=612x612&w=0&k=20&c=biUUjoayElOTxm4hGMpVSiIBWeupRd_tVwxMJAhDAbU=",
  },
  {
    name: "win first game",
    url: "https://media.istockphoto.com/id/1490092075/vector/luxury-golden-star-trophy-award-on-black-background.jpg?s=1024x1024&w=is&k=20&c=D7jrTpxGosEooClb99FqDEUYtfWXAhlhDiFocECSrtA=",
  },
  {
    name: "win second game",
    url: "https://media.istockphoto.com/id/1447559506/vector/black-and-gold-award-with-glowing-blue-star.jpg?s=612x612&w=0&k=20&c=GBsc4YJoEIj53tINRKFZ0pHAdHx8dSGyGN4TCi2GEI8=",
  },
  {
    name: "win three games",
    url: "https://media.istockphoto.com/id/1489621737/vector/luxury-gold-award-trophy-on-dark-background.jpg?s=612x612&w=0&k=20&c=CijFELCY9vUbBbiTmE5yJLKYcL4ogPxfu46RTFafAnc=",
  },

  {
    name: "win five games",
    url: "https://media.istockphoto.com/id/1444599665/vector/luxury-gold-and-silver-award-trophy-on-black-background.jpg?s=612x612&w=0&k=20&c=TsZe9tJwM1cIGyzo0IeCgda7R5OJUFDw_PgyF8I56Ec=",
  },
  {
    name: "king",
    url: "https://media.istockphoto.com/id/1359963131/vector/golden-crown-on-black-background-with-light-effect.jpg?s=1024x1024&w=is&k=20&c=sBfYqcP7iD-iBnUGuIDRLdIHkacLwfFqikfsHGL1aFs=",
  },
  {
    name: " welcom ",
    url: "https://media.istockphoto.com/id/1056445350/photo/neon-sign-on-brick-wall-background-welcome-3d-rendering.jpg?s=612x612&w=0&k=20&c=HgV9FknkCyM7rt94VgXPHjVF6J81tKqWjR2nvIHGrj8=",
  },
];
function UserProfile() {
  const {id} = useParams();
  console.log(id)
  
  
  
  const query = useQuery({
    queryKey: ["get-friend", id],
    queryFn: (meta) => api.api().users.getFriend(meta.queryKey[1] as string),
  });
  
  if (query.isFetched) console.log(query.data?.data);
  const  displayName = `${query.data?.data.lastName}   ${query.data?.data.firstName}, ${query.data?.data.login}`


  return (
    <div className=" lg:overflow-hidden md:overflow-auto flex flex-col p-4 w-full h-full gap-y-5">
      <div
        className="w-full min-h-[300px] bg-[#ffffff1a] relative rounded-lg"
        style={{
          backgroundImage:
            "url(https://cdn.intra.42.fr/coalition/cover/76/Commodore_BG.jpg)",
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="w-full flex lg:flex-row flex-col gap-x-4 gap-y-14 py-2  px-4 ">
        <div className="lg:min-w-[140px]   relative">
          <Image
            width={140}
            height={140}
            className="rounded-full absolute border-4 border-[#ffffff1a] -top-24 lg:left-0  md:left-[40%] left-[30%]"
            alt="zakaria"
            src={query.data?.data.profileImage}
          />
        </div>
        <div className="flex  md:flex-row flex-col w-full gap-4 justify-between">
          <span className="text-white text-xl font-medium whitespace-nowrap">
            <strong className="text-white">

            {displayName} 
            </strong>
          </span>
          <div className="flex gap-2 md:flex-row flex-col">
            <Button onClick={() => null} title="Add Freind" />
            <Button
              onClick={() => null}
              title="Send Message"
              className="bg-[#ffffff1a] text-white"
            />
            <Button
              onClick={() => null}
              title="Invite to play"
              className="bg-[#ffffff1a] text-white"
            />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 mt-4  gap-5 ">
        <div className="overflow-y-auto max-h-72  flex  gap-4 flex-col">
          <h2>History</h2>

          {[...Array(9)].map((_, idx) => (
            <HistoryCard user1={data} user2={data2} key={idx} />
          ))}
        </div>
        <div className="overflow-y-auto max-h-72 gap-3 flex flex-col">
          <h2>Achievements</h2>
          <div className="grid  h-full rounded-lg  grid-cols-2 gap-5  w-full">
            {dataAchevment.map((dataAchevment, idx) => (
              <AchevementCard
                name={dataAchevment.name}
                url={dataAchevment.url}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default withAuth(UserProfile);
