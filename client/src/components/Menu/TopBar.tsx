import { BsBell, BsSearch } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";

interface TopBarProps {
    title: string;
    menuHandler: (value: React.SetStateAction<boolean>) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
    title,
    menuHandler 
}) => (
    <div className="flex flex-row items-center bg-gray-700 py-4 px-4">
        <IoMenu onClick={() => menuHandler((prevState: boolean) => !prevState)} color="#F2F2F2" size="2.2rem" cursor="pointer" />
        <h2 className="w-full text-white-700 px-4 text-lg font-semibold">
            {title}
        </h2>
        <div className="flex flex-row gap-2">
            <div className="p-2 bg-gray-800 rounded-xl">
                <BsSearch color="#696D73" />
            </div>
            <div className="p-2 bg-gray-800 rounded-xl">
                <BsBell color="#696D73" />
            </div>
        </div>
    </div>
);
