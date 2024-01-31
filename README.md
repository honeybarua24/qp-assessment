## Description

Groceries and Inventory management API's bound to permissions and roles to perform specific operations.

## Database Management

```bash
# Import the sql file available in the project folder.
# Database name : groceries.
# Table name : groceries.
# File name : .sql
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Running with Docker 

```bash
# development
$ npm run start
```


## Assumptions
```bash
#Module contains 2 roles : Admin and User
# MySQL relational database is considered.
```

## API's Description
 ```bash
# API's are JWT token protected. Hence to excute API's , Admin and User have to execute /login API to generate the JWT token for running groceries management API. Token will adhere to the roles and permission for executing the API's.

# Project folder contains a JSON file that can be imported to postman for executing API's.
# File name : api-collection.json

# Admin 
# Username : Honey
# Passwrd : Honey@12345

# User
# Username : Aman
# Password : Aman@12345


## API Routes

# /login
# To generate JWT access token for executing API's.

# /view/:id?
# return the available groceries data , If passed with groceries id will return the specific groceries data.

# /available
# returns the available groceries in inventory , quantity greater than 0.

# /add
# API to POST new groceries in inventory.
# expects data body {name : ?, price :  ?, quantity : ? , category : ? , description : ? }

# /update/:id
# updates the groceries items in inventory against the identifier.
# expects data body {name : ? , price : ? , quantity : ? }.

# /delete/:id
# deletes the groceries against the identifier from inventory.

# /inventory/:id
# Manages the inventory to add or delete the items in inventory.
# expects the data body against the id passed in prama with quantity and operation type.
# e.g. {quantity : 2 , operation: 1} , 1/0 are for adding or deleting the items from inventory.

# /book
# books the items from groceries available in inventory.
# data body expects the array of items id and quantity. 
# e.g. [{id :1 , quantity : 3} , ...]
```