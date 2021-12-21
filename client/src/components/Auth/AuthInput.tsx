import { forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

interface AuthInputProps {
    disabled: boolean
    type: string
    error: { success: boolean, message: string } | null
    successIcon: JSX.Element
    failureIcon: JSX.Element
    placeholder: string
    id: string
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(({
    disabled, type, error, successIcon, failureIcon, placeholder, id
}, ref) => (
    <>
        {error && error.message.includes(type) ? (
            <InputContainer>
                <label>{error.message}</label>
                <div className="flex relative">
                    <span>{failureIcon}</span>
                    <StyledInput ref={ref} disabled={disabled} required type={type} id={id} placeholder={placeholder} />
                </div>
            </InputContainer>
        ) : (
            <InputContainer>
                <div className="flex relative">
                    <span>{successIcon}</span>
                    <StyledInput ref={ref} disabled={disabled} required type={type} id={id} placeholder={placeholder} />
                </div>
            </InputContainer>
        )}
    </>
));

const InputContainer = styled.div`
    ${tw`
        flex
        flex-col
        pt-4
    `}
    span {
        ${tw`
            px-3
            inline-flex
            items-center
            shadow-sm
            text-sm
            border-t
            border-l
            border-b
            bg-gray-700
            border-gray-500
            text-gray-500
        `}
    }
    label {
        ${tw`
            text-danger-dark
            font-semibold
        `}
    }
`;
const StyledInput = styled.input`
    ${tw`
        flex-1 
        appearance-none 
        border 
        border-gray-500 
        w-full 
        py-2 
        px-4 
        bg-gray-800 
        text-white-700 
        placeholder-gray-400 
        shadow-sm text-base 
        focus:border-berry-darker 
        focus:outline-none
    `}        
`;