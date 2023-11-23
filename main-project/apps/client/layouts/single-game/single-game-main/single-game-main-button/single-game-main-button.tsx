import Link from "next/link";
import { IconType } from "react-icons";

interface propsButton {
    title: string;
    link: string;
    ButtonIcon : React.ElementType;
}

export default function SingleGameMainButton (props: propsButton) :JSX.Element{
    const {title, link , ButtonIcon} = props
    return (
        <Link className="bg-[#37412b] py-4 px-6 flex flex-row rounded-xl gap-2 items-center hover:bg-[#B2F35F] hover:text-black font-bold" href={link}>
                <ButtonIcon />
                {title}
        </Link>
    );
}