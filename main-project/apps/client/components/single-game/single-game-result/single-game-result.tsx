interface PropsType {
  p1: number;
  p2: number;
}

export default function SingleGameResult({ p1, p2 }: PropsType): JSX.Element {

  
  return (
    <div className=" w-1/3 h-16 flex justify-between">
      <p className=" text-white text-2xl font-bold flex justify-center items-center">
        {p1}
      </p>
      <p className="text-[#B2F35F] text-[16px] font-bold flex justify-center items-center">
        VS
      </p>
      <p className=" text-white text-2xl font-bold flex justify-center items-center">
        {p2}
      </p>
    </div>
  );
}
