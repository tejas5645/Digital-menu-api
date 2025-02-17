# Digital Menu API

## Overview
This is a REST API for managing a digital menu, built with **Express.js** and **PostgreSQL**. It allows users to manage menu items, food groups, and quantity options.

## Features
- CRUD operations for menu items, food groups, and quantity options.
- PostgreSQL database integration.
- Organized project structure with controllers, routes, and database connection.
- Uses environment variables for database configuration.

## Project Structure
```sh
digital-menu-api/
├── server.js
├── db.js
├── routes/
│   ├── menuRoutes.js
│   ├── foodGroupRoutes.js
│   ├── quantityRoutes.js
├── controllers/
│   ├── menuController.js
│   ├── foodGroupController.js
│   ├── quantityController.js
├── .env
├── package.json
└── README.md
```

## API Endpoints
### Menu Endpoints

- **GET** `/menu`: description: Get all menu
- **GET** `/menu/:mid`: description: Get particular menu by mid
- **GET** `menu/name/:nm`: Get all menu by letter or word
- **POST** `/menu`: Add a new menu
- **PUT** `/menu/:mid`: Update a menu
- **PUT** `/menu/price/:mid`: Update a menu price
- **DELETE** `/menu/:mid`: Delete a menu by UID

## Food_group Endpoints

- **GET** `/food_group`: Get all food_groups
- **GET** `/food_group/:fid`: Get a specific food_group
- **POST** `/food_group`: Add a food_group
- **PUT** `/food_group/:fid`: Update a food_group by food_group fid
- **DELETE** `/food_group/:fid`: Delete a food_group by fid

## Quantity Endpoints

- **GET** `/quantity`: Get all Quantity types
- **GET** `/quantity/:qid`: Get a specific f Quantity type
- **POST** `/quantity`: Add a  Quantity type
- **PUT** `/quantity/:qid`: Update a  Quantity type by  Quantity qid
- **DELETE** `/quantity/:qid`: Delete a  Quantity type by qid

## Setup & Installation

### Clone the Repository
```sh
git clone https://github.com/your-repo/digital-menu-api.git
cd digital-menu-api
```

### Install Dependencies
```sh
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and add your database configuration:
```env
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASS=your_db_password
DB_PORT=5432
PORT=5000
```

### Run the Server
```sh
node server.js
```
The API will start at `http://localhost:5000`






