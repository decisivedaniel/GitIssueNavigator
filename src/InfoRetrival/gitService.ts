import { Octokit, } from "@octokit/core";
import { RequestError } from "@octokit/request-error";

const octokit = new Octokit({});

export async function getIssuesFromAPI (owner:string, repo:string) {
    try {
        const response = await octokit.request(`GET /repos/{owner}/{repo}/issues`, {
            owner: owner,
            repo: repo,
            headers: {
                'X-Github-Api-Version': '2022-11-28',
                'accept': 'application/vnd.github+json'
            }
        });
        console.log("Got response");
        console.log(response.data[0].number);
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
                'accept': 'application/vnd.github+json'
            }
        });
        console.log("Got response");
        console.log(response.data.title);
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