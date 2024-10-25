import React from 'react';
import { issueResponse } from '../InfoRetrival/gitService';

interface IssueOverviewProps {
    issue: issueResponse;
}

export default function IssueOverview ({issue}:Readonly<IssueOverviewProps>) {
    return (
        <div>
            <h1>{issue.number}: {issue.title}</h1>
            <p>{issue.body}</p>
            <a href={issue.html_url}>Navigate to Issue</a>
        </div>
    )

}