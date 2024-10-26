import React, { useState, Suspense } from 'react';
import { IssueForm } from '../InfoRetrival/IssueForm';
import { issueResponse } from '../InfoRetrival/gitService';
import IssueOverview from './IssueOverview';


export function List() {
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

export default List;