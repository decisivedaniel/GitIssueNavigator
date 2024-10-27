import React, { useState, Suspense } from 'react';
import { IssueForm } from '../InfoRetrival/IssueForm';
import { issueResponse } from '../InfoRetrival/gitService';
import { Link } from 'react-router-dom';

interface IssueOverviewProps {
  issue: issueResponse;
}

function IssueOverview ({issue}:Readonly<IssueOverviewProps>) {
  return (
      <div>
          <h1>{issue.number}: {issue.title}</h1>
          <Link to={{pathname: "/issue"}} state={issue} >Navigate to Issue</Link>
      </div>
  )
}

export function IssueList() {
  const [list, setList] = useState(Array<issueResponse>);

  return (
    <div className="List">
      <IssueForm setParent={setList} />
      <Suspense fallback={<p>Retrieving Information....</p>}>
        {list.map((entry) => (
          <li key={entry.id.toString()}>
            <IssueOverview issue={entry}/>
          </li>
        ))}
      </Suspense>
      
    </div>
  );
}

export default IssueList;