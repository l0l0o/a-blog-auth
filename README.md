# Back (API)

- express
- postgres

## Routes

- users (CRUD)
- posts (CRUD)

## Tables

### User

- id [Int PK]
- username [varchar]
- password [varchar]
- email [varchar]
- created_at [timestamp]

### Post

- id [Int PK]
- user_id [Int FK] (Many To One)
- title [varchar]
- content [varchar]
- created_at [timestamp]
- image_path [varchar]

# Step to init project (Back)

- create folder (api)
- npm init
- typescript init
- install dependencies (express, typescript, ts-node-dev, nodemon.....)
- create files and folders project (index.ts, folder src, ....)
- create routes (users, posts)
- test with Postman
- config docker-compose (services: postgres, adminer)
- up containers
- create database and tables
- install dependencies postgres
- connect db

## folder architecture (api)

- packages.json
- tsconfig.json
- docker-compose.yml
- .env
- .gitignore
- src/
  - index.ts
  - user/
  - post/
  - config/
    - db.ts
