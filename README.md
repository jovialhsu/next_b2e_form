## 專案架構
- ReactJS
- NextJS
- Redux
- Redux-saga
- Webpack
- Babel
- Koa (server)
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
```bash
yarn dev      #本機設定環境變數 DEV
```
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
|-pages                  // Next.js page 對應 (route)
|    ├ _document.js      // html, head, body
|    ├ _app.js           // root組件,全局佈局樣式
|    ├ finish.js         //　填寫完成頁  
|    └ index.js          // 首頁（企業會員加入表單）
|-components             // Stateless & presentational 
|    ├ helpers
|    ├ UI
|    ├ utils
& functional Components    
|-public                 // static public to 
|    └ images
|-config                 // clinet config
|    ├ meta
|    └ uri
|        └ client.js     // frontEnd call server api route
|-redux
|    ├ actions
|    ├ constants
|    ├ reducers
|    ├ sagas             
|    └ store.js           // import redux, redux-saga
--server---        
├ server
|    ├ config
|    |    └ uri
|    |        └ server.js // true endpoint routes
|    ├ controllers        // axios
|    ├ routes
|    ├ utils
|    └ server.js          // Koa
├ Dockerfile              // docker Image
├ docker-compose.yaml     // docker compose
├ next.config.js          // webpack config 
--inherit Next.js--
├ package.json
├ yarn.lock
├ .babelrc
├ .dockerignore
├ .gitignore
└ .vscode

----- next build -----

└ build
    ├ images
    ├ static
    └ server
```