import React, { Dispatch, useReducer, createContext, useContext } from 'react';
import { AuthReducer, initialState } from './reducer';

interface IUser {
	email: string | null;
	accountId: number | null;
	authenticated: boolean | null;
	loading?: boolean | null;
	error: {
		type: boolean;
		message: string;
	} | null;
}

interface IUserAction {
	type: string;
	payload: IUser;
}

const AuthStateContext = createContext<IUser>(initialState);
const AuthDispatchContext = createContext<Dispatch<IUserAction>>(() => {});

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

export const AuthProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};
