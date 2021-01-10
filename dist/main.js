"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const gitHubClient_1 = __importDefault(require("./gitHubClient"));
function run() {
    const errHandler = (error) => {
        core.error(error.message);
        core.setFailed(error.message);
    };
    try {
        const token = core.getInput('github_token');
        const head = core.getInput('head_branch');
        const base = core.getInput('base_branch');
        const title = core.getInput('title');
        const body = core.getInput('body');
        const owner = core.getInput('owner');
        const repository = core.getInput('repository');
        core.info(`owner: ${owner}`);
        core.info(`repo: ${repository}`);
        core.info(`HEAD: ${head}`);
        core.info(`BASE: ${base}`);
        const req = {
            owner,
            repo: repository,
            title,
            body,
            head,
            base
        };
        const gh = new gitHubClient_1.default(token);
        gh.createPullRequest(req)
            .then((result) => {
            core.setOutput('result', result);
        })
            .catch(errHandler);
    }
    catch (error) {
        errHandler(error);
    }
}
run();
