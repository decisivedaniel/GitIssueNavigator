import React from 'react';
import { getIssuesFromAPI, getIssueFromAPI } from './gitService';

type State = {
    owner: string;
    repo: string;
    issueNum: number
}
export class IssueForm extends React.Component<{}, State> {
    state = {
        owner: "",
        repo: "",
        issueNum: 0
    };

    onOwnerChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ owner: e.currentTarget.value});
    };
    onRepoChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ repo: e.currentTarget.value});
    };
    onNumberChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ issueNum: Number(e.currentTarget.value)});
    };
    onSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
        if (this.state.issueNum > 0) {
            getIssueFromAPI(this.state.owner,this.state.repo, this.state.issueNum)
        } else {
            getIssuesFromAPI(this.state.owner, this.state.repo);
        }
        
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.owner} onChange={this.onOwnerChange} />
                <input type="text" value={this.state.repo} onChange={this.onRepoChange} />
                <input type="text" value={this.state.issueNum} onChange={this.onNumberChange} />
                <input type="button" value="Retrieve" onClick={this.onSubmit} />
            </div>
        )
    }
}