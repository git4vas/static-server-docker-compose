# Notes to self to clarify wtf'sgoin'on

## Install node.js using [homebrew](https://brew.sh/)

[//]: # (apply config without relogin `source .bashrc`) 

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install nvm
#then apply config without relogin:
source .bashrc

nvm install
nvm ls
nvm use 

nvm install node #install runtime


npm init #initialize project
npm install [-g] <pkg-1> <pkg-2> <pkg-3> #install the project’s dependencies <pkg-1, pkg-2, pkg-3> [globally]
npm i #reads dependencies from package.json
npm ci #clean install (those versions that worked) -- #reads dependencies from package-lock.json
npm start #start app
npm help
npm -v
```

## to select port || give it in .env || use default

```js
PORT = process.env.PORT || 8080;
```
For example, set port manually: `PORT=80 node server.js`

## .env

[howto](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

[howto.ru](https://medium.com/@hydrock/%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BE%D0%BA%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B8-node-js-e9ca2131e6b6)  
add a separate file `.env` (NB `.gitignore`)

## 


## to apply changes without restarting use nodemon

```bash
npm i -g nodemon #globally
nodemon <app.js>
```