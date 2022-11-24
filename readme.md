# Notes

## Install node.js using [homebrew](https://brew.sh/)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install nvm
source .bashrc #add nvm to PATH

nvm install
nvm ls
nvm use

nvm install node #install runtime

npm init #initialize project
npm install [-g] <pkg-1> <pkg-2> <pkg-3> #install the project’s dependencies <pkg-1, pkg-2, pkg-3> [globally] 
npm i #reads dependencies from package.json
npm ci #clean install -- #reads dependencies from package-lock.json
npm start #run the starting script
npm help
npm -v
```

## to select port give it in .env || use default

[howto](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)  
[howto.ru](https://medium.com/@hydrock/%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B8-node-js-e9ca2131e6b6)  

In index.js we use dotenv to parse environment variables.
We add a separate file `.env` to set PORT and mention it in `.gitignore` (consider not ignoring it in development branch in future projects if needed).
By default `debug` and `override` are `false`, thus, the internal assignment does not override existing environment VARIABLE (cf. lines 59 & 74 in [dotenv](https://github.com/motdotla/dotenv/blob/master/lib/main.js)) and we can define port manually: `PORT=80 node index.js`

```javascript
dotenv = require('dotenv').config();
// dotenv = require('dotenv').config({debug: false,  override: false});
const PORT = process.env.PORT || 8080;
```

if public directory is not set in `.env` under `PUBLIC` the default value is `./public`
```js
var filePath = (process.env.PUBLIC || './public') + requestUrl;
```

## to apply changes without restarting use nodemon

```bash
npm i -g nodemon #install --global
nodemon <app.js>
```

## Docker

### Dockerfile

To synchronize port of the app with the one of container we could just

```dockerfile
EXPOSE $PORT
#instead of EXPOSE 8080
```

...but it does not seem to be the best practice...

### .env

first, made sure to exclude `.env` from `.dockerignore`.  
Then, for `.env` file to be  docker-readable had to remove spaces and quotes

```dockerfile
PORT=8888
PUBLIC=./public_env
```

### run

```dockerfile
docker run -ite "PORT=8080" --env-file=./.env -p 8125:8080 --name static_srv git4vas/static_srv
```
