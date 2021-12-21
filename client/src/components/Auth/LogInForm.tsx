import React, { useState } from "react";
import tw from 'twin.macro';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaFacebook, FaGoogle, FaUnlock } from "react-icons/fa";
import { TransitionWrapper } from "../../utils/TransitionWrapper";
import { AuthButton } from "./AuthButton";
import { AuthInput } from "./AuthInput";

interface LoginCredentials {
    email: String, password: String
}

interface LoginFormProps {
    onLogin({email,password}: LoginCredentials): void
    isLoading: boolean
    isError: { success: boolean, message: string } | null
}

export const LogInForm: React.FC<LoginFormProps> = ({
  onLogin,
  isLoading,
  isError
}) => {
    const navigate = useNavigate();
    const emailRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const [transitionTrigger, setTransitionTrigger] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin({
            email: emailRef.current.value,
            password: passwordRef.current.value
        });
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }
    
    return (
        <TransitionWrapper
            trigger={setTransitionTrigger}
            triggerVal={transitionTrigger}
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
        >
            <PageContainer>
                <MdOutlineKeyboardArrowLeft color='#FFFFFF' size='2.4rem' onClick={() => navigate('/')} className='absolute top-4 left-4'/>
                <AppLogo>Reparify</AppLogo>
                <Container>
                    <FormContainer>
                        <Header>
                            <span className="text-3xl">Welcome back!</span>
                            <span className="text-lg">We're glad that you are with us!</span>
                        </Header>
                        <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8">
                            <AuthInput 
                                ref={emailRef}
                                disabled={isLoading}
                                type="email"
                                id="login-email"
                                error={isError}
                                successIcon={<MdOutlineEmail fill='#72767D' size='1.2rem'/>}
                                failureIcon={<MdOutlineEmail fill='#B20000' size='1.2rem'/>}
                                placeholder="Email"
                            />
                            <AuthInput 
                                ref={passwordRef}
                                disabled={isLoading}
                                type="password"
                                id="login-password"
                                error={isError}
                                successIcon={<FaUnlock fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaUnlock fill='#B20000' size='1.2rem'/>}
                                placeholder="Password"
                            />
                            <StyledLink to="/login">
                                Forgot password?
                            </StyledLink>
                            <AuthButton
                                type="submit" 
                                services="local"
                                label="Submit"
                                icon={
                                    isLoading && 
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                            />
                        </form>

                        <OrDivider>
                            <hr/>
                            <p>or</p>
                            <hr/>
                        </OrDivider>
                        <div className='flex flex-col gap-4'>
                            <AuthButton 
                                onClick={() => window.location.href = 'http://localhost:4000/auth/google'}
                                icon={<FaGoogle size='1.2rem'/>}
                                label='Continue with Google'
                                services='google'
                            />
                            <AuthButton 
                                onClick={() => window.location.href = 'http://localhost:4000/auth/facebook'}
                                icon={<FaFacebook size='1.4rem'/>}
                                label='Continue with Facebook'
                                services='facebook'
                            />
                        </div>
                        <Footer>
                            <p>
                                Don&#x27;t have an account?<br/>
                                <StyledLink to="/signup">
                                    Register here.
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
const OrDivider = styled.div`
    ${tw`
        flex
        flex-row
        justify-center
        items-center
        my-2
    `}
    hr {
        ${tw`
            h-px
            w-full
            bg-gray-500
        `}
    }
    p {
        ${tw`
            p-2
            text-white-500
        `}
    }
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
