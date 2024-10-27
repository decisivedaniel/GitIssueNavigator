import React from 'react';
import { getIssuesFromAPI, issuesResponse, getRateLimit } from './gitService';

type State = {
    owner: string;
    repo: string;
}

type IssueFormProps = {
    setParent: (list:issuesResponse) => void;
}

export class IssueForm extends React.Component<  IssueFormProps , State> {
    state = {
        owner: "decisiveDaniel",
        repo: "GitIssueNavigator"
    };

    onOwnerChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ owner: e.currentTarget.value});
    };
    onRepoChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ repo: e.currentTarget.value});
    };
    onSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
        const response = getIssuesFromAPI(this.state.owner, this.state.repo);
        response.then((data) => 
            {if(data !== undefined){
                this.props.setParent(data)
            }});
    }
    render() {
        return (
            <div>
                <label> 
                    Owner: <input type="text" name="owner" value={this.state.owner} onChange={this.onOwnerChange} />
                </label>
                <label>
                    Repo: <input type="text" name="repo" value={this.state.repo} onChange={this.onRepoChange} />
                </label>
                <input type="button" value="Retrieve" onClick={this.onSubmit} />
                <input type="button" value="Rate Limit" onClick={()=> getRateLimit()}/>
            </div>
        )
    }
}