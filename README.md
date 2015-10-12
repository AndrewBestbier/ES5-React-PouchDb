### To run navigate to http://localhost:8080 and run

```sh
$ npm install
$ npm start
```

### To run development with hot-loading:
```sh
$ npm run dev
```

### To build for production:
```sh
$ npm run build
```
### To run the tests:

```sh
$ npm run test
```

There can be some problems with running tests depending ont the version of Node you are using. 
To downgrade your version of node, use the n package as follows:

npm install -g n   # Install n globally
n 0.10             # Installing the correct version of node
This can result in some weird problems with your current packages, so delete your node_modules folder and perform a clean install.