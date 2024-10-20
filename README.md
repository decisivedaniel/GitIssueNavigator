# GitIssueNavigator
New React application to view git issues 


# Design Decisions

Accessing github through API

To retrieve the information from Github a javascript library Octokit was developed by Git to make connections easier. This was then used in a un-authenticated mode by not using the auth argument. This will result in lower rate limit and some endpoints being unreachable but for this project it is not a concern. 

# Challenges