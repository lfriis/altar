export type IHandleAuthSuccess = {
	handleAuthSuccess: () => void;
};

export interface IAutoAuthProps extends IHandleAuthSuccess {
	autoAuthKey: string | undefined;
}

export interface IGuests {
	address: string;
	city: string;
	country: string;
	postal_code: string;
	province: string;
	name_1: string;
	name_2: string;
	name_3: string;
	name_4: string;
	names: string[];
	envolope: string;
}
