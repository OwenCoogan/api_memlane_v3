const routes = require('./routes');
global.__basedir = __dirname;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

class ServerClass{
  constructor(){
    this.server = express();
    this.port = process.env.PORT;
    }
    init(){
      const ApiRouterClass = require('./routes/api.router');
      const apiRouter = new ApiRouterClass();
      const AuthRouterClass = require('./routes/auth.router');
      const authRouter = new AuthRouterClass();
      const UserRouterClass = require('./routes/user.router');
      const userRouter = new UserRouterClass();


      this.server.use( (req, res, next) => {
          const allowedOrigins = process.env.ALLOWED_ORIGINS.split(', ');
          const origin = req.headers.origin;
          if(allowedOrigins.indexOf(origin) > -1){ res.setHeader('Access-Control-Allow-Origin', origin)}
          res.header('Access-Control-Allow-Credentials', true);
          res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE']);
          res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          next();
      });

      this.server.use(bodyParser.json({limit: '20mb'}));
      this.server.use(bodyParser.urlencoded({ extended: true }));
      this.server.use(cookieParser(process.env.COOKIE_SECRET));

      this.server.use('/v1', apiRouter.init());
      this.server.use('/auth', authRouter.init());
      this.server.use('/user', userRouter.init());

      this.config();
    }
    config(){
      this.launch();
    }
    launch(){
          this.server.listen( this.port, () => {
              console.log({
                  node: `http://localhost:${this.port}`,
              })
          })
  }

}
const MyServer = new ServerClass();
MyServer.init();
