import React, { useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LOGOUT_MUTATION } from '../api/mutations';
import { GET_CURRENT_USER } from '../api/queries';
import { ICurrentUser } from '../models/currentUser';

interface ContextInterface {
    currentUser: ICurrentUser | null
    isAuthorize: () => boolean
    unauthorize: () => void
};

const DEFAULT_CONTEXT_VALUE = {
    currentUser: null,
    isAuthorize: () => false,
    unauthorize: () => console.log('Trying to logout')
};

const AuthContext = React.createContext<ContextInterface>(DEFAULT_CONTEXT_VALUE);

export const useAuth = (): ContextInterface => (
    useContext(AuthContext)
);

const AuthProvider: React.FC<{children: any}> = ({children}) => {
    const navigate = useNavigate();
    // const location = useLocation();
    //@ts-ignore
    // const from = location.state.from.pathname || "/";
    // navigate(from, { replace: true });
    const { loading, error, data, client, refetch } = useQuery(GET_CURRENT_USER, {
        onError: (error) => {
            console.log(error.message);
        },
        errorPolicy: "all",
    });
    const [logout] = useMutation(LOGOUT_MUTATION);
    
    // Doesn't work properly
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