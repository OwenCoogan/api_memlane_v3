const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const ca = fs.readFileSync('ca-certificate.cer');
require('dotenv').config();
global.__basedir = __dirname;

class ServerClass{
  constructor(){
    this.server = express();
    this.port = process.env.PORT;
    this.options = {
      ca,
    }
    }
    init(){
      const ApiRouterClass = require('./routes/api.router');
      const apiRouter = new ApiRouterClass();
      const AuthRouterClass = require('./routes/auth.router');
      const authRouter = new AuthRouterClass();
      const UserRouterClass = require('./routes/user.router');
      const userRouter = new UserRouterClass();
      const UploadRouterClass = require('./routes/upload.router');
      const uploadRouter = new UploadRouterClass();


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
      this.server.use('/resources', express.static(__dirname + '/resources'))
      this.server.use('/v1', apiRouter.init());
      this.server.use('/auth', authRouter.init());
      this.server.use('/user', userRouter.init());
      this.server.use('/upload', uploadRouter.init());

      this.config();
    }
    config(){
      this.launch();
    }
    launch(){
          this.server.listen( this.port, this.options, () => {
              console.log({
                  node: `http://localhost:${this.port}`,
                  ca: ca
              })
          })
  }

}
const MyServer = new ServerClass();
MyServer.init();
