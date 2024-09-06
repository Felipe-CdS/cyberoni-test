## Configuration

Postgres credentials are configured in the docker-compose.yml file. By default, they are set as follows:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```
Update these values in the docker-compose.yml file as needed for your environment.

## Tests

Before running the integration tests, you need to ensure that the database is in a clean state:

- Stop and remove the Docker containers:
```
npm run docker:down
```
- Run the tests:
```
npm run test
```

## Server:

Follow these steps to start the server:
- Start the Docker containers and set up the database migrations:
```
npm run docker:up
npx prisma migrate dev --skip-seed --name init
```
- Then start the server:
```
npm run dev
```


