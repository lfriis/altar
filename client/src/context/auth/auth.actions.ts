import { Dispatch } from 'React';
import axios from 'axios';
import { UserAction, UserActionType } from './index';

axios.defaults.withCredentials = true;

interface IAuthCreds {
	firstName: string;
	lastName: string;
	email: string;
}

export async function loginUser(
	dispatch: Dispatch<UserAction>,
	authCreds?: IAuthCreds,
	autoAuthToken?: string
) {
	try {
		dispatch({ type: UserActionType.REQUEST_LOGIN });

		const result = await axios({
			url: '/api/auth/login',
			method: 'post',
			data: { authCreds, autoAuthToken },
		});

		dispatch({
			type: UserActionType.LOGIN_SUCCESS,
			payload: result.data,
		});

		localStorage.setItem('currentUser', JSON.stringify(result.data));
		return result.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			dispatch({
				type: UserActionType.LOGIN_ERROR,
				payload: { authenticated: false, error: e.response },
			});
		}
		localStorage.removeItem('currentUser');
		return Promise.reject(new Error('User not authenticated.'));
	}
}

export async function logoutUser(dispatch: Dispatch<UserAction>) {
	try {
		await axios({
			url: 'api/auth/logout',
			method: 'delete',
		});

		dispatch({ type: UserActionType.LOGOUT });
		localStorage.removeItem('currentUser');
		return 'Logut Successful';
	} catch (e) {
		dispatch({ type: UserActionType.LOGOUT });
		localStorage.removeItem('currentUser');
		return Promise.reject(new Error('Failed User Logout'));
	}
}

export async function validateUser(dispatch: Dispatch<UserAction>) {
	try {
		dispatch({ type: UserActionType.REQUEST_AUTHENTICATION_STATUS });

		const result = await axios({
			url: '/api/auth/status',
			method: 'get',
		});

		dispatch({
			type: UserActionType.AUTHENTICATION_SUCCESS,
			payload: result.data,
		});
		return result.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			dispatch({
				type: UserActionType.AUTHENTICATION_ERROR,
				payload: { authenticated: false, error: e.response },
			});
		}
		localStorage.removeItem('currentUser');
		return Promise.reject(new Error('User not authenticated.'));
	}
}
