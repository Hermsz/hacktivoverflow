## HACKTIV OVERFLOW

**Installation and Getting Started (execute this function to run this app in your terminal)**

```
$ npm init -y (inside root server folder)
$ npm install
$ nodemon app.js
$ npm run dev or nodemon app.js (on terminal inside root server folder)
$ nom run serve (on terminal inside root client folder)`
```

Access server via `http://localhost:3000`<br>
Access client via `http://localhost:8080`

##  User Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|firstName: String (**required**),lastName: String (**required**),email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/webLogin  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|

## Question Routes
|Routes|HTTP|Header(s)|Body|Params|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|----|
|/questions  |GET  |token|none|none|**Success**: Get all questions, **Error**: Internal server error (Validation)|Get all questions|
|/questions/:id  |GET  |token|none|Id|**Success**: Find Question By id questions, **Error**: Internal server error (Validation)|Find Question By id questions|
|/questions/:userId  |GET  |token|none|userId|**Success**: Find User Question **Error**: Internal server error (Validation)|Find User Question|
|/questions  |POST  |token|none|none|**Success**: Create Question, **Error**: Internal server error (Validation)|Create Question|
|/questions |DELETE |token|none|none|**Success**: Delete a Question, **Error**: Internal server error (Validation)|Delete a Question|
|/questions/upvote/:questionId |PATCH |token|None|questionId|**Success**: Upvote a question, **Error**: Internal server error (Validation)|Upvote a question|
|/questions/downvote/:questionId  |PATCH  |token|none|questionId|**Success**: Downvote a question, **Error**: Internal server error (Validation)|Downvote a question|

## Answer Routes
|Routes|HTTP|Header(s)|Body|Params|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|/answers  |GET  |none|none|none|**Success**: Get all Answer **Error**: Internal server error (Validation)|Get All Answer|
|/answers/:id  |GET  |none|none|none|**Success**: Get User answer By ID, **Error**: Internal server error (Validation)|Find Answer by Answer ID|
|/answers/all/:questionId  |GET  |none|none|questionId|**Success**: Get  Answer to a question Answer, **Error**: Internal server error (Validation)|Find All Answer to a particular question|
|/answers/:questionId  |POST  |token|title: String (**required**), description: String (**required**)|questionId|**Success**: Create an answer to a question, **Error**: Internal server error (Validation)|Create an answer to a question|
|/answers/upvote/:answerId  |PATCH  |token|none|answerId|**Success**: Upvote an answer, **Error**: Internal server error (Validation)|Upvote an answer|
|/answers/downvote/:answerId  |PATCH  |token|none|answerId|**Success**: Downvote an answer, **Error**: Internal server error (Validation)|Downvote an answer|
