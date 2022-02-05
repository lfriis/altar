import path from 'path';
import { execSync } from 'child_process';
import { IGitInfo } from './dev.interface';
import config from '../../config/server';

const execSyncWrapper = (command: string): string | null => {
	let stdout: string | null;
	try {
		stdout = execSync(command).toString().trim();
	} catch (error) {
		stdout = null;
	}
	return stdout;
};

export default function getGitInfo(): IGitInfo {
	const gitBranch = execSyncWrapper('git rev-parse --abbrev-ref HEAD');
	const gitCommitHash = execSyncWrapper('git rev-parse --short=7 HEAD');
	const cwd = path.resolve(__dirname, '../../../');

	return {
		gitBranch,
		gitCommitHash,
		cwd,
		version: config.version,
	};
}
