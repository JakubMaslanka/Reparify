import { useNavigate } from "react-router-dom";
import { Vehicle } from '../../models/vehicle';
import { TransitionWrapper } from "../../utils/TransitionWrapper";
import { AiOutlineClose } from "react-icons/ai";

interface ActiveVehicleBarProps {
    setVehicleSelected: React.Dispatch<React.SetStateAction<boolean>>;
    isVehicleSelected: boolean;
    activeVehicle: Vehicle;
}
export const ActiveVehicleBar: React.FC<ActiveVehicleBarProps> = ({
    setVehicleSelected, 
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
            <div className="w-full relative bg-gray-700 shadow-2xl p-4 z-20">
                <div className="absolute text-gray-100 top-0 right-0 p-4" onClick={() => setVehicleSelected(false)}><AiOutlineClose size="1.6rem" /></div>
                <div className="flex flex-col mt-4">
                    <p className="text-gray-200 text-xl font-semibold">{`${activeVehicle.mark} ${activeVehicle.model}`}</p>
                    <p className="text-gray-400 text-sm font-light">VIN: {activeVehicle.vin}</p>
                </div>
                <div className="flex flex-col gap-8 mt-8">
                    <IndicatorFees label="Valid Technical Inspection:" date={activeVehicle.techReviewExpDate} />
                    <IndicatorFees label="Valid Insurance:" date={activeVehicle.insuranceExpDate} />
                    <IndicatorFees label="Last service entry at:" date={activeVehicle.repairList[activeVehicle.repairList.length - 1].createdAt} readOnly={true} />
                </div>
                <hr className="border-1 border-greenish-dark my-8" />
                <div className="flex flex-col gap-4 mt-8 w-full text-center">
                    <button onClick={() => navigate(`/vehicle/${activeVehicle.id}/add-repair`)} className="button-primary">Add service entry</button>
                    <button onClick={() => navigate(`/vehicle/${activeVehicle.id}/edit`)} className="button-normal">Edit vehicle information</button>
                    <button onClick={() => navigate(`/vehicle/${activeVehicle.id}/delete`)} className="button-danger">Archive the vehicle</button>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                    <SwitchInput labelText="Mark the vehicle for sale:" />
                    <SwitchInput labelText="Allow sending notifications about the vehicle:" />
                </div>
            </div>
        </TransitionWrapper>
    );
};

const SwitchInput = ({labelText}: {labelText: string}) => (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
        <div className="w-full h-full text-gray-200 text-base font-medium">{labelText}</div>
        <label htmlFor={labelText} className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" id={labelText} className="sr-only" />
                <div className="block bg-gray-800 w-14 h-8 rounded-full"></div>
                <div className="switch-dot"></div>
            </div>
        </label>
    </div>
)

interface IndicatorProps {
    label: string,
    date: string,
    readOnly?: boolean
}

const IndicatorFees: React.FC<IndicatorProps> = ({label, date, readOnly = false}) => {
    
    const daysLeft = (dateToCompare: string): number => {
        const oneDayInMs: number = 24 * 60 * 60 * 1000;
        const date: Date | unknown = new Date(dateToCompare);
        const now: Date | any = new Date(Date.now());

        return Math.round((date as number - now as number) / oneDayInMs);
    }

    const indicatorBorderColor = (date: any) => {
        const result = daysLeft(date);
        if (readOnly) return 'relative p-2 border border-gray-800 rounded-md';

        return result < 14 ? 
            'relative p-2 border border-danger-light rounded-md' : 
            'relative p-2 border border-greenish-light rounded-md';
    }
    
    if (readOnly) {
        return (
            <div className={indicatorBorderColor(date)}>
                <p className="cool-border">{label}</p>
                <span className="text-gray-300 text-md font-semibold">{new Date(date).toLocaleDateString()}</span>
            </div>
        )
    }

    return (
        <div className={indicatorBorderColor(date)}>
            <p className="cool-border">{label}</p>
            <span className="text-gray-300 text-md font-semibold">{daysLeft(date)} days left</span>
        </div>
    )
}