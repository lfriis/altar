import { execSync } from 'child_process';
import path from 'path';

const execSyncWrapper = (command: string): string | null => {
	let stdout: string | null = null;
	try {
		stdout = execSync(command).toString().trim();
	} catch (error) {
		stdout = null;
	}
	return stdout;
};

export const getGitInfo = (): object => {
	let gitBranch = execSyncWrapper('git rev-parse --abbrev-ref HEAD');
	let gitCommitHash = execSyncWrapper('git rev-parse --short=7 HEAD');
	let cwd = path.resolve(__dirname, '../../../');

	return {
		gitBranch,
		gitCommitHash,
		cwd,
	};
};
