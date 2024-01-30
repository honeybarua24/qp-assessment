<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Groceries and Inventory management API's.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## API's Description
 ```bash
# API's are JWT token protected. Hence to excute API's , Admin and User have to execute /login API to generate the JWT token for running groceries management API. Token will adhere to the roles and permission for executing the API's.

# Admin 
# Username : Honey
# Passwrd : Honey@12345

# User
# Username : Aman
# Password : Aman@12345


## API Routes

# /login
# To generate JWT access token,

# /view/:id?
# return the available groceries data , If passed with groceries id will return the specific groceries data.

# /available
# returns the available groceries in inventory.

# /add
# API to POST groceries in inventory.
# expects data body {name : ?, price :  ?, quantity : ? , category : ? , description : ? }

# /update/:id
# updates the groceries items in inventory.
# expects data body {name : ? , price : ? , quantity : ? }.

# /delete/:id
# deletes the groceries against the id from inventory.

# /inventory/:id
# Manages the inventory
# expects the data body against the id passed in prama with quantity and operation type.
# e.g. {quantity : 2 , operation: 1} , 1/0 are for adding or deleting the items from inventory.

# /book
# books the items from groceries available in inventory.
# data body expects the array of items id and quantity. 
# e.g. [{id :1 , quantity : 3} , ...]
```