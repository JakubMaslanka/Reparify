import React, { useState } from "react";
import tw from 'twin.macro';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaLock, FaUnlock, FaUser } from "react-icons/fa";
import { TransitionWrapper } from "../../utils/TransitionWrapper";
import { AuthButton } from "./AuthButton";
import { AuthInput } from "./AuthInput";

interface SignUpCredentials {
    firstName: string, lastName: string, email: string, password: string
}

interface SignUpFormProps {
    onSignUp({firstName, lastName, email, password}: SignUpCredentials): void
    isSigningUp: boolean
    isError: { success: boolean, message: string } | null
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
    onSignUp,
    isSigningUp,
    isError
}) => {
    const navigate = useNavigate();
    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const firstNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const lastNameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const confirmPasswordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const [transitionTrigger, setTransitionTrigger] = useState(false);
    const [arePasswordsMatch, setPasswordsMatch] = useState<SignUpFormProps["isError"]>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setPasswordsMatch({
                success: false,
                message: "The password don't match!"
            })
            return
        }
        setPasswordsMatch(null);
        onSignUp({
            email: emailRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            password: passwordRef.current.value
        });
        emailRef.current.value = '';
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
    }
    
    return (
        <TransitionWrapper
            trigger={setTransitionTrigger}
            triggerVal={transitionTrigger}
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
        >
            <PageContainer>
                <MdOutlineKeyboardArrowLeft color='#FFFFFF' size='2.4rem' onClick={() => navigate(-1)} className='absolute top-4 left-4'/>
                <AppLogo>Reparify</AppLogo>
                <Container>
                    <FormContainer>
                        <Header>
                            <span className="text-3xl">Create an account!</span>
                            <span className="text-lg">You won't regret it!</span>
                        </Header>
                        <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8">
                            <AuthInput 
                                ref={firstNameRef}
                                disabled={isSigningUp}
                                type="firstName"
                                id="signup-firstName"
                                error={isError}
                                successIcon={<FaUser fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaUser fill='#B20000' size='1.2rem'/>}
                                placeholder="First name"
                            />
                            <AuthInput 
                                ref={lastNameRef}
                                disabled={isSigningUp}
                                type="lastName"
                                id="signup-lastName"
                                error={isError}
                                successIcon={<FaUser fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaUser fill='#B20000' size='1.2rem'/>}
                                placeholder="Last name"
                            />
                            <hr className="mt-3 border-gray-700" />
                            <AuthInput 
                                ref={emailRef}
                                disabled={isSigningUp}
                                type="email"
                                id="signup-email"
                                error={isError}
                                successIcon={<MdOutlineEmail fill='#72767D' size='1.2rem'/>}
                                failureIcon={<MdOutlineEmail fill='#B20000' size='1.2rem'/>}
                                placeholder="Email"
                            />
                            <AuthInput 
                                ref={passwordRef}
                                disabled={isSigningUp}
                                type="password"
                                id="signup-password"
                                error={isError}
                                successIcon={<FaUnlock fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaUnlock fill='#B20000' size='1.2rem'/>}
                                placeholder="Password"
                            />
                            <AuthInput 
                                ref={confirmPasswordRef}
                                disabled={isSigningUp}
                                type="password"
                                id="signup-password-confirm"
                                error={arePasswordsMatch}
                                successIcon={<FaLock fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaLock fill='#B20000' size='1.2rem'/>}
                                placeholder="Confirm password"
                            />
                            <AuthButton
                                type="submit" 
                                services="local"
                                label="Register"
                                icon={
                                    isSigningUp && 
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                            />
                        </form>
                        <Footer>
                            <p>
                                Already have an account?<br/>
                                <StyledLink to="/login">
                                    Login here.
                                </StyledLink>
                            </p>
                        </Footer>
                    </FormContainer>
                </Container>
            </PageContainer>
        </TransitionWrapper>
    );
}

const PageContainer = styled.div`
    ${tw`
        w-full
        flex
        flex-wrap
        mt-4
    `}
`;
const Container = styled.div`
    ${tw`
        flex 
        flex-col 
        w-full 
        md:w-1/2
    `}
`;
const FormContainer = styled.div`
    ${tw`
        flex 
        flex-col 
        justify-center 
        px-8 
        pt-8 
        my-auto 
        md:justify-start 
        md:pt-0 
        md:px-24 
        lg:px-32
    `}
`;
const AppLogo = styled.div`
    ${tw`
        w-full
        text-white-500
        text-xl
        font-semibold
        text-center
        mt-8
    `}
`;
const Header = styled.div`
    span {
        display: block
    }
    ${tw`
        text-center 
        text-white-600
    `}
`;
const StyledLink = styled(Link)`
    ${tw`
        font-semibold
        underline
        text-sm
        text-berry-light
    `}
`;
const Footer = styled.div`
    ${tw`
        pt-12
        pb-12
        text-center
        text-white-600
    `}
`;
