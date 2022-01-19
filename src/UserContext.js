import { useContext, createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = createContext();

export const useUserContext = () => {
    const user = useContext(UserContext);
    let userId = user.sub;
    let prefix = 'auth0|';
    if (userId.startsWith(prefix)) {
        userId = userId.slice(prefix.length)
    }
    return userId;
}

export default function UserContextProvider({ children }) {
    const { user } = useAuth0();

    return (
        <UserContext.Provider value={ user }>
            { children }
        </UserContext.Provider>
    );
}
