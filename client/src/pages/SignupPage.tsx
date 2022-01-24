import { useState } from 'react'
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../api/mutations';
import { SignUpForm } from "../components/Auth/SignUpForm";
import { useNavigate } from 'react-router-dom';
import { GET_CURRENT_USER } from '../api/queries';

import Toast from '../utils/Toast';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { ICurrentUser } from '../models/currentUser';

interface ISignupMutation {
    signup: SignupMutationResult
}

interface SignupMutationResult {
    success: boolean,
    message: string,
    currentUser: ICurrentUser
}

type IError = { success: boolean, message: string } | null;

export const SignupPage: React.FC = () => {
    useDocumentTitle('Signup to app | Reparify');
    const navigate = useNavigate();
    const [error, setErrors] = useState<IError>(null);
    
    const [
        signup,
        { 
            loading,
            client 
        }
    ] = useMutation<ISignupMutation | any>(SIGNUP_MUTATION, {
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
        onError: (error) => setErrors({success: false, message: error.message}),
        update: (cache, { data: { signup: { currentUser } } }) => {
            try {
                cache.writeQuery({
                    query: GET_CURRENT_USER,
                    data: { currentUser }
                })
            } catch (error) {
                Toast('error', error as string)
            }
        }
    });

    return (
        <SignUpForm
            onSignUp={credentials => signup({ variables: { credentials } })}
            isLoading={loading}    
            isError={error}
        />
    );
}
