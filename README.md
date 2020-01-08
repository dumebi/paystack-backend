# Paystack Developer Application Test

## Live Postman Docs 

## Backend 

## BUILD 
To run locally, type `docker-compose up --build`

To run tests, open a new console with the app running. type `./paystack-test.sh`

## PUSH 
To push to heroku, run `npm run heroku -- "{commit message}"`

To push to github, run `npm run git -- "{commit message}"`


# Assessment
Implement a simple clone of “**Stackoverflow**”. Features to be focused on are: 

- **User** can
  - signup/login
  - Questions
    - Ask
    - Answer
    - View
    - Upvote
    - Delete (posted questions)
    - Subscribe
    - robustly search questions/answers/users

# Authentication

Auth for user actions are done using bearer token

# Tools/Stack

NodeJs, Redis, RabbitMQ, Mongodb
