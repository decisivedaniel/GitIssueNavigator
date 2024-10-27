import React, {Suspense, useState} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { commentResponse, issueResponse, getComments } from '../InfoRetrival/gitService';
import Markdown from 'react-markdown';
import Reactions from './Reactions';
import Comments from './Comment';

export interface IssueState {
    issue:issueResponse;
}

export function IssueDetail() {
    const [comments, setComments] = useState(Array<commentResponse>);
    const issue:issueResponse = useLocation().state;
    const navigate = useNavigate();
    const response = getComments(issue.comments_url);
    response.then((data) => 
        {if(data !== undefined){
            setComments(data);
        }});
    return (
        <div>
            <h1>{issue.title}</h1>
            {issue.assignee !== undefined ? <h2>Assigned to {issue.assignee?.name}</h2> : null}
            <Reactions reactions={issue.reactions}/>
            <Markdown>{issue.body}</Markdown>
            <Comments comments={comments}/>
            <Link to={{pathname: "/"}}>return</Link>
            <button onClick={()=> navigate(-1)}>Nav Return</button>
        </div>
    );
}