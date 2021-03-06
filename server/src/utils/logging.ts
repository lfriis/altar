export interface ILogData {
	namespace: string;
	message: string;
	object?: object;
}

export const getTimeStamp = (): string => new Date().toISOString();

export const info = ({ namespace, message, object }: ILogData): void => {
	if (object) {
		console.info(
			`[${getTimeStamp()}] [INFO] [${namespace}] ${message}, ${object}`,
		);
	} else {
		console.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
	}
};

export const warn = ({ namespace, message, object }: ILogData): void => {
	if (object) {
		console.warn(
			`[${getTimeStamp()}] [WARN] [${namespace}] ${message}, ${object}`,
		);
	} else {
		console.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
	}
};

export const error = ({ namespace, message, object }: ILogData): void => {
	if (object) {
		console.error(
			`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}, ${object}`,
		);
	} else {
		console.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
	}
};

export const debug = ({ namespace, message, object }: ILogData): void => {
	if (object) {
		console.debug(
			`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`,
			object,
		);
	} else {
		console.debug(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
	}
};
