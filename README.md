# Storefront Backend Project
# description
A RESTful API for an E-Commerce website with full CRUD operations ,Authentication and Security/Authorization with API testing ,endpoint testing & model testing. you can find more in the [REQUIREMENTS file](./REQUIREMENTS.md)


---

# Getting Started

1. clone the repo.
2. [set up the .env file](#prepare-env) 
3. [set up the database locally](#database-set-up)
4. [Building the project ](#databsed-migrations--build-up-the-project)
5. [start the app](#start-the-app)
6. [Test the app](#test-the-app)
## Prepare env
- add a `.env` file in the root directory and set the missing  environment parameters
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_TEST_DB=store_front_test
BCRYPT_PASSWORD="a7a el shbshb da3" OR add whatever you feel like
SALT_ROUNDS=10
TOKEN_SECRET = lolxdezmid OR add whatever you feel like
BACK_END_PORT=3000
DB-PORT=5432
ENV=dev
```
## Database Set up
`use the psql terminal to run the following commands `
```
** create the user **
CREATE USER postgres WITH PASSWORD 'postgres';

**create the dev and test database**
CREATE DATABASE store_front;
CREATE DATABASE store_front_test;

**grant dull acsses for the users in both databases**
GRANT ALL PRIVILEGS ON DATABASE store_front TO postgres;
GRANT ALL PRIVILEGS ON DATABASE store_front_test TO postgres;



```

## Databsed migrations & Build up the project

- `npm install` to install all dependencies
- `dp-migrate up` to set up the database and get access via http://127.0.0.1:5432
- `npm run build` to build the app

## Start the app
- `npm run start` to start the app and get access via http://127.0.0.1:3000


## Test the app
- `npm run test` to run all tests
