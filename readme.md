# Attendance API


## `get /attendance/:weekday`

Where weekday is of format "w03d04", returns all events for that day.

## `post /attendance/weekday`

**Requires Authorization**

Creates a new attendance event. Required parameters are:

- githubUserId
- status
  - one of `tardy`, `present`, `absent`

## Authorization

Writing to this API requires membership to the wdidc organization github.
