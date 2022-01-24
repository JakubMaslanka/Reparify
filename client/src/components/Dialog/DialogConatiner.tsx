import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { TransitionWrapper } from '../../utils/TransitionWrapper';

interface IDialog {
    onSubmit?: () => void,
    onClose: () => void,
    children: React.ReactNode,
    label?: string,
    stateHandler: {
        isOpen: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export const DialogConatiner: React.FC<IDialog> = ({
    onClose,
    stateHandler,
    children,
    label
}) => (
    <TransitionWrapper
        trigger={stateHandler.setOpen}
        triggerVal={stateHandler.isOpen}
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        appear={true}
    >
        <div className="fixed inset-0 z-50 overflow-y-scroll shadow-2xl">
            <div className="h-screen w-screen">
                <div className="max-w-2xl bg-gray-500 p-4 mx-auto shadow-2xl">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-gray-100 text-xl font-semibold">{label || "Dialog window"}</div>
                        <IoCloseOutline onClick={onClose} size="2rem" color="#FCFCFC" />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    </TransitionWrapper>
)
