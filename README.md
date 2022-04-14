### This is the API for the MemoryLane App built in VueJS

Owen Coogan, M2Dev ECV Digital ( Powered by Coffee & Github Copilot ’)
This project was made alone


Chores :

  Typescript for error handling & easier management of file uploads,role management
  Role management ( done )
  Refacto of api router ( done )
  Write tests
  Add geolocation management in controllers instead of calling all created posts ( After a few minutes of research , that's done too )


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
multer


Only One ressource was made without the ORM , the "fun" controller which listed methods where third party apis are called.
I didn't have any need for any outgoing api calls, but there it is anyway ( edit : I might use this Api ( Rick & Morty APi ) in my user seeds )


# Description

This api is used to do some stuff that I'll explain at the last second.

# Last Second

This api is used for creating / editing geolocated posts, meant to be consumed by other users on a VueJS app.
 Ideally ( and with more r&d ) I can call posts that are within range of user ,

 Note to self : idea for that : passing the current geolocation, declaring an x & y range to create a zone around geolocated position)
PROPOSED SOLUTION IN MIDDLEWARE SECTION


 Used MiddleWare :

 Role Checker
 Used to check user roles for deletion of ressources ( only a super-admin can change account status , only the author can delete his own resources ( posts & comments ))

 FILE UPLOAD CHECKER

 At the moment , only image uploads are supported ( & testable with the two html forms but not in a template engine as I was more interested in uploading images & from an html form which ressembles the most to the form I'm using on my vueJS app (which you can check either at https://memory-f31e8.web.app/ but I haven't deployed the api to my vps yet  or on the following ))
 For Now only images are supported , but are uploaded to either posts or user profiles ( Same model but using a polymorphic relation to either resources & specifying a resource type in my model )

GEOLOCATION RANGE CHECKER

This middleware is used to build a range based on the geolocation of the user.

TODO : Add a dynamic range in body request instead of the static one as it is right now.




 The postman collection is in the repo as MemoryLaneApiCallsCollection

This is not a finished project , I'm well aware of it, and as it is a WIP & the basis of what I'm presenting for my Masters , I should explain how it started , as it was a simple CRUD with mongoose at first ( Lol ) & then through our NodeJS classes , I felt the possibility of doing more with it .
It started with an idea based on my desire to create something fun that might get us out of our home after COVID, but also an idea of trolling my friends with easter eggs placed in notable places , or not even notable. Adding files is also something interesting, I might be able to add audio or even video down the line. For now it's only images, photos. The next step is specifying the type of resources & adding built-in error handling with Typescript, but as it is a solo project, it takes time.








