import { useState } from "react";
import SectionTitle from "../section-title/section-title";
import OptionItem from "../option-item/option-item";

interface PropsType {
  data: {
    label: string;
    items: {
      label: string;
      key: number;
      icon?: JSX.Element;
    }[];
  };
}

export default function OptionList({ data }: PropsType): JSX.Element {
  const [selected, setSelected] = useState("");
  return (
    <div className="flex w-full flex-col justify-center items-center px-8 gap-4 ">
      <SectionTitle label={data.label} />

      {data.items.map((item) => (
        <OptionItem
          hander={() => {
            setSelected(item.label);
          }}
          icon={item.icon}
          key={item.key}
          label={item.label}
          selected={selected === item.label}
        />
      ))}
    </div>
  );
}
