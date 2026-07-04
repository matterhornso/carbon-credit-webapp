# # build environment
# FROM node:13.12.0-alpine as react-build

# ENV HOME=/home

# ENV PATH $HOME/app/node_modules/.bin:$PATH

# # Set env variable
# ARG REACT_APP_ENDPOINT
# ENV REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT

# RUN echo "Api endpoint = " $REACT_APP_ENDPOINT

# COPY package.json package-lock.json $HOME/app/

# COPY src/ $HOME/app/src

# COPY public/ $HOME/app/public

# WORKDIR $HOME/app

# # React running setup (for front-end)

# RUN rm -rf node_modules/

# RUN npm install

# # RUN npm install react-scripts@3.4.1 -g

# RUN npm run build

FROM node:14.15.0-alpine as react-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Set env variable
ARG REACT_APP_ENDPOINT
ENV REACT_APP_ENDPOINT=${REACT_APP_ENDPOINT}
RUN echo "Api Base Url = " $REACT_APP_ENDPOINT

COPY package.json ./
COPY package-lock.json ./
RUN apk add --no-cache git
RUN git --version
RUN npm cache clean --force
RUN npm install --no-audit


#Install pdfmake npm install pdfmake
#Go to package directory ./node_modules/pdfmake/
#Create the examples/fonts subdirectory in your pdfmake code directory, if it doesn’t already exist.
#Copy your fonts (and other files you wish to embed) into the examples/fonts subdirectory.
#Run command node build-vfs.js "./examples/fonts". Or run node build-vfs.js to show help.
#Include your new build/vfs_fonts.js file in your code (in the same way you include pdfmake.js or pdfmake.min.js).

RUN mkdir -p ./node_modules/pdfmake/examples/fonts
#COPY examples/fonts/ ./node_modules/pdfmake/examples/fonts
RUN ls
RUN pwd
COPY examples/vfs_fonts.js ./node_modules/pdfmake/build/vfs_fonts.js
#RUN node ./node_modules/pdfmake/build-vfs.js ./node_modules/pdfmake/examples/fonts

#RUN mkdir -p ./build && touch ./build/vfs_fonts.js
#RUN node node_modules/pdfmake/build-vfs.js node_modules/pdfmake/examples/fonts
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npx browserslist@latest --update-db
RUN npm run build

# production environment
FROM nginx:stable-alpine

# ENV HOME=/home

COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=react-build $HOME/app/build /usr/share/nginx/html

COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
