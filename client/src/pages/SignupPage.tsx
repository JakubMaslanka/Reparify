import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../api/mutations';
import { SignUpForm } from "../components/Auth/SignUpForm";
import { useNavigate } from 'react-router-dom';
import { GET_CURRENT_USER } from '../api/queries';

type IError = { success: boolean, message: string } | null;

export const SignupPage = () => {
    const navigate = useNavigate();
    const [error, setErrors] = useState<IError>(null);
    const [signup, { loading, client }] = useMutation(SIGNUP_MUTATION, {
        onCompleted: ({ signup: { success, message, }}) => {
            if (success) {
                navigate('/dashboard');
                client.resetStore();
            } else {
                setErrors({
                    success,
                    message
                })
            }
        },
        update: (cache, { data: { signup: { currentUser } } }) => {
            try {
                cache.writeQuery({
                    query: GET_CURRENT_USER,
                    data: { currentUser }
                })
            } catch (error) {
                
            }
        }});
    return (
        <SignUpForm
            onSignUp={credentials => signup({ variables: { credentials } })}
            isSigningUp={loading}    
            isError={error}
        />
    );
}
