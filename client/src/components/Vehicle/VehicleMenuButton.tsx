interface VehicleMenuButtonProps {
    onClick: () => void;
    icon: JSX.Element;
    text: string;
};

export const VehicleMenuButton: React.FC<VehicleMenuButtonProps> = ({
    onClick, icon, text
}) => (
    <button className="flex items-center gap-4 rounded-md w-full p-4 text-sm font-medium hover:bg-white-600 transition-all ease-linear duration-100" onClick={onClick}>
        {icon}
        {text}
    </button>
);
