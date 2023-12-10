# Backend Engineer Work Sample

This is a backend engineer code challenge from Periscope solved by Ismael Fuentes.

The challenge was to build a very simple API connected into a DB to allow a client to create users and fetch a list of them.

## Table of contents

-   [Challenge prerequisites and given material](#challenge-prerequisites-and-given-material)
-   [Setup](#setup)
    -   [Prerequisites](#prerequisites)
    -   [Setup project](#setup-project)
-   [Run the api](#run-the-api)
-   [Test](#test)
-   [Comments and observations for reviewers](#comments-and-observations-for-reviewers)

## Challenge prerequisites and given material

The project skeleton contains a basic Express API setup with one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

The goals of the challenge were defined as:

1. Adjust POST /users that it accepts a user and stores it in a database.
    - The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
    - This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

#### Evaluation

We will evaluate the work sample based on these topics:

-   Project Structure
    -   How long would another developer take to understand your structure?
-   Setup / Infrastructure
-   Data Validation
-   Tests
    -   Which parts of the application is tested?
-   Error Handling
    -   How and when are you handling errors?
-   Documentation
    -   If you are feeling like your code need some comments please do it.
    -   If you are certain that the informations in the README are sufficient - that’s fine as well.

## Setup

The project can be run locally for development or built and run in a docker container, so the setup and run steps will explain what steps to follow for both possibilities:

### Prerequisites

**🌿 Local environment**: In order to run the api locally, it's required to have installed [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed and running on port **27017** with a root user without password set (This is intended for simplicity as it's de default configuration).

**🧊 Docker**: If you want to run the app inside containers you need to have installed [Docker](https://www.docker.com/).

### Setup project

After having the prerequisites ready we are ready to setup the project and get it ready to start

**🌿 Local environment**:

Install the project dependencies with `npm install`

The project has defined eslint and prettier as formatters, make sure you have your IDE configured accordingly in order to contribute following the same formatting rules.

**🧊 Docker**:

Build the image with `docker-compose build` and both images for the API and Mongo will be created

## 🚀 Run the api

**🌿 Local environment**:

Once mongo is running in the right port and the setup ready, you can run the app with 'npm run dev' so the api will be run locally with [nodemon](https://github.com/remy/nodemon).

**🧊 Docker**:

If you built the images previously, just running 'docker-compose up' should launch a container for mongodb and another one for the API itself, listening for request in the same port as the local environment.

## Tests

some unit and e2e tests where added just to show how to create them.

The code and use cases coverage is very low because of not being needed in a code challenge.

In order to run the unit tests run `npm run test`

And for the e2e tests run `npm run test:e2e` and the endpoints will be tested with [supertest](https://github.com/ladjs/supertest)

## Comments and observations for reviewers

-   **Tests**: Just some tests were added for service and utils to cover busines logic but more to repositories should be added. Same with e2e, more uses cases can be tested and even some user flows simulation (create and then update, etc). Also i recently discovered postman tests and they work very well for quick e2e in testing environments and can be integrated in deployment jobs.

-   **moongose**: It would have been great to add it in order to ensure more data types validation and consistency.

-   **🧊 Docker**: I wasn't sure if it was expected in the requisite `Setup / Infrastructure` so i did a quick compose and dockerfile just in case.

-   **unique email**: This requirement could have been implemented in very different ways, and in this case with mongoDB in a real app of course an unique index `createIndex( { "email": 1 }, { unique: true } )` but for simplicity and don't invest much more time in the challenge just left it as it is. Happy to discuss possibilities in a chat :)

-   **API docs**: I'm missing some API docs but i wasn't sure how to integrate a swagger into express and also i think it's easier to talk about it and share what each of us use more than invest time on it in code here.

-   **express**: I haven't seen express in a real project for around 8 years so it got me a bit unguard as with other libraries for APIs like Fastify you can integrate much easier validation and testing with their own tools or swaggers. In this case i used [express-validator](https://express-validator.github.io/docs) and [supertest](https://github.com/ladjs/supertest) but for the very first time, not sure if it was the most appropriate, happy to talk about it and learn.

-   **Project Structure**: just decided to go for controller-service-repository pattern even if it may seem a little bit overengineering for this code challenge, but i think this 3 layers estructure is the most common one around.

-   **Error handling**: just went for a quick enum of error types but in a real api it should be implemented extending node errors, having a common error handler in the APIs and a sanitization layer for not exposing not intented information.

-   **Logging and monitoring**: I'm not sure if it was expected from my side to create a liveness check endpoint of any kind or use any library for better logging, just didn't invest time on it but we can talk about possible ways.

## Follow up

In a nutshell, i tried to proof all the asked points are under my experience and solve them in the solution but i tried not to invest excesive time in repetitive stuff (for example creating 3 unit tests instead of 20).
