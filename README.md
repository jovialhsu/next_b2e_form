## 專案架構
- ReactJS
- NextJS
- Webpack
- Babel
- Koa (server)
---
### host
**for windows mode**

C:\WINDOWS\System32\drivers\etc\hosts

~~新增: 3w.join-eztravel.com~~
```
~~127.0.0.1 3w.join-eztravel.com~~
```

### Nginx
http {} 內新增一組 server block

server_name    `*.join-eztravel.com`;
```bash
server {
    listen       80;
    server_name  *.join-eztravel.com;
    charset utf-8;

    # 指向 3000 port
    location /{
        proxy_pass http://localhost:3000/;
    }
}
```
---
## 專案設定

#### 設定系統環境變數 DEV/TEST/WS/PRD
```bash
API_ENV=DEV
```
若無設定環境變數預設為 DEV
#### 安裝 modules
```bash
yarn
```
#### 開發環境 TEST/WS/PRD
```jsx
yarn start      //本機設定環境變數 DEV
```
開啟瀏覽器 `http://3w.join-eztravel.com`
#### build and run server
**API_ENV 由環境變數帶入**
```
yarn build
yarn sever
```
#### Docker(docker-compose.yaml for development)
```bash
# 移除沒用到的部分
docker system prune -a

# 啟動
docker-compose up

# 啟動後不監聽
docker-compose up -d

# 停止
docker-compose stop

# 修改設定後重啟
docker-compose restart

# 進入容器內
docker-compose exec server sh
```
---
## 目錄結構
```
├ pages                 // Next.js page 對應 route
    └ dashboard
        └ index.js
    └ _document.js      // html, head, body
    └ _app.js           // 根組件,全局佈局樣式
    └ _error.js         // error page
    └ index.js          // 首頁
├ containers            // stateful
    └ byPageComponents
├ components            // Stateless & presentational & functional Components
    └ Layout
        └ index.js
        └ _useStyles.js
    └ Header
    └ Footer
    └ Meta
├ redux
    └ constants         // action type constants
        └ index.js
    └ actions           // actions
        └ ...Actions.js
    └ reducers
        └ index.js      // rootReducers
        └ ...Reducer.js
    └ saga
        └ index.js      // rootSaga
        └ ...Saga.js
    └ store.js
├ public                // static public to build
    └ static
        └ images
├ theme
    └ index.js          // Material UI createMuiTheme
├ config                // clinet config
    └ meta
    └ uri
        └ client.js
├ utils                 // clinet utils
    └ index.js

----- server 的檔案都需在這層之下 -----

├ server
    └ config            // server config
        └ uri
            └ server.js
    └ controllers       // server api controllers
    └ middleware        // server middleware
    └ utils             // server utils
        └ index.js
    └ app.js            // server app

├ Dockerfile            // docker Image
├ docker-compose.yaml   // docker compose
├ next.config.js        // webpack config inherit Next.js
├ package.json
├ yarn.lock
├ .babelrc
├ .dockerignore
├ .gitignore
├ .prettierrc
└ .vscode

----- next build -----

└ build
    └ images
    └ static
    └ server
```