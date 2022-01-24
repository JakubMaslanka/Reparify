import { useNavigate } from "react-router-dom";
import { VehicleUnmarkFromSale } from "../Vehicle/mutations/VehicleMarkForSaleAction";

import { AiOutlineClose } from "react-icons/ai";
import { TransitionWrapper } from "../../utils/TransitionWrapper";

import { IVehicle } from '../../models/vehicle';

interface ActiveVehicleBarProps {
    setVehicleSelected: React.Dispatch<React.SetStateAction<boolean>>
    handleDialog: (action: string) => void
    isVehicleSelected: boolean
    activeVehicle: IVehicle
}
export const ActiveVehicleBar: React.FC<ActiveVehicleBarProps> = ({
    setVehicleSelected,
    handleDialog,
    isVehicleSelected,
    activeVehicle
}) => {
    const navigate = useNavigate();
    return (
        <TransitionWrapper
            trigger={setVehicleSelected}
            triggerVal={isVehicleSelected}
            autoRun={false}
            enterFrom="-translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
        >
            <div className="w-full h-11/12 md:h-screen relative bg-gray-700 shadow-2xl p-4 z-20 overflow-y-scroll md:overflow-y-auto">
                <div className="absolute text-gray-100 top-0 right-0 p-4" onClick={() => setVehicleSelected(false)}>
                    <AiOutlineClose size="1.6rem" />
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-gray-200 text-xl font-semibold">
                        {`${activeVehicle.mark} ${activeVehicle.model}`}
                    </p>
                    <p className="text-gray-400 text-sm font-light">
                        VIN: {activeVehicle.vin}
                    </p>
                </div>
                <div className="flex flex-col gap-8 mt-8">
                    <DaysLeftCounter label="Valid Technical Inspection:" date={activeVehicle.techReviewExpDate} />
                    <DaysLeftCounter label="Valid Insurance:" date={activeVehicle.insuranceExpDate} />
                    <DaysLeftCounter label="Last service entry at:" date={activeVehicle.repairList[0] ? activeVehicle.repairList[activeVehicle.repairList.length - 1].createdAt : "No service entry found"} readOnly={true} />
                </div>
                <hr className="border-1 border-greenish-dark my-8" />
                    { !activeVehicle.isArchived ? (
                        <div className="flex flex-col gap-4 mt-8 w-full text-center">
                            <button 
                                onClick={() => handleDialog('CreateRepairOpen')} 
                                className="ActiveBar_button--primary"
                                children={"Add service entry"}
                            />
                            <button 
                                onClick={() => navigate(`/vehicle/${activeVehicle.id}/edit`)} 
                                className="ActiveBar_button--normal"
                                children={"Edit vehicle information"}
                            />
                            {!activeVehicle.isMarkedForSale ? (
                                <button 
                                    onClick={() => handleDialog('MarkForSaleVehicleOpen')} 
                                    className="ActiveBar_button--normal"
                                    children={"Mark the vehicle for sale"}
                                />
                            ) : (
                                <VehicleUnmarkFromSale 
                                    vehicleId={activeVehicle.id} 
                                    callback={() => handleDialog('CleanUp')}
                                />
                            )}
                            <button 
                                onClick={() => handleDialog('ArchiveVehicleOpen')}
                                className="ActiveBar_button--danger"
                                children={"Archive the vehicle"}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8 items-start">
                            <p className="text-gray-200 text-base font-normal">
                                This vehicle has been archived and its details are read only! <br />
                                <span className="text-greenish-dark text-base font-semibold">
                                    To do an action on this vehicle, you have to get rid of the "archive" flag.
                                </span>
                            </p>
                            <button 
                                onClick={() => navigate(`/vehicle/${activeVehicle.id}`)}
                                className="bg-greenish-light px-3 py-1 text-gray-200 font-extralight uppercase text-sm shadow-2xl rounded-2xl transition-all duration-200 ease-linear cursor-pointer hover:bg-greenish-dark" 
                                children={"Go To Vehicle Page"}
                            />
                        </div>
                    )}
                <div className="flex flex-col gap-4 mt-8">
                    <SwitchCheckbox labelText="Allow sending notifications about the vehicle:" />
                </div>
            </div>
        </TransitionWrapper>
    );
};

const SwitchCheckbox: React.FC<{ labelText: string }> = ({ 
    labelText
}) => (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
        <div className="flex flex-col">
            <div className="w-full h-full text-gray-200 text-base font-medium">{labelText}</div>
            <small className="text-danger-dark -mt-1">Function isn't implemented yet</small>
        </div>
        <label htmlFor={labelText} className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" id={labelText} className="sr-only" />
                <div className="block bg-gray-800 w-14 h-8 rounded-full"></div>
                <div className="switch-dot"></div>
            </div>
        </label>
    </div>
);

interface IDaysLeftCounter {
    label: string,
    date: string,
    readOnly?: boolean
};

const DaysLeftCounter: React.FC<IDaysLeftCounter> = ({
    label,
    date,
    readOnly = false
}) => {
    const daysLeft = (dateToCompare: string): number => {
        const oneDayInMs: number = 24 * 60 * 60 * 1000;
        const date: Date | unknown = new Date(dateToCompare);
        const now: Date | any = new Date(Date.now());

        return Math.round((date as number - now as number) / oneDayInMs);
    };

    const borderStyle = (date: string) => {
        const result = daysLeft(date);
        if (readOnly) return 'relative p-2 border border-gray-800 rounded-md';

        return result < 14 ? 
            'relative p-2 border border-danger-light rounded-md' : 
            'relative p-2 border border-greenish-light rounded-md';
    };
    
    if (readOnly) {
        return (
            <div className={borderStyle(date)}>
                <p className="DaysLeftCounter_border">{label}</p>
                <span className="text-gray-300 text-md font-semibold">{new Date(date).toLocaleDateString() && date}</span>
            </div>
        );
    };

    return (
        <div className={borderStyle(date)}>
            <p className="DaysLeftCounter_border">{label}</p>
            <span className="text-gray-300 text-md font-semibold">{daysLeft(date)} days left</span>
        </div>
    );
};