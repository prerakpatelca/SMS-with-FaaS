# SMS-with-FaaS
Created a serverless (FaaS) SMS bot using Twilio. Used a microservice (DBaas) to store application data.

Created an SMS bot that when texted will modify a Redis database and send responses, and will also access 3rd party API. Also create an accompanying NodeJS application that continuously checks for changes to the Redis database, and will update a front-end website and SQLite database in response.

#### This guide

* node_modules – Our application's dependancies. npm manages this folder automatically.
* api.db – The database where the table "messages" exits.
* package-lock.json – Machine-readable version of package.json for npm. npm manages this folder automatically. [More here](https://docs.npmjs.com/configuring-npm/package-lock-json.html#:~:text=Description,regardless%20of%20intermediate%20dependency%20updates.)
* package.json – Works with npm to manage application's dependancies.
* README.md - This file.

# Languages and Tools used
    - NodeJS
    - Twilio
    - Redis Database
    - Socket.IO
    - SQLite Database
 
 # Learning Objectives
    - Create a serverless (FaaS) SMS bot using Twilio
    - Use a microservice (DBaas) to store application data

#### Development
* Make sure you install npm dependances first: `npm install`
* To run both server and client: `npm run start`
* To run only server or client: `npm run server|client`

# Output

![alt text](https://github.com/prerakpatelca/SMS-with-FaaS/blob/master/1.jpg)
![alt text](https://github.com/prerakpatelca/SMS-with-FaaS/blob/master/2.jpg)
![alt text](https://github.com/prerakpatelca/SMS-with-FaaS/blob/master/Screen%20Shot%202021-01-03%20at%2011.08.40%20AM.png)
