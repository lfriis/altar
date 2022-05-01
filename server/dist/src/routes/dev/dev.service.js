"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const config_1 = require("../../config");
const execSyncWrapper = (command) => {
    let stdout;
    try {
        stdout = (0, child_process_1.execSync)(command).toString().trim();
    }
    catch (error) {
        stdout = null;
    }
    return stdout;
};
function getGitInfo() {
    const gitBranch = execSyncWrapper('git rev-parse --abbrev-ref HEAD');
    const gitCommitHash = execSyncWrapper('git rev-parse --short=7 HEAD');
    const cwd = path_1.default.resolve(__dirname, '../../../');
    return {
        gitBranch,
        gitCommitHash,
        cwd,
        version: config_1.serverConfig.version,
    };
}
exports.default = getGitInfo;
