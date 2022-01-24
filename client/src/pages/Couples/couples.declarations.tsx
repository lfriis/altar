export type IHandleAuthSuccess = {
	handleAuthSuccess: () => void;
};

export interface IAutoAuthProps extends IHandleAuthSuccess {
	autoAuthKey: string | undefined;
}
