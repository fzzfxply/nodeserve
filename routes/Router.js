class Router {
  constructor() {
    this.routes = {};
    this.routeParams = []; // 存储路由参数的正则表达式
  }

  get(path, handler) {
    this.addRoute("GET", path, handler);
  }

  post(path, handler) {
    this.addRoute("POST", path, handler);
  }

  put(path, handler) {
    this.addRoute("PUT", path, handler);
  }

  delete(path, handler) {
    this.addRoute("DELETE", path, handler);
  }

  addRoute(method, path, handler) {
    const paramNames = []; // 存储路由参数名的数组
    const regexPath = path.replace(/\/:(\w+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "/(\\w+)";
    });
    this.routeParams.push({ path: new RegExp(`^${regexPath}$`), paramNames });
    this.routes[path] = { method, handler, paramNames };
  }

  handle(req, res) {
    const { url, method } = req;

    for (const { path, paramNames } of this.routeParams) {
      const match = url.match(path);
      if (match && method === this.routes[match[0]].method) {
        const params = {};
        for (let i = 1; i < match.length; i++) {
          params[paramNames[i - 1]] = match[i];
        }
        req.params = params;
        return this.routes[match[0]].handler(req, res);
      }
    }
    res.statusCode = 404;
    res.end(`Cannot ${method} ${url}`);
  }
}

module.exports = Router;
