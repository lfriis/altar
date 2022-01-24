import jwt from 'jsonwebtoken';

/**
 * * Overriding default JWT payload to include custom types
 */
declare module 'jsonwebtoken' {
	export interface IAutoAuthToken extends jwt.JwtPayload {
		accountId: number;
		APIKey: string;
		APISecret: string;
	}
}

export interface ICurrentUser {
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
}
