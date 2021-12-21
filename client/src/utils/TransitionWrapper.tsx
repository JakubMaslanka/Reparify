import React, { Fragment, useEffect } from "react"
import { Transition } from "@headlessui/react";

interface ITransitionWrapper {
    children: JSX.Element
    trigger: React.Dispatch<React.SetStateAction<boolean>>
    triggerVal: boolean
    enterFrom: string
    enterTo: string
    duration?: string | number
    leaveFrom?: string
    leaveTo?: string
    autoRun?: boolean
    [x:string]: any;
}

export const TransitionWrapper: React.FC<ITransitionWrapper> = ({
    children, 
    trigger, 
    triggerVal, 
    duration = 300, 
    enterFrom, 
    enterTo, 
    leaveFrom, 
    leaveTo,
    autoRun = true,
    ...rest
    }) => {
        useEffect(() => {
            if (autoRun) {
                trigger(true)
            }
        }, [trigger, autoRun])
        return (
            <Transition
                as={Fragment}
                show={triggerVal}
                enter={`transition ease-in-out duration-${duration} transform`}
                enterFrom={enterFrom}
                enterTo={enterTo}
                leave={`transition ease-in-out duration-${duration} transform`}
                leaveFrom={leaveFrom ? leaveFrom : enterTo}
                leaveTo={leaveTo ? leaveTo : enterFrom}
                {...rest}
            >
                {children}    
            </Transition>
        )
    }   