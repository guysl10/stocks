class Response {
  constructor(app) {
    app.use((req, res, next)=>this.bindResponseHandler(req, res, next));
  }

  bindResponseHandler(req, res, next) {
    this.request = req;
    res.sendResponse = (response) => {
      res.json({ status: 'success', data: response });
    };

    res.sendError = (error) => {
      error.httpCode && res.status(error.httpCode || 500);
      res.json({ status: 'error', error: error.code ? error.getError() : error });
    };

    next();
  }
}

module.exports = Response;
