# Razor Grip - Chat App

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Production setup](#production-setup)
- [Local setup](#local-setup)

## General info

A simple live instant messaging application, with authorization where all users can chat each other unless blocked.

- Play with a live demo [here](https://razor.cladaps.tech)

## Technologies

Project is created with:

- Node.js
- React.js
- Typescript
- Graphql
- MongoDB
- Redis
- Auth0

## Production setup

To serve this project:

- Add .env ../Razor-Grip-Chat/web
- Add .env ../Razor-Grip-Chat/server

```
$ cd ../Razor-Grip-Chat
$ yarn install
$ yarn build
$ yarn serve
```

## Local setup

To run this project in development mode:

- Add .env ../Razor-Grip-Chat/web
- Add .env ../Razor-Grip-Chat/server

```
$ cd ../Razor-Grip-Chat
$ yarn install
$ yarn web start
```

- On another terminal

```
$ cd ../Razor-Grip-Chat
$ yarn server start
```
