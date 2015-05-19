# Attendance API

## `get /attendance`

## `get /attendance/:weekday`

Where weekday is of format "w03d04", returns all events for that day.

## `post /attendance`

Creates a new attendance event. Required parameters are:

- studentID
- weekday
- status
  - one of `tardy`, `present`, `absent`

## `get /attendance/students/:studentId`

Returns attendance history for a given student

