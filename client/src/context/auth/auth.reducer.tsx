/* eslint-disable react/destructuring-assignment */
import { IUserState, UserAction, UserActionType } from './index';

export default function AuthReducer(
	state: IUserState,
	action: UserAction,
): IUserState {
	switch (action.type) {
		case UserActionType.REQUEST_LOGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case UserActionType.LOGIN_SUCCESS:
			return {
				...state,
				currentUser: action.payload.currentUser,
				accountId: action.payload.accountId,
				version: action.payload.version,
				authenticated: true,
				loading: false,
				error: null,
			};
		case UserActionType.LOGIN_ERROR:
			return {
				...state,
				currentUser: action.payload.currentUser,
				accountId: action.payload.accountId,
				authenticated: false,
				loading: false,
				error: action.payload.error,
			};
		case UserActionType.LOGOUT:
			return {
				...state,
				currentUser: null,
				accountId: null,
				authenticated: false,
				loading: false,
				error: null,
				version: null,
			};
		case UserActionType.REQUEST_AUTHENTICATION_STATUS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case UserActionType.AUTHENTICATION_SUCCESS:
			return {
				...state,
				authenticated: action.payload.authenticated,
				loading: false,
				error: null,
			};
		case UserActionType.AUTHENTICATION_ERROR:
			return {
				...state,
				authenticated: action.payload.authenticated,
				loading: false,
				error: action.payload.error,
			};
		default:
			throw new Error(`Reducer: Unhandled action type.`);
	}
}
