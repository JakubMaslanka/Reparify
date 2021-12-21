import React, { useState } from 'react'
import { TransitionWrapper } from '../utils/TransitionWrapper';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { IoMenu } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [transitionTrigger, setTransitionTrigger] = useState(false);

    return (
        <TransitionWrapper
            trigger={setTransitionTrigger}
            triggerVal={transitionTrigger}
            enterFrom="scale-90 opacity-0"
            enterTo="scale-100 opacity-100"
        >
            <div className='flex flex-col font-Rubik'>
                <div className='flex justify-between m-4'>
                    <h2 className='text-white-500 text-xl font-semibold font-heading'>Reparify</h2>
                    <DropdownMenu />
                </div>
                <div className='px-6 py-14'>
                    <h2 className="ml-auto">
                        <span className="mt-2 text-2xl leading-8 font-bold text-berry-darker sh">
                            Store cars repair history in one place!
                        </span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-white-600">
                        Share easily your repair story when selling your vehicle! Save and authenticate your repairs.
                    </p>
                    <div className='flex flex-col py-8 gap-8 items-stretch md:items-start md:flex-row'>
                        <button 
                            onClick={() => {
                                setTransitionTrigger(false)
                                navigate('/login')
                            }} 
                            className='bg-greenish-light p-4 rounded-2xl shadow-xl hover:bg-greenish-dark'>
                            <div className='flex justify-between items-center gap-4'>
                                <span className='text-white-600 text-md font-medium'>Try for FREE</span>
                                <div className='p-1 bg-white-600 rounded-full'>
                                    <MdOutlineKeyboardArrowRight size='1.4rem' color='#4FDC7C'/>
                                </div>
                            </div>
                        </button>
                        <button className='bg-berry-darker p-4 rounded-2xl shadow-xl hover:bg-berry-dark'>
                            <div className='flex justify-between items-center gap-4'>
                                <span className='text-white-600 text-md font-medium'>Source Code</span>
                                <div className='p-1 bg-white-600 rounded-full'>
                                    <MdOutlineKeyboardArrowRight size='1.4rem' color='#5865F2'/>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </TransitionWrapper>
    )
}

const DropdownMenu: React.FC = () => {
    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
            <IoMenu size='1.8rem' color='#FFFFFF'/>
        </Menu.Button>
        <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white-500 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                            Option #1
                        </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                            Option #2
                        </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                            Option #3
                        </button>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Transition>
      </Menu>
    )
  }