import { Octokit, } from "@octokit/core";
import { RequestError } from "@octokit/request-error";
import type { Endpoints } from '@octokit/types';

export type issuesResponse = Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];
export type issueResponse = Endpoints[`GET /repos/{owner}/{repo}/issues/{issue_number}`]["response"]["data"]
export type commentsResponse = Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}/comments']["response"]["data"]
export type commentResponse = Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}/comments']["response"]["data"]['0']
export type reactionResponse = Endpoints[`GET /repos/{owner}/{repo}/issues/{issue_number}`]["response"]["data"]["reactions"]

const octokit = new Octokit({});

export async function getIssuesFromAPI (owner:string, repo:string) {
    try {
        const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
            owner: owner,
            repo: repo,
            headers: {
                'X-Github-Api-Version': '2022-11-28',
                'accept': 'application/vnd.github+json',
                'user-agent': 'GitIssueNavigator'
            }
        });
        console.log("Got response");
        return response.data.filter((issue)=>issue.pull_request === undefined);
    } catch (error) {
        if (error instanceof RequestError) {
            switch (error.status) {
                case 301:
                    console.log("Moved Permantly");
                    break;
                case 404:
                    console.log("Issue was not found");
                    break;
                default:
                    console.log(`unknown error: ${error.status}`);
                    break;
            }
        } else {
            throw error;
        }
    }
}

export async function getIssueFromAPI (owner:string, repo:string, issueNum:number) {
    try {
        const response = await octokit.request(`GET /repos/{owner}/{repo}/issues/{issue_number}`, {
            owner: owner,
            repo: repo,
            issue_number: issueNum,
            headers: {
                'X-Github-Api-Version': '2022-11-28',
                'accept': 'application/vnd.github+json',
                'user-agent': 'GitIssueNavigator'
            }
        });
        console.log("Got response");
        return response.data;
    } catch (error) {
        if (error instanceof RequestError) {
            switch (error.status) {
                case 301:
                    console.log("Moved Permantly");
                    break;
                case 304:
                    console.log("Issue was not motified");
                    break;
                case 404:
                    console.log("Issue was not found");
                    break;
                case 410:
                    console.log("Issue is Removed")
                    break;
                default:
                    console.log(`unknown error: ${error.status}`);
                    break;
            }
        } else {
            throw error;
        }
    }
}

export async function getRateLimit () {
    try {
        const response = await octokit.request('GET /rate_limit' , {
            headers: {
                'X-Github-Api-Version': '2022-11-28',
                'accept': 'application/vnd.github+json',
                'user-agent': 'GitIssueNavigator'
            }
        });
        console.log("Got Response");
        console.log(response.data.rate.remaining);
        console.log("Time Remaining: %d", response.data.rate.reset - Math.round(Date.now()/1000));
    } catch (error) {
        console.log(error);
    }
}

export async function getComments(url:string) {
    // This is not advisable as api can change but good for now until a better passing of state between pages can be developed
    const splitUrl = url.split("/");
    const owner = splitUrl[4];
    const repo = splitUrl[5];
    const issue_number = Number(splitUrl[7]);
    try {
        const response = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}/comments", {
            owner: owner,
            repo: repo,
            issue_number: issue_number,
            headers: {
                'X-Github-Api-Version': '2022-11-28',
                'accept': 'application/vnd.github+json',
                'user-agent': 'GitIssueNavigator'
            }
        });
        console.log("Got Comment Response");
        return response.data;
    } catch (error) {
        if (error instanceof RequestError) {
            switch (error.status) {
                case 301:
                    console.log("Moved Permantly");
                    break;
                case 404:
                    console.log("Comments were not found");
                    break;
                default:
                    console.log(`unknown error: ${error.status}`);
                    break;
            }
        } else {
            throw error;
        }
    }
}