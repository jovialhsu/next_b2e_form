ARG build_env=local

####build stage
#載入node.js所需環境
FROM node:10.19.0-alpine3.11 AS builder
#在 Docker 中建立一個工作目錄 /workspace
WORKDIR /workspace
#把跟 Dockerfile同個資料夾的程式加到剛建立的工作目錄 /workspace 中
COPY package.json yarn.lock ./
RUN yarn
#複製我目錄的檔案到容器內的目標位置，也就是上面 WORKDIR 所指定的目錄位置
COPY . .
#RUN yarn 
RUN yarn build 

#執行yarn，讓 yarn 透過讀取 package.json 下載相依的 package
FROM node:10.19.0-alpine3.11 AS local_build

FROM node:10.19.0-alpine3.11 AS cloud_build
WORKDIR /workspace
ONBUILD COPY source-context.json .


####Final Stage
FROM ${build_env}_build
WORKDIR /workspace
COPY --from=builder /workspace/package.json /workspace/next.config.js ./
COPY --from=builder /workspace/server.js ./
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/pages ./.pages
COPY --from=builder /workspace/.next ./.next
COPY --from=builder /workspace/public ./public
EXPOSE 3005
#指定 container 對外開放的 port
CMD yarn server

