# Storefront Backend Project

## Prepare env
- add a `.env` file in the root directory and set the missing `###` environment parameters
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store_front
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_TEST_DB=store_front_test
BCRYPT_PASSWORD="goodtimes"
SALT_ROUNDS=10
TOKEN_SECRET = lolxdezmid
ENV=dev
```

## Set up

- `npm install` to install all dependencies
- `dp-migrate up` to set up the database and get access via http://127.0.0.1:5432
- `npm run build` to build the app

## Start the app
- `npm run start` to start the app and get access via http://127.0.0.1:3000


## Test the app
- add a `database.json` file in the root directory and set the missing `###` parameters
```
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_front",
      "user": "postgres",
      "password": "postgres"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_front_test",
      "user": "postgres",
      "password": "postgres"
    }
  }
```
- `npm run test` to run all tests
