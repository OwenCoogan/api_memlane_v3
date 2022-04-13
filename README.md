### This is the API for the MemoryLane App built in VueJS

Owen Coogan, M2Dev ECV Digital ( Powered by Coffee & Github Copilot ’)


Chores :

  Typescript for error handling & easier management of file uploads
  Role management
  Refacto of api router
  Write tests


# Requirements

Either run with Docker & run the following commands on first install ( The container has PSQL and a pgadmin instance for development purposes )

  npm run build-db && npm run init-db && npm run prep-db

Once this is done :

  npm run start


# Dependecies

NodeJs
Express
Postgres
Sequelize
cookie-parser
axios
body-parser

** Only One ressource was made without the ORM , the "fun" controller which listed methods where third party apis are called.
  I didn't have any need for any outgoing api calls, but there it is anyway ( edit : I might use this Api in my user seeds )
**


# Description

This api is used to do some stuff that I'll explain at the last second.

# Last Second


