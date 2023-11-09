# Stage 1 - Build the React application
FROM node:16 as build

WORKDIR /app
COPY ./recipe-app/package.json ./recipe-app/yarn.lock* ./
RUN yarn install --frozen-lockfile
COPY ./recipe-app ./
RUN yarn build

# Stage 2 - Serve the React application
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
