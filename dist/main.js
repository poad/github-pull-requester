"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
        if (core.isDebug()) {
            core.error(error);
        }
        core.setFailed(error.message);
    };
    try {
        const token = core.getInput("github_token");
        const head = core.getInput("head_branch");
        const base = core.getInput("base_branch");
        const title = core.getInput("title");
        const body = core.getInput("body");
        const owner = core.getInput("owner");
        const repository = core.getInput("repository");
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
            base,
        };
        const gh = new gitHubClient_1.default(token);
        gh.createPullRequest(req)
            .then((result) => {
            core.setOutput("result", result);
        })
            .catch(errHandler);
    }
    catch (error) {
        if (error instanceof Error) {
            errHandler(error);
        }
        else {
            core.error(JSON.stringify(error));
            core.setFailed(JSON.stringify(error));
        }
    }
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBc0M7QUFDdEMsa0VBQTBDO0FBRTFDLFNBQVMsR0FBRztJQUNWLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGLElBQUk7UUFDRixNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEQsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRCxNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxNQUFNLFVBQVUsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTNCLE1BQU0sR0FBRyxHQUFHO1lBQ1YsS0FBSztZQUNMLElBQUksRUFBRSxVQUFVO1lBQ2hCLEtBQUs7WUFDTCxJQUFJO1lBQ0osSUFBSTtZQUNKLElBQUk7U0FDTCxDQUFDO1FBRUYsTUFBTSxFQUFFLEdBQUcsSUFBSSxzQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUM7YUFDdEIsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdEI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUMxQixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7QUFDSCxDQUFDO0FBRUQsR0FBRyxFQUFFLENBQUMifQ==