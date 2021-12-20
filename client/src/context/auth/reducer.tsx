interface IUser {
	email: string | null;
	accountId: number | null;
	loggedIn: boolean | null;
	authenticated?: boolean | null;
	loading?: boolean | null;
	error: {
		state: boolean;
		message: string;
	} | null;
}

interface IUserAction {
	type: string;
	payload: IUser;
}

const userJson: string | null = localStorage.getItem('currentUser');
const userData: IUser = userJson !== null ? JSON.parse(userJson) : {};

export const initialState: IUser = {
	email: userData.email,
	accountId: userData.accountId,
	loggedIn: false,
	loading: false,
	error: null,
};

export const USER_ACTIONS: { [key: string]: string } = {
	REQUEST_LOGIN: 'REQUEST_LOGIN',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_ERROR: 'LOGIN_ERROR',
	LOGOUT: 'LOGOUT',
	REQUEST_STATUS: 'REQUEST_STATUS',
	RETURN_STATUS: 'RETURN_STATUS',
};

export const AuthReducer = (initialState: IUser, action: IUserAction) => {
	switch (action.type) {
		case USER_ACTIONS.REQUEST_LOGIN:
			return {
				...initialState,
				loading: true,
				errorMessage: null,
			};
		case USER_ACTIONS.LOGIN_SUCCESS:
			return {
				...initialState,
				email: action.payload.email,
				accountId: action.payload.accountId,
				loggedIn: action.payload.authenticated,
				loading: false,
				error: null,
			};
		case USER_ACTIONS.LOGIN_ERROR:
			return {
				...initialState,
				email: action.payload.email,
				accountId: action.payload.accountId,
				loggedIn: action.payload.authenticated,
				loading: false,
				error: action.payload.error?.message,
			};
		case USER_ACTIONS.LOGOUT:
			return {
				...initialState,
				email: null,
				accountId: null,
				loggedIn: action.payload.authenticated,
				loading: false,
				error: null,
			};
		case USER_ACTIONS.REQUEST_STATUS:
			return {
				...initialState,
				loading: true,
				error: null,
			};
		case USER_ACTIONS.RETURN_STATUS:
			return {
				...initialState,
				loggedIn: action.payload.authenticated,
				loading: false,
				error: null,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
