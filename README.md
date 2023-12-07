# Snipstr Server

## Description

Snipstr is a self hosted tool created for allowing text content (snippets) to be sent securely to other devices.

## How does it work?

By using the [UI](https://github.com/alex55132/snipstr-client) you can create a text snippet and password protect it (or not), so you will be able to check it out later via the generated link.

The provided password is hashed and used to encrypt the text content using AES algorithm.

## Installation

Environment variables must be set in order to run the installation commands. Prisma will fail if no valid database is provided

```bash
$ yarn install

# Apply migrations
$ yarn prisma migrate dev
```

## Using docker

Docker can be used for hosting the service. You will just need to build the image by running

```bash
$ docker build . -t snipstr-server
```

The building process will take a few minutes.

You can run the required services by running the following:

```bash
$ docker-compose up
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
