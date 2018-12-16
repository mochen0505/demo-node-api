# README #

demo-node-api

### Installation ###

* Install dependencies

    ```Bash
    npm install
    ```
* Install [Mongodb](https://www.mongodb.com/download-center) and run your db on localhost:27017

### Run the App ###

* For WebStorm users:  
    In _Edit Configurations_, set _JavaScript file_ to _src/bin/www_, and set _Environment Variables_ to _DEBUG=demo-node-api:\*_
 
* For all users, simply run:

    ```Bash
    npm start
    ```
    
* The App will be running on localhost:3001

### Deployment ###

* For deployment, uncomment line 35 to 37, comment line 40 to 48 in _app.js_, and copy the _build_ file to the _src_ folder

### TODO ###

* More APIs
* Caching
* Optimization
* Unit test
