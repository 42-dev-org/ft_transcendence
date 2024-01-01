import { ReactNode } from "react";

interface PropsType {
  hander: () => void;
  label: string;
  icon?: ReactNode;
  selected: boolean;
}

export default function OptionItem(props: PropsType) {
  return (
    <div
      className={
        "py-2   md:py-4 md:px-6 rounded-lg cursor-pointer   items-center font-semibold text-xs md:text-sm lg:text-base min-w-[220px] max-w-[520px]  flex justify-center gap-3 " +
        (props.selected
          ? "bg-[#b9ef72] text-black"
          : "hover:bg-[#00000097] text-white  bg-black ")
      }
      onClick={props.hander}
    >
      {
        // TODO: fix icon
      }
      {/* {props.icon && <props.icon className="w-5 h-5" />} */}
      {props.label}
    </div>
  );
}
