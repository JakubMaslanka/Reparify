import { TransitionWrapper } from "../../utils/TransitionWrapper";
import { IoLogOutOutline } from "react-icons/io5";
import { ICurrentUser } from "../../models/currentUser";

interface FooterBarProps {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    openMenu: boolean;
    currentUser: ICurrentUser;
    unauthorize: () => void;
}
export const FooterBar: React.FC<FooterBarProps> = ({
    setOpenMenu, 
    openMenu, 
    currentUser, 
    unauthorize
}) => (
    <TransitionWrapper
        trigger={setOpenMenu}
        triggerVal={openMenu}
        duration="500"
        autoRun={false}
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
    >
        <div className="absolute flex flex-col w-screen md:w-4/12 bg-gray-900 bottom-0 shadow-2xl z-50">
            <div className="flex flex-row items-center justify-start gap-4 p-4">
                <img src={currentUser.avatar} alt="avatar" className="h-10 rounded-full" />
                <div className="w-full flex flex-col">
                    <div className="text-gray-300 text-lg font-medium">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                    <div className="text-gray-500 text-sm font-normal -mt-1">{currentUser.email}</div>
                </div>
                <IoLogOutOutline color="#4FDC7C" size="2.5rem" onClick={() => unauthorize()} />
            </div>
        </div>
    </TransitionWrapper>
);
