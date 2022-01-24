import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { MdAvTimer } from "react-icons/md";

export const LoadingTimeout = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000);

      return () => clearInterval(timer);
    }, []);
    
    return (
        <Transition
            show={isVisible}
            enter="transition ease-in duration-150 transform"
            enterFrom="-translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition ease-in duration-150 transform"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-full opacity-0"
        >               
            <div className="flex flex-col justify-center">
                <div className="mx-auto">
                    <MdAvTimer size="3.5rem" color="#EAEAEA"/>
                </div>
                <p className="text-2xl font-bold text-greenish-light mt-10 text-center">Data fetching takes longer than usual...</p>
                <p className="text-base font-normal text-gray-300 text-center">Check the quality of your internet connection</p>
            </div>
        </Transition>
    )
};
