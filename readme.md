# Attendance API

## Get Attendance by day

```
get /attendance/:date
```

Where date is of format "YYYY-MM-DD", returns all events for that day.

## Take attendance 

```
post /attendance/:date
```

**Requires Authorization**

Creates a new attendance event. 

| Name | Type | Description |
|---|---|---|
| `githubUserId` | `string` | **Required.** The student’s GitHub user id | 
| `status` | `string` | **Required.** one of "tardy", "present", or "absent"| 

## Authorization

Writing to this API requires membership to the wdidc organization github.

When sending a POST request, include a github access token in the query parameters

To create a personal access token, visit https://github.com/settings/tokens

## Local Setup

Make sure `mongod` is running.

    git clone git@github.com:wdidc/api-assignment.git
    cd api-assignment
    npm install
    npm install -g nodemon
    nodemon index.js
