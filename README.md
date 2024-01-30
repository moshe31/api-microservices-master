## Introduction

Based on **Free Code Camp's:** [APIs and Microservices Projects.](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects)

Microservices API provides services such as:

*   Time Stamps
*   Request Header Parser
*   URL Shortener
*   Exercise Tracker
*   File Meta Data

Details and usage can be found below or.

### Install

Clone the repo then
`npm install`
`npm start`

Open browser and type in
`localhost:5000/`

---

## Time Stamp: Overview

*   The API endpoint is `GET /api/timestamp/:date_string?` e.g. `GET /api/timestamp/2018-09-12`
*   If the date string is **empty** API returns current timestamp. `GET /api/timestamp/`
*   If the date string is **valid** and ISO-8601 compliant e.g **"2018-09-12"** the api returns a JSON having the structure  
    `{"unix": <timestamp>, "utc" : <date> }`  
    e.g. `{"unix": 1536736210866,"utc":"Wed, 12 Sep 2018 07:10:10 GMT"}`
*   If the date string is **invalid** the api returns a JSON having the structure  
    `{"error" : "Invalid Date" }`.

## Usage

#### Example Usage:

*   [https://microservices-api.glitch.me/api/timestamp/2018-09-12](https://microservices-api.glitch.me/api/timestamp/2018-09-12)
*   [https://microservices-api.glitch.me/api/timestamp/1536736210866](https://microservices-api.glitch.me/api/timestamp/1536736210866)

#### Example Output:

`{"unix": 1536736210866, "utc": "Wed, 12 Sep 2018 07:10:10 GMT"}`

---

## Request Header Parser: Overview

*   Endpoint is `GET api/whoami` Returns JSON response `{"ipaddress":"::1","language":"en-GB,en-US;q=0.9,en;q=0.8","software":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"}`

## Usage

#### Example Usage:

*   [https://microservices-api.glitch.me/api/whoami](https://microservices-api.glitch.me/api/whoami)

#### Output:

`{"ipaddress":"::1","language":"en-GB,en-US;q=0.9,en;q=0.8","software":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"}`

---

## URL Shortener: Overview

*   Endpoint is `POST api/shorturl/new` Returns JSON response `{"original_url": "https://www.youtube.com/watch?v=Ouz4JGzXruI", "short_url": "fkK360"}`
*   Post request with a body must be x-www-form-urlencoded. eg. `url: https://www.youtube.com/watch?v=Ouz4JGzXruI`
*   URL that doesn't follow the http(s)://www.example.com(/more/routes) format or url points to a invalid site, the JSON response will be `{"error": "invalid URL"}`  

*   To visit the URL `GET api/shorturl/fkK360` You will be redirected to original link `https://www.youtube.com/watch?v=Ouz4JGzXruI`

## Usage

for more details visit

*   [https://microservices-api.glitch.me/](https://microservices-api.glitch.me/)

#### Example Usage:

*   [https://microservices-api.glitch.me/api/shorturl/fkK360](https://microservices-api.glitch.me/api/shorturl/fkK360)

#### Will Redirect to:

`https://www.youtube.com/watch?v=Ouz4JGzXruI`

---

## Exercise Tracker: Overview

Provide users to track there past exercise activites, add new activities to there account.

*   To create new user 
`POST /api/exercise/new-user` 
Returns JSON response with a unique ID
 `{"_id": "R0mD7Gx14", "username": "OG lil pretty thug"}` 
Post request with a body must be x-www-form-urlencoded. eg. 
`username: OG lil pretty thug` 
If user already exists, api returns. `{"error": "username already taken"}`

*   To add new activity, user id is required e.g **{_id: R0mD7Gx14}** 
`POST /api/exercise/add` Post request with a body must be x-www-form-urlencoded. eg. 
`{"description": "work out", "duration": 28, "date": "2018-09-16", "userId": "8KrDYrcVV"}` 
if user id is not provided api returns `{"error": "unknown user id"}`

*   To get previous added exercise activities use below end point with following parameters,  
    *userId (required), from date (optional), to date (optional), date in 2018-09-10 format, limit number (optional).
 `GET /api/exercise/log?{userId}[&from][&to][&limit]` 
e.g `GET /api/exercise/log?userId=R0mD7Gx14` 
or `GET /api/exercise/log?userId=R0mD7Gx14&from=2018-09-10&to=2018-09-10&limit=5`  
    Return a JSON response
 `{ "_id": "8KrDYrcVV", "username": "tester6", "from": "Mon Sep 10 2018", "to": "Tue Sep 25 2018", "count": 2, "log": [ { "description": "chest", "duration": 28, "date": "Sat Sep 15 2018" }, { "description": "biceps", "duration": 24, "date": "Thu Sep 13 2018" } ] }`  
    if user id is not provided api returns
 `{"error": "unknown user id"}`  

## Usage

for more details visit

*   [https://microservices-api.glitch.me/](https://microservices-api.glitch.me/)

#### Example Usage: Get user activity Logs

*   [https://microservices-api.glitch.me/api/exercise/log?userId=8KrDYrcVV](https://microservices-api.glitch.me/api/exercise/log?userId=8KrDYrcVV)

#### Example Usage: Get all users

*   [https://microservices-api.glitch.me/api/exercise/users](https://microservices-api.glitch.me/api/exercise/users)

---

## File Meta Data: Overview

*   Endpoint examins the uploaded file then returns JSON response with info about the file.
 `POST /api/fileanalyse` 
Returns JSON response 
`{"name": "package.json","type": "application/json","size": 540}` 
Post request with a body must be multipart/form-data.

## Usage

for more details visit

*   [https://microservices-api.glitch.me/](https://microservices-api.glitch.me/)

* * *