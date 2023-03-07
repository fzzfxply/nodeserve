class Router {
  constructor() {
    this.routes = {};
  }

  get(path, ...handlers) {
    this.routes[path] = {
      method: "GET",
      handlers,
    };
  }

  post(path, ...handlers) {
    this.routes[path] = {
      method: "POST",
      handlers,
    };
  }

  put(path, ...handlers) {
    this.routes[path] = {
      method: "PUT",
      handlers,
    };
  }

  delete(path, ...handlers) {
    this.routes[path] = {
      method: "DELETE",
      handlers,
    };
  }

  handle(req, res) {
    const { url, method } = req;
    const route = this.routes[url];
console.log(this.routes,"route",method)
    if (!route || route.method !== method) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    const handlers = route.handlers;

    let idx = 0;

    const next = () => {
      idx++;
      if (idx < handlers.length) {
        handlers[idx](req, res, next);
      }
    };

    handlers[idx](req, res, next);
  }
}

module.exports = Router;
