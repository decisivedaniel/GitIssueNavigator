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
            if (error.status === 404) {
                console.log("Repo doesn't exist or is not public");
            } else if (error.status === 301) {
                console.log("Moved Permantly");
            } else {
                console.log(`unknown error: ${error.status}`);
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
            if (error.status === 404) {
                console.log("Repo doesn't exist or is not public");
            } else if (error.status === 301) {
                console.log("Moved Permantly");
            } else {
                console.log(`unknown error: ${error.status}`);
            }
        } else {
            throw error;
        }
    }
}