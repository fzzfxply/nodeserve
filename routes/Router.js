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

  // handle(req, res) {
  //   const { url, method } = req;
  //   const route = this.routes[url];
  //
  //   if (!route || route.method !== method) {
  //     res.statusCode = 404;
  //     res.end("Not Found");
  //     return;
  //   }
  //
  //   const handlers = route.handlers;
  //
  //   let idx = 0;
  //   const next = () => {
  //     idx++;
  //     if (idx < handlers.length) {
  //       handlers[idx](req, res, next);
  //     }
  //   };
  //
  //   handlers[idx](req, res, next);
  // }
  handle(req, res) {
    req.params={};
    const { url, method } = req;
    const routes = Object.keys(this.routes);

    const matchedRoute = routes.find(route => {
      const pattern = new RegExp(`^${route.replace(/:\w+/g, '(\\d+)')}$`);

      return pattern.test(url) && this.routes[route].method === method;
    });
    if (!matchedRoute) {
      res.statusCode = 404;
      res.end("Not Found");
      return;
    }

    const { handlers } = this.routes[matchedRoute];

    let idx = 0;
    const next = () => {
      idx++;
      if (idx < handlers.length) {
        handlers[idx](req, res, next);
      }
    };

    const pattern = new RegExp(`^${matchedRoute.replace(/:\w+/g, '(\\d+)')}$`);

    const params = pattern.exec(url).slice(1);
    req.params["id"]  = params[0];
    handlers[idx](req, res, next);
  }

}

module.exports = Router;
