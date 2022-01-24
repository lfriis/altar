import React, {
	Dispatch,
	useReducer,
	createContext,
	useContext,
	ReactNode,
} from 'react';
import { AuthReducer, UserAction, IUserState } from './index';
import ValidateAuthentication from './ValidateAuthentication';
/**
 * * Building initial user state
 */
const currentUser = localStorage.getItem('currentUser');
const userData: IUserState = currentUser ? JSON.parse(currentUser) : null;

const initialUserState: IUserState = {
	currentUser: userData?.currentUser,
	accountId: userData?.accountId,
	version: userData?.version,
	authenticated: false,
	loading: true,
	error: null,
};

const AuthStateContext = createContext<IUserState>(initialUserState);
const AuthDispatchContext = createContext<Dispatch<UserAction>>(() => {});

export function useAuthState() {
	const context = useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within an AuthProvider');
	}

	return context;
}

export function useAuthDispatch() {
	const context = useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within an AuthProvider');
	}

	return context;
}

interface IProps {
	children: ReactNode;
}

export function AuthProvider({ children }: IProps) {
	const [user, dispatch] = useReducer(AuthReducer, initialUserState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				<ValidateAuthentication>{children}</ValidateAuthentication>
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
}
