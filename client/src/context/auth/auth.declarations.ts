import { AxiosResponse } from 'axios';

export enum UserActionType {
	REQUEST_LOGIN,
	REQUEST_AUTHENTICATION_STATUS,
	LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	AUTHENTICATION_SUCCESS,
	AUTHENTICATION_ERROR,
}
export interface IUserState {
	currentUser?: {
		id: number;
		first_name: string | null;
		last_name: string | null;
		email: string | null;
		federation_id: string | null;
		avatar_url: string | null;
		calendly_url: string | null;
		twitter_handle: string | null;
		linkedin_profile_url: string | null;
		website_url: string | null;
		bio: string | null;
		author_url_slug: string | null;
		last_logged_in_at: string | null;
		last_logged_in_from: string | null;
		type: string;
		created_at: string | null;
		modified_at: string | null;
		lock_update: number;
		lock_delete: number;
	} | null;
	accountId?: Nullable<number>;
	authenticated: boolean;
	loading?: boolean;
	error: Nullable<AxiosResponse | undefined>;
	version?: Nullable<string>;
}

/**
 * * Dispatch call without payload provided
 */
type WithoutPayload = {
	type:
		| UserActionType.REQUEST_LOGIN
		| UserActionType.REQUEST_AUTHENTICATION_STATUS
		| UserActionType.LOGOUT;
};

/**
 * * Dispatch call with payload provided
 */
type WithPayload = {
	type:
		| UserActionType.LOGIN_SUCCESS
		| UserActionType.LOGIN_ERROR
		| UserActionType.AUTHENTICATION_SUCCESS
		| UserActionType.AUTHENTICATION_ERROR;
	payload: IUserState;
};

export type UserAction = WithoutPayload | WithPayload;
