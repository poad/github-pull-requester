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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
    try {
        const token = core.getInput('github_token');
        const head = core.getInput('head_branch');
        const base = core.getInput('base_branch');
        const title = core.getInput('title');
        const body = core.getInput('body');
        const owner = core.getInput('owner');
        const repository = core.getInput('repository');
        const gh = new gitHubClient_1.default(token);
        gh.createPullRequest({
            owner: owner,
            repo: repository,
            title: title,
            body: body,
            head: head,
            base: base
        })
            .then((prNum) => core.setOutput('dest_number', prNum))
            .catch((error) => core.setFailed(error.message));
    }
    catch (error) {
        core.error(error.message);
        core.setFailed(error.message);
    }
}
run();
