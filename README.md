 ## 运行方法&&说明
 ```
 npm i
 node ./server.js
 
 举例 api 如果要注册的话使用http://localhost:3000/api/register
 {
  用户名  "username": "user1",
  密码    "password": "password1"
}

如果在直接请求data报错TypeError: res.status is not a function
可以尝试在浏览器控制台输入
fetch('http://localhost:3000/api/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer  你登录的token`
  },
})

 ```
可使用接口
- [x] 登录接口
- [x] 注册接口
- [ ] 获取所有数据
- [ ] 获取单个数据
- [ ] 添加数据
- [ ] 更新数据
- [ ] 删除数据

#### 登录接口
```
URL: /api/login
方法: POST
返回值: 包含所有数据的JSON数组
```
#### 注册接口
```
URL: /api/register
方法: POST
返回值: 包含所有数据的JSON数组
```
#### 获取所有数据
```
URL: /api/data
方法: GET
返回值: 包含所有数据的JSON数组
```


#### 获取单个数据
```
URL: /api/data/:id
方法: GET
参数: id - 数据ID
返回值: 包含单个数据的JSON对象，如果找不到指定ID的数据则返回404
```
#### 添加数据
```
URL: /api/data
方法: POST
请求体: 包含新数据的JSON对象
返回值: 包含新数据及其ID的JSON对象
```

#### 更新数据
```
URL: /api/data/:id
方法: PUT
参数: id - 数据ID
请求体: 包含要更新的数据字段及其值的JSON对象
返回值: 包含更新后的数据的JSON对象，如果找不到指定ID的数据则返回404
```

#### 删除数据
```
URL: /api/data/:id
方法: DELETE
参数: id - 数据ID
返回值: 包含被删除的数据的JSON对象，如果找不到指定ID的数据则返回404
```


目录
 - server.js
 - data.json
 - users.json
- routes/
  - dataRoutes.js 
- controllers/
  - dataController.js
  - authController.js
- utils/
  - jwt.js
  - dataUtils.js


 
