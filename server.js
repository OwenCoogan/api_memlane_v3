const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbClass = require('./config/db');

const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/posts.routes');
const authRoutes = require('./routes/auth.routes');
const rolesRoutes = require('./routes/roles.routes');
const commentsRoutes = require('./routes/comments.routes');

const errorHandler = require('./middlewares/error-handler.middleware');
const joiErrorHandler = require('./middlewares/joi-error-handler.middleware');

class ServerClass{
  constructor(){
    this.server = express();
    this.port = process.env.PORT;
    this.db = new dbClass();
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
      this.db.connectDb()
      .then( db => {
          this.server.listen( this.port, options , () => {
              console.log({
                  node: `http:s//localhost:${this.port}`,
                  db: db.url,
              })
          })
      })
      .catch( dbError => {
          console.log(dbError)
      })
  }

}
