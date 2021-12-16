declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly ENVIRONMENT: 'DEVELOPMENT' | 'PRODUCTION';
			readonly NAMESPACE: 'SERVER';
			readonly SERVER_HOSTNAME: string;
			readonly SERVER_PORT: number;
			readonly FRONT_END_URL: string;
			readonly JWT_TOKEN?: string;
			readonly AUTOAUTH_JWT_TOKEN?: string;
		}
	}
}

export {};
