# GitIssueNavigator
New React application to view git issues 


# Design Decisions

## Accessing github through API

To retrieve the information from Github a javascript library Octokit was developed by Git to make connections easier. This was then used in a un-authenticated mode by not using the auth argument. This will result in lower rate limit and some endpoints being unreachable but for this project it is not a concern. 

A rate limit button was added to check for 403 issues related to api usage. Will print to console the remaining calls available and the time till reset.


## Markdown

Issue body can be accented with markdown, to display this properly the react.markdown package was utilized as it will create all the dom elements needed to represent the data while keeping the current project more lightweight.

## Navigation

Current system uses the router routes method to create the overview and the detail view. This leads to issues with returning from the detail view not maintaining the history of searched information. This causes greater issues as users will have to re-type the information and query the api further costing the limit number of api calls that can be made. Future work would remake this to use the later Navigation history system that stores this information more easily.


# Challenges

## Issue API call returning Pull Requests

The api call to the github issues on a repo also returns pull requests as they share the number scheme used by a repository. This can be filtered out by use of another call to the api, but for this project a call to the ``issue.pull_request`` will return undefined if it is truely an issue so a filter is placed on that.

## Reactions

Copying and pasting all the individual github reactions would have been an pain in its component. As a result found a way [on stack overflow](https://stackoverflow.com/a/64174790) to create a list of elements then use that as a type. This way we can make a unit reaction that gets the correct type for typescript compiling, but there also is a way to interate through the list and easily cover them all without code copying.