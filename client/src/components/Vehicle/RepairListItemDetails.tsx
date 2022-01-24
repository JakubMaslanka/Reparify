import { Transition, Disclosure } from '@headlessui/react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { MdCheck, MdOutlineClose } from 'react-icons/md';
import { IRepair } from '../../models/repair';

interface RepairListItemDetailsProps {
    repair: IRepair;
};

export const RepairListItemDetails: React.FC<RepairListItemDetailsProps> = ({ repair }) => (
    <Disclosure>
        {({ open }) => (
            <>
                <Disclosure.Button className="w-full bg-[#D1FFD2] px-3 py-1 rounded-lg shadow-2xl">
                    <div className="flex flex-row items-center justify-between">
                        <span className="text-greenish-dark text-base font-semibold">
                            Details:
                        </span>
                        {open ? <HiOutlineChevronUp color="#3BA55D" size="1.5rem" /> : <HiOutlineChevronDown color="#3BA55D" size="1.5rem" />}
                    </div>
                </Disclosure.Button>
                <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform opacity-0 -translate-y-100"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition duration-100 ease-out"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 -translate-y-100"
                >
                    <Disclosure.Panel unmount className="px-4 py-2">
                        <span className="text-gray-400 text-sm">
                            Predefined changes:
                        </span>
                        <div className="flex flex-wrap gap-2 py-4 px-2">
                            <RepairCheckBox condition={!!repair.oilChange} label='Oil change' />
                            <RepairCheckBox condition={!!repair.oilFilterChange} label='Oil Filter Change' />
                            <RepairCheckBox condition={!!repair.fuelFilterChange} label='Fuel Filter Change' />
                            <RepairCheckBox condition={!!repair.dustFilterChange} label='Dust Filter Change' />
                            <RepairCheckBox condition={!!repair.airConditioningReview} label='Air Conditioning Review' />
                            <RepairCheckBox condition={!!repair.brakeFluid} label='Brake Fluid' />
                            <RepairCheckBox condition={!!repair.coolantFluid} label='Coolant Fluid' />
                            <RepairCheckBox condition={!!repair.sparkPlugsChange} label='Spark Plugs Change' />
                            <RepairCheckBox condition={!!repair.engineTiming} label='Engine Timing' />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">
                                Other changes:
                            </p>
                            <span className="m-0 px-2 text-sm font-medium text-gray-600">
                                {!!repair.otherChanges ? repair.otherChanges : "Not specified"}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">
                                Recommendations:
                            </p>
                            <span className="m-0 px-2 text-sm font-medium text-gray-600">
                                {!!repair.recommendations ? repair.recommendations : "Not specified"}
                            </span>
                        </div>
                    </Disclosure.Panel>
                </Transition>
            </>
        )}
    </Disclosure>
);

interface RepairCheckBoxProps {
    condition: boolean
    label: string
}

const RepairCheckBox: React.FC<RepairCheckBoxProps> = ({
    condition,
    label
}) => (
    <div className={`flex flex-row items-center justify-start gap-2 ${condition ? 'bg-greenish-light' : 'bg-danger-light'} p-1 px-2 rounded-full`}>
        {condition ? <MdCheck size="1.5rem" color="#4FDC7C" className="z-50 bg-white-500 rounded-full p-1"/> : <MdOutlineClose size="1.5rem" color="#ED4245" className="z-50 bg-white-500 rounded-full p-1"/>}
        <span className="text-white-600 font-medium">{label}</span>
    </div>
);