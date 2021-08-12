# Event Management System 

[Postman API Collection]

## Required Tools And Technology Stack
* Node.js - Javascript Runtime for Servers.
* MYSQL Workbench - Database Management Tool
* Git Bash - GitCLI for Git Operations
* POSTMAN - API Testing Tool
* TypeScript -an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.

## Prerequisites
* Requires MYSQL service to run and create database.
* Start the MYSQL database service before starting backend.
* Create a Database for this application

##### Environmental Variables
####
```
DB_HOST - Set your Database Host e.g - localhost or 127.0.0.1 for Local
DB_USER =  Database User
DB_PASSWORD = Databse Password
DB_NAME = Database Name
ADMIN_DEFAULT_PASSWORD = Set Default Password for Admin
PORT = Set Default Port
```

##### To run the application
####
```
$ npm i
$ npm run local - Local Development Environment
$ npm start -  Production  Environment
```

## Folder Structure and Organization

```               
---src
    +---configs
    +---database
    +---interfaces
    +---middleware
    +---model
    +---routes
    +---utility
     |   app.ts
     |   server.ts
```
The entry point of this application is server.ts. This file creates an instance of the app and start to listen on given specific port. In the app.ts routing, intializing middleware, initializing database tables is done.
Inside the src folder we have configs folder which contains file that stores configuration variables. The database folder contains a file where the database tables are created and master data is inserted. Next the interface folder contains custom generated types which is used across the application. The middlware folder contains middlewares which is used for accessing protected routes and also login. 
Inside the model folder all the database model files are present that contains queries for respected database operations. 
The routes folder has been divided into admin and public and each of them has their routing and controllers in it and the utility folder contains utilities.

[Postman API Collection]: https://www.postman.com/collections/75703915f282cb5d42e8
