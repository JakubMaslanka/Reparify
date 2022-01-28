import React, { useState } from "react";
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
    onLogin({ email, password }: LoginCredentials): void
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
            <div className="w-full flex flex-wrap mt-4">
                <MdOutlineKeyboardArrowLeft color='#FFFFFF' size='2.4rem' onClick={() => navigate('/')} className='absolute top-4 left-4'/>
                <span className="w-full text-white-500 text-xl font-semibold text-center mt-8">Reparify</span>
                <div className="flex flex-col w-full sm:bg-gray-700 sm:rounded-3xl sm:shadow-2xl sm:max-w-xl sm:mx-auto sm:mt-8">
                    <div className="flex flex-col justify-center px-4 pt-4 max-w-xl md:justify-start md:pt-0 md:px-6">
                        <div className="mt-8 text-center text-white-600">
                            <span className="block text-3xl">Welcome back!</span>
                            <span className="block text-lg">We're glad that you are with us!</span>
                        </div>
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
                            {/* <Link className="font-semibold underline text-sm text-greenish-light hover:text-greenish-dark transition-all duration-75 ease-in-out" to="/login">
                                Forgot password?
                            </Link> */}
                            <AuthButton
                                type="submit" 
                                services="local"
                                label="Submit"
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

                        <div className="flex flex-row justify-center items-center my-2">
                            <hr className="h-px w-full bg-gray-500" />
                            <p className="p-2 text-white-500">or</p>
                            <hr className="h-px w-full bg-gray-500" />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <AuthButton 
                                onClick={() => window.location.href = !!process.env.SERVER_URI ? `${process.env.SERVER_URI}/auth/google` : 'http://localhost:4000/auth/google'}
                                icon={<FaGoogle size='1.2rem'/>}
                                label='Continue with Google'
                                services='google'
                            />
                            <AuthButton 
                                onClick={() => window.location.href = !!process.env.SERVER_URI ? `${process.env.SERVER_URI}/auth/facebook` : 'http://localhost:4000/auth/facebook'}
                                icon={<FaFacebook size='1.4rem'/>}
                                label='Continue with Facebook'
                                services='facebook'
                            />
                        </div>
                        <div className="pt-12 pb-12 text-center text-white-600">
                            <p>
                                Don&#x27;t have an account?<br/>
                                <Link className="font-semibold underline text-sm text-greenish-light hover:text-greenish-dark transition-all duration-75 ease-in-out" to="/signup">
                                    Register here.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </TransitionWrapper>
    );
};