# lvyou-frontend

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 远程部署

#### 前端部署

使用nginx进行反向代理

#### 后端部署

安装mysql和redis服务
```
sudo apt install mysql-server redis-server
```

初始化数据库
```
mysql -u root -p < init.sql
```

挂起项目
```
nohup java -jar lvyou-backend-0.0.1-SNAPSHOT.jar > ./logs/app.log 2>&1 &
```
- 2>&1：将标准错误重定向到标准输出，使所有输出都进入指定的日志文件
- &：将命令放在后台运行