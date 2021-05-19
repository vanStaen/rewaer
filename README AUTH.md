# auth

Auth Server in Node/Express/Mongo. </br>
Deployed on:https://auth-cvs.herokuapp.com/(auth)

## Concept

Following the concept of micro-service, and as it seems to be a best practice to separate the Auth server from the rest of the backend, here comes an Auth only server. </br>

On `login` an access token os delivered. It has an expiration date of 15m. A refresh token with a validity of 7 days is also delivered, and saved in a db. When calling the `token` endpoint with a valid refresh token (less than 7 days old, and present in the db), a new token and refresh token are supplied. The old refresh token get deleted of the db. When calling the `logout` endpoint, the refresh token passed gets deleted from the db.</br>

The clients should be self checking if a token has expired. If called with an expired token, all backend service should respond with an `401 - unauthorized` error.

## API Endpoint

### User

A "user" has at least a name, email and password. 

### Login

- inputs : `email` and `password`
- outputs : `userId`, `userEmail`, `token`, `refreshToken`

The token expiration is 15 minutes. The refresh token expires after 7 days. Every refresh token generated are getting saved in the database. See model "Token".

### Token

- inputs : `refreshToken`
- outputs : `token`

The endpoint delivers a token to anyone in possession of a valid refresh token.

### Logout

- inputs : `refreshToken`
- outputs : null

The endpoint deletes a refresh token from the database

## Open question: How to use this with several project?

- Have all user of all project in one user table?
- Have the client sending a parameter pointing to a user_table?
