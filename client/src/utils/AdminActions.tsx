import { useAuth } from "./AuthProvider";

interface AdminActionsProps { 
    children: JSX.Element,
    otherCondition: boolean
}

export const AdminActions: React.FC<AdminActionsProps> = ({ 
    children,
    otherCondition
}) => {
    const { currentUser } = useAuth();
    if (!!currentUser && currentUser?.isAdmin) {
        return children;
    }
    if (!children || !currentUser || !otherCondition) {
        return null;
    }
    return children;
};