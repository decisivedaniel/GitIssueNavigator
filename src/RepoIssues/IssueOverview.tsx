import React from 'react';
import Markdown from 'react-markdown';
import { issueResponse } from '../InfoRetrival/gitService';
import { Link } from 'react-router-dom';

interface IssueOverviewProps {
    issue: issueResponse;
}

export default function IssueOverview ({issue}:Readonly<IssueOverviewProps>) {

    return (
        <div>
            <h1>{issue.number}: {issue.title}</h1>
            <Markdown>{issue.body}</Markdown>
            <Link to={{pathname: "/issue"}} state={issue} >Navigate to Issue</Link>
        </div>
    )

}