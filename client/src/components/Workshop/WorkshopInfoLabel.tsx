interface WorkshopInfoLabelProps {
    label: string;
    firstLine: string;
    secondLine?: string;
}
export const WorkshopInfoLabel: React.FC<WorkshopInfoLabelProps> = ({
    label,
    firstLine,
    secondLine
}) => (
    <div className="flex w-full flex-row justify-between items-start px-4 mb-1">
        <div className="text-gray-400 text-lg font-extralight">{label}</div>
        <div className="text-gray-200 text-xl font-normal text-right">
            {!!secondLine ? (
                <>
                    <span>{firstLine}</span>
                    <br />
                    <span>{secondLine}</span>
                </>
            ) : (firstLine)}
        </div>
    </div>
);
