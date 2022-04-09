const routes = require('./routes');

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
      console.log(process.env)
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
      this.server.use('/api', routes);
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
