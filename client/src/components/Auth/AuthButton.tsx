import React from "react";

interface OAuthButtonProps {
    onClick?: (e: React.FormEvent) => void
    icon?: JSX.Element | false
    label?: string
    services: string
    children?: JSX.Element
    [x:string]: any;
}

export const AuthButton: React.FC<OAuthButtonProps> = ({
    onClick,
    icon,
    label,
    services,
    ...rest
}) => (
    <button
        className={`
            ${services === 'facebook' && 'bg-facebook-main hover:bg-facebook-light'}
            ${services === 'google' && 'bg-google-main hover:bg-google-light'}
            ${services === 'local' && 'mt-8 bg-greenish-light hover:bg-greenish-dark'}
            flex
            flex-row
            justify-center
            items-center
            px-4
            py-2
            text-base
            font-semibold
            text-center
            text-white-500
            transition
            duration-200
            ease-in
            shadow-lg
            rounded-md
            focus:outline-none
        `}
        onClick={onClick}
        {...rest}
    >
        {icon}
        <span className="w-full">{label}</span>
    </button>
);