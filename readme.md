# Attendance API

## `get /attendance/:weekday`

Where weekday is of format "w03d04", returns all events for that day.

## `post /attendance/weekday`

Creates a new attendance event. Required parameters are:

- githubUserId
- status
  - one of `tardy`, `present`, `absent`
