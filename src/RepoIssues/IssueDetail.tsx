import React, {useState} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { issueResponse } from '../InfoRetrival/gitService';
import Markdown from 'react-markdown';

export interface IssueState {
    issue:issueResponse;
}

export function IssueDetail() {
    const issue:issueResponse = useLocation().state;
    const navigate = useNavigate();
    return (
        <div>
            <h1>{issue.title}</h1>
            {issue.assignee !== undefined ? <h2>Assigned to {issue.assignee?.name}</h2> : null}
            <Markdown>{issue.body}</Markdown>
            <Link to={{pathname: "/"}}>return</Link>
            <button onClick={()=> navigate(-1)}>Nav Return</button>
        </div>
    );
}