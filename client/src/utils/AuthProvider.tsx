import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_MUTATION } from '../api/mutations';
import { GET_CURRENT_USER } from '../api/queries';
import { ICurrentUser } from '../models/currentUser';
import Toast from './Toast';

interface ContextInterface {
    currentUser: ICurrentUser | null
    isAuthorize: () => boolean
    unauthorize: () => void
};

interface AuthProviderProps {
    children: JSX.Element[]
}

const DEFAULT_CONTEXT_VALUE = {
    currentUser: null,
    isAuthorize: () => false,
    unauthorize: () => console.log('Trying to logout')
};

const AuthContext = React.createContext<ContextInterface>(DEFAULT_CONTEXT_VALUE);

export const useAuth = (): ContextInterface => (
    useContext(AuthContext)
);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const navigate = useNavigate();
    const { loading, error, data, client, refetch } = useQuery(GET_CURRENT_USER, {
        onError: error => Toast('error', error.message),
        errorPolicy: "all",
    });
    const [logout] = useMutation(LOGOUT_MUTATION);
    
    const isAuthorize = () => {
        refetch();
        return !!data?.currentUser;
    };
    
    const unauthorize = (): void => {
        navigate("/");
        logout();
        client.resetStore();
    }
    
    const authValue = {
        ...DEFAULT_CONTEXT_VALUE,
        isAuthorize,
        unauthorize
    };

    if (!loading && !error) {
        authValue.currentUser = data.currentUser;
    }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;