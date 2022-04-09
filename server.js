const express = require('express');
const bodyParser = require('body-parser');
const app = express();
class ServerClass{
  constructor(){
    this.server = express();
    this.port = process.env.PORT;
    }
    init(){
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
      this.config();
    }
    config(){
      this.launch();
    }
    launch(){
          this.server.listen( this.port, options , () => {
              console.log({
                  node: `http:s//localhost:${this.port}`,
                  db: db.url,
              })
          })
      .catch( dbError => {
          console.log(dbError)
      })
  }

}
const MyServer = new ServerClass();
MyServer.init();
