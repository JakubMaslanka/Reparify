import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LogInForm } from "../components/Auth/LogInForm";
import { LOGIN_MUTATION } from '../api/mutations';
import { GET_CURRENT_USER } from '../api/queries';
import { ICurrentUser } from '../models/currentUser';

interface ILoginMutation {
    login: LoginMutationResult
}

interface LoginMutationResult {
    success: boolean,
    message: string,
    currentUser: ICurrentUser
}

type IError = { success: boolean, message: string } | null;

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setErrors] = useState<IError>(null);

    const [login, { loading, client }] = useMutation<ILoginMutation | any>(LOGIN_MUTATION, {
        onCompleted: ({ login: { success, message } }) => {
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
        update: (cache, { data: { login: { currentUser } } }) => {
            try {
                cache.writeQuery({
                    query: GET_CURRENT_USER,
                    data: { currentUser }
                })
            } catch (error) {
                
            }
        }
    });
    return (
        <LogInForm
            onLogin={credentials => login({ variables: { credentials }})}
            isLoading={loading}
            isError={error}
        />
    );
}