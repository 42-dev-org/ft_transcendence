import { useState } from "react";
import SectionTitle from "../section-title/section-title";
import OptionItem from "../option-item/option-item";

interface PropsType {
  data: {
    label: string;
    items: {
      label: string;
      value: string,
      key: number;
      icon?: React.ReactNode;
    }[];
  };
}

const OptionList = ({ data, setLevelOrType}) => {
  const [selected, setSelected] = useState('');

  const handleOptionClick = (itemValue) => {
    setSelected(itemValue);
    setLevelOrType(itemValue);
  };

  return (
    <div className="flex w-full flex-col md:flex-row justify-center items-center px-8 gap-4 py-3">
      <SectionTitle label={data.label} />

      {data.items.map((item) => (
        <OptionItem
          icon={item.icon}
          label={item.label}
          hander={() => handleOptionClick(item.value)}
          key={item.key}
          selected={selected === item.value}
        />
      ))}
    </div>
  );
};

export default OptionList
