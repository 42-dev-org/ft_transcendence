interface PropsType {
  p1: number;
  p2: number;
}

export default function SingleGameResult({ p1, p2 }: PropsType): JSX.Element {
  return (
    <div className=" h-16 flex gap-1">
      <div className="w-16 h-full text-white text-2xl font-bold flex justify-center items-center">
        {p1}
      </div>
      <div className="w-16 h-full text-[#B2F35F] text-4xl font-bold flex justify-center items-center">
        VS
      </div>
      <div className="w-16 h-full text-white text-2xl font-bold flex justify-center items-center">
        {p2}
      </div>
    </div>
  );
}
