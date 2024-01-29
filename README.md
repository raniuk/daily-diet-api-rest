# Daily Diet API REST

## About the project

Building RESTful APIs with Node.js

In this challenge we will develop an API for Daily Diet control.

## Application rules

- It must be possible to create a user
- It must be possible to identify the user between requests
- It must be possible to record a meal eaten, with the following information:
  > _Meals must be related to a user._
  - Name
  - Description
  - Date and time
  - Is it on the diet or not
- It should be possible to list all of a user's meals
- It must be possible to view a single meal
- It must be possible to edit a meal, being able to change all the data above
- It should be possible to delete a meal
- It must be possible to retrieve a user's metrics
  - Total number of meals recorded
  - Total number of meals within the diet
  - Total number of meals outside the diet
  - Best sequence of meals within the diet
- The user can only view, edit and delete the meals he created

## Before running the project

Install dependencies

```sh
yarn install

npm install
```

## Knex - SQL query builder

Execute migration with knex

```sh
yarn knex migrate:up

npm run knex migrate:up
```

Rollback migration

```sh
yarn knex migrate:down

npm run knex migrate:down
```

## Start the project

```sh
yarn dev

npm run dev
```

## Tests

Test use cases

```sh
yarn test

npm run test
```

Test end to end

```sh
yarn test:e2e

npm run test:e2e
```
