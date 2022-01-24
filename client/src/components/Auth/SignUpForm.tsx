import React, { useState } from "react";
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
    isLoading: boolean
    isError: { success: boolean, message: string } | null
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
    onSignUp,
    isLoading,
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
            <div className="w-full flex flex-wrap mt-4">
                <MdOutlineKeyboardArrowLeft color='#FFFFFF' size='2.4rem' onClick={() => navigate(-1)} className='absolute top-4 left-4'/>
                <span className="w-full text-white-500 text-xl font-semibold text-center mt-8">Reparify</span>
                <div className="flex flex-col w-full sm:bg-gray-700 sm:rounded-3xl sm:shadow-2xl sm:max-w-xl sm:mx-auto sm:mt-8">
                    <div className="flex flex-col justify-center px-4 pt-4 max-w-xl md:justify-start md:pt-0 md:px-6">
                        <div className="mt-8 text-center text-white-600">
                            <span className="block text-3xl">Create an account!</span>
                            <span className="block text-lg">You won't regret it!</span>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8">
                            <AuthInput 
                                ref={firstNameRef}
                                disabled={isLoading}
                                type="firstName"
                                id="signup-firstName"
                                error={isError}
                                successIcon={<FaUser fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaUser fill='#B20000' size='1.2rem'/>}
                                placeholder="First name"
                            />
                            <AuthInput 
                                ref={lastNameRef}
                                disabled={isLoading}
                                type="lastName"
                                id="signup-lastName"
                                error={isError}
                                successIcon={<FaUser fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaUser fill='#B20000' size='1.2rem'/>}
                                placeholder="Last name"
                            />
                            <hr className="mt-4 border-gray-700 sm:border-gray-600" />
                            <AuthInput 
                                ref={emailRef}
                                disabled={isLoading}
                                type="email"
                                id="signup-email"
                                error={isError}
                                successIcon={<MdOutlineEmail fill='#72767D' size='1.2rem'/>}
                                failureIcon={<MdOutlineEmail fill='#B20000' size='1.2rem'/>}
                                placeholder="Email"
                            />
                            <AuthInput 
                                ref={passwordRef}
                                disabled={isLoading}
                                type="password"
                                id="signup-password"
                                error={isError}
                                successIcon={<FaUnlock fill='#72767D' size='1.2rem'/>}
                                failureIcon={<FaUnlock fill='#B20000' size='1.2rem'/>}
                                placeholder="Password"
                            />
                            <AuthInput 
                                ref={confirmPasswordRef}
                                disabled={isLoading}
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
                                disabled={isLoading}
                                icon={
                                    isLoading && 
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                }
                            />
                        </form>
                        <div className="pt-12 pb-12 text-center text-white-600">
                            <p>
                                Already have an account?<br/>
                                <Link className="font-semibold underline text-sm text-greenish-light hover:text-greenish-dark transition-all duration-75 ease-in-out" to="/login">
                                    Login here.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </TransitionWrapper>
    );
};
