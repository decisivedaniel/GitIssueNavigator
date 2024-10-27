import React, {useState} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { issueResponse } from '../InfoRetrival/gitService';

export interface IssueState {
    issue:issueResponse;
}

export function IssueDetail() {
    const location:issueResponse = useLocation().state;
    const navigate = useNavigate();
    return (
        <div>
            <p>{location.body}</p>
            <Link to={{pathname: "/"}}>return</Link>
            <button onClick={()=> navigate(-1)}>Nav Return</button>
        </div>
    );
}