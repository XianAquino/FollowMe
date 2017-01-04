# Project Name
FollowMe -- Give your teacher the thumb!


## Team

  - __Product Owner__: Ross Topol
  - __Scrum Master__: Johnny McDuff
  - __Development Team Members__: Christian Aquino, Ari L. Frankel, Sheel Bedi

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements
Node
Express
React/Redux
Knex/PostgresSQL


## Development Requirements
Heroku CLI required to connect to heroku db from local.
https://devcenter.heroku.com/articles/heroku-cli

Command to connect to db via CLI once setup:
heroku pg:psql DATABASE_URL --app present-me-beta

### Installing Dependencies

From within the root directory:
npm install

### Run the Seed File
FollowMe comes with Dummy Data located /seeds directory
To load this data into the databases, type:
knex seed:run

This command will wipe the existing Database, and reload it with dummy data. 

### Setup and Running Server
To start the server
npm run db_setup (Only need to do this the first time in a given terminal session.)
npm run build
npm start

### Roadmap

### Important Nomenclature
Lecture:  A specific instance in which a presenter is giving a presentation.
Presentation:  A set of Google slides.
lectureId:  ID assigned in database to lecture.
presentationId:  The ID provided by Google Slides API for slides.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
