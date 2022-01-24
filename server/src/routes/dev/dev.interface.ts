export interface IGitInfo {
	gitBranch: string | null;
	gitCommitHash: string | null;
	cwd: string;
	version: string;
}
