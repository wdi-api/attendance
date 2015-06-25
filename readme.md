# Attendance API



## Get Attendance by day

```
get /attendance/:weekday
```

Where weekday is of format "w03d04", returns all events for that day.

## Take attendance 

```
post /attendance/:weekday
```

**Requires Authorization**

Creates a new attendance event. Required parameters are:

- githubUserId
- status
  - one of `tardy`, `present`, `absent`
### Input

| Name | Type | Description |
|---|---|---|
| `githubUserId` | `string` | **Required.** The student’s GitHub user id | 
| `status` | `string` | **Required.** one of "tardy", "present", or "absent"| 

## Authorization

Writing to this API requires membership to the wdidc organization github.

When sending a POST request, include a github access token in the query parameters

To create a personal access token, visit https://github.com/settings/tokens
