import { useState } from "react";
import SectionTitle from "../section-title/section-title";
import OptionItem from "../option-item/option-item";

interface PropsType {
  data: {
    label: string;
    items: {
      label: string;
      key: number;
      icon?: React.ReactNode;
    }[];
  };
}

export default function OptionList({data}: PropsType) {
  const [selected, setSelected] = useState("");
  return (
    <div className="flex w-full flex-col justify-center items-center px-8 gap-4 ">
      <SectionTitle label={data.label} />

      {data.items.map((item) => (
        <OptionItem
          icon={item.icon}
          label={item.label}
          hander={() => {
            setSelected(item.label);
          }}
          key={item.key}
          selected={selected === item.label}
        />
      ))}
    </div>
  );
}
