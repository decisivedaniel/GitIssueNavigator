import React, {useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { commentResponse, issueResponse, getComments } from '../InfoRetrival/gitService';
import Markdown from 'react-markdown';
import Reactions from './Reactions';
import Comments from './Comment';
import "./IssueDetail.css"

export interface IssueState {
    issue:issueResponse;
}

export function IssueDetail() {
    const [comments, setComments] = useState(Array<commentResponse>);
    const issue:issueResponse = useLocation().state;
    const response = getComments(issue.comments_url);
    response.then((data) => 
        {if(data !== undefined){
            setComments(data);
        }});
    return (
        <div className="IssueDetail">
            <h1>#{issue.number}: {issue.title}</h1>
            {issue.assignee !== null ? <h2>Assigned to {issue.assignee?.name}</h2> : null}
            <Reactions reactions={issue.reactions}/>
            <Markdown>{issue.body}</Markdown>
            <Comments comments={comments}/>
            <Link to={{pathname: "/"}}>Return</Link>
        </div>
    );
}