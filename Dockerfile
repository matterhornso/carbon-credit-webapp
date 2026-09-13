# Build stage. Node 20: the previous node:13/14 base cannot build this app.
FROM node:20-alpine AS react-build
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN apk add --no-cache git python3 make g++ && npm install --no-audit --unsafe-perm

# pdfmake expects its font virtual filesystem in build/, and the app ships a
# prebuilt one rather than generating it at install time.
RUN mkdir -p ./node_modules/pdfmake/build
COPY examples/vfs_fonts.js ./node_modules/pdfmake/build/vfs_fonts.js

COPY . ./
# CI=false because create-react-app treats warnings as errors when CI is set,
# and this codebase carries thousands of pre-existing lint warnings. TypeScript
# errors still fail the build, so this hides nothing that breaks at runtime.
RUN CI=false npm run build

# Serve stage.
FROM nginx:stable-alpine
# Railway assigns a port at runtime, so the listen directive is templated and
# substituted on start rather than baked in.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
ENV PORT=8080
EXPOSE 8080
COPY --from=react-build /app/build /usr/share/nginx/html
