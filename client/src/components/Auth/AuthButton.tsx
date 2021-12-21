import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface OAuthButtonProps {
    onClick?: (e: React.FormEvent) => void
    icon?: JSX.Element | false
    label?: string
    services: string
    children?: JSX.Element
    [x:string]: any;
}

export const AuthButton: React.FC<OAuthButtonProps> = ({
    onClick, icon, label, services, ...rest
}) => (
    <StyledButton provider={services} onClick={onClick} {...rest}>
        {icon}
        <span>{label}</span>
    </StyledButton>
);

const StyledButton = styled.button<{provider: string}>`
    ${(p: any) => p.provider === 'facebook' && tw`bg-facebook-main hover:bg-facebook-light`}
    ${(p: any) => p.provider === 'google' && tw`bg-google-main hover:bg-google-light`}
    ${(p: any) => p.provider === 'local' && tw`mt-8 bg-berry-darker hover:bg-berry-dark`}
    ${tw`
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
        shadow-md
        focus:outline-none
    `}
    span {
        ${tw`w-full`}
    }
`;