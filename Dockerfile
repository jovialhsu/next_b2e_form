FROM node:10.19.0-alpine 
#載入node.js所需環境
WORKDIR /workspace
#在這個 Docker 的環境之中建立一個工作目錄 /workspace
ADD . /workspace
#把跟 Dockerfile同個資料夾的程式加到剛建立的工作目錄 /workspace 中
RUN yarn 
#執行yarn，讓 yarn 透過讀取 package.json 下載相依的 package
EXPOSE 3005
#指定 container 對外開放的 port
CMD node server.js 
#透過 node server.js 來執行我們的 Server

# ARG build_env=local

# # Build image
# FROM node:10.19.0-alpine3.11 AS builder
# # Create and change to the app directory.
# WORKDIR /workspace
# #ARG API_ENV
# #ENV API_ENV $API_ENV
# #RUN echo ${API_ENV}
# # Install app dependencies
# COPY package.json yarn.lock ./
# RUN yarn
# COPY . .
# RUN yarn build && yarn --production

# FROM node:10.19.0-alpine3.11 AS local_build

# FROM node:10.19.0-alpine3.11 AS cloud_build
# WORKDIR /workspace
# ONBUILD COPY source-context.json .

# # Final image for runtime
# FROM ${build_env}_build
# WORKDIR /workspace
# COPY --from=builder /workspace/package.json /workspace/next.config.js ./
# COPY --from=builder /workspace/node_modules ./node_modules
# COPY --from=builder /workspace/build ./build
# COPY --from=builder /workspace/public ./public
# COPY --from=builder /workspace/server ./server

# # Specify container port app runs on
# # EXPOSE 3000
# # Run the web service on container startup.
# CMD yarn server
