const express = global.express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/environments');
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const utils = require('./helper/utils');

class App {
  constructor() {
    this.httpServer = null;
    this.app = express();
    this.io = null;
  }

  async init() {
    this.setGlobals();
    this.setDBConnection();
    this.setException();
    this.setExpress();
    this.runHttpServer(this.app);
    this.setSocketIO();
  }

  setGlobals() {
    global.__lodash = require('lodash');
    global.CONFIG = config;
    global.ROOT_PATH = __dirname;
    global.utils = utils;
    global.Multer = multer({ dest: global.ROOT_PATH + '/uploads/' });
  }

  setDBConnection() {
    const Mongo = require('./helper/mongo');
    new Mongo();
  }

  setException() {
    const Exception = require('./helper/exception');
    global.Exception = Exception;
  }

  setExpress() {
    this.app.use(cors());
    this.app.use(cookieParser());

    const Response = require('./helper/response');
    new Response(this.app);

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(this.decodeParams);

    const Modules = require('./modules');
    new Modules(this.app, this.io);

    this.app.use('*', this.defaultPathHandler);
  }

  setSocketIO() {
    global.io = this.io = require('socket.io')(this.httpServer);
  }

  runHttpServer(app) {
    // eslint-disable-next-line new-cap
    this.httpServer = require('http').Server(app);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; //Remove the ssl certificate error for SOAP APIs
    const serverPort = process.env.PORT || config.server.port;
    this.httpServer.listen(serverPort, config.server.host,  () => console.log('------------- App running on port', serverPort));
  }

  defaultPathHandler(req, res) {
    res.status(404).json({ status: 'error', message: 'Not found' });
  }

  decodeParams(req, res, next) {
    console.log(req.url);
    Object.keys(req.query).forEach((key)=>{
      req.query[key] = decodeURIComponent(req.query[key]);
    });
    next();
  }
}

(new App()).init();
