# GitIssueNavigator
New React application to view git issues 


# Design Decisions

## Accessing github through API

To retrieve the information from Github a javascript library Octokit was developed by Git to make connections easier. This was then used in a un-authenticated mode by not using the auth argument. This will result in lower rate limit and some endpoints being unreachable but for this project it is not a concern. 

A rate limit button was added to check for 403 issues related to api usage. Will print to console the remaining calls available and the time till reset.

## Issue API call returning Pull Requests

The api call to the github issues on a repo also returns pull requests as they share the number scheme used by a repository. This can be filtered out by use of another call to the api, but for this project a call to the ``issue.pull_request`` will return undefined if it is truely an issue so a filter is placed on that.

## Markdown

Issue body can be accented with markdown, to display this properly the react.markdown package was utilized as it will create all the dom elements needed to represent the data while keeping the current project more lightweight.


# Challenges