class Router {
  constructor() {
    this.routes = {};
  }

  get(path, ...handlers) {
    console.log(handlers)
    this.routes[path] = {
      method: "GET",
      handlers,
    };
  }

  post(path, ...handlers) {
    this.routes[path] = {
      method: "POST1",
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
    // 初始化params为一个空对象
    req.params = {};
    const { url, method } = req;

    // 获取所有已定义路由
    const routes = Object.keys(this.routes);

    // 通过正则匹配获取路由中的参数
    const matchedRoute = routes.find((route) => {
      // 将路由中的参数替换为\d+，以便匹配数字
      const pattern = new RegExp(`^${route.replace(/:\w+/g, "(\\d+)")}$`);

      // 如果URL和HTTP方法均匹配，返回当前路由
      return pattern.test(url) && this.routes[route].method === method;
    });

    // 如果没有匹配到路由，返回404
    if (!matchedRoute) {
      res.statusCode = 404;
      res.end("没有对应的资源");
      return;
    }

    // 获取匹配路由的处理函数列表
    const { handlers } = this.routes[matchedRoute];

    // 定义handlers处理函数的索引
    let idx = 0;

    // 定义next函数，用于递归调用handlers中的处理函数
    const next = () => {
      idx++;
      if (idx < handlers.length) {
        handlers[idx](req, res, next);
      }
    };

    // 获取匹配路由的正则表达式，并从URL中提取参数
    const pattern = new RegExp(`^${matchedRoute.replace(/:\w+/g, "(\\d+)")}$`);
    const params = pattern.exec(url).slice(1);

    // 将参数添加到req.params对象中
    req.params["id"] = params[0];

    // 调用处理函数列表中的第一个处理函数，并传递req、res和next三个参数
    handlers[idx](req, res, next);

  console.log(handlers)
  }
}

module.exports = Router;
