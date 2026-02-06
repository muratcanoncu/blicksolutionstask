# 🛒 Full Stack Shopping List App Blicksolutions

A simple full stack shopping list application that allows users to add items, mark them as bought, and remove them from the list.

## Features

- Add new shopping items
- Prevent duplicate items (case-insensitive)
- Mark items as bought / unbought
- Delete items from the list
- Responsive and accessible UI
- REST API with clear endpoints
xw

## Tech Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS

**Backend**
- Express
- TypeScript
- MongoDB
- Mongoose


## Environment Variables

The backend requires a `.env` file to run.

Create a `.env` file inside the **backend** directory and add following properties:

PORT=8000
MONGODB_URI=mongodb+srv://shopifyuser:blick123shopify@blicksolutionsdb.nydqghm.mongodb.net/?appName=blickSolutionsDB


## Running the Application

You can run the backend, frontend, or both together depending on your needs.

### Run Backend Only

- redirect -> **"cd backend"**
- install dependencies: **"npm install"**
- run command: **"npm run dev:backend"**
- base url local: **http://localhost:8000**

### Run Frontend Only

- redirect -> **"cd frontend"**
- install dependencies: **"npm install"**
- run command: **"npm run dev:frontend"**
- base url local:  **http://localhost:3000/**

### Run whole app (Backend and Frontend on one command)

- install dependencies for **backend**, **frontend** and **root** directories
- run command: **npm run dev:all**
- page url: **http://localhost:3000/**


## API Endpoints

**GET** `/items`

Returns the full list of items.

**Response**
```json
[
  {
    "_id": "string",
    "name": "Apple",
    "nameKey": "apple",
    "bought": false,
    "createdAt": "2026-02-05T14:32:10.123Z"
  },
  {
    "_id": "string",
    "name": "Apricot",
    "nameKey": "apricot",
    "bought": false,
    "createdAt": "2026-02-05T15:32:10.123Z"
  }
]
```

**POST** `/add`

Adds an item to the list.

**Body**
```json
{
  "name": "Milk"
}
```

**PUT** `/update/:id`

Updates the bought status of an item.

**URL Parameters**
- `id` – The ID of the item to delete

**Body**
```json
{
  "bought": !bought
}
```

**Response**
```json
{
  "message": "Item updated",
  "item": {
    "_id": "string",
    "name": "Apple",
    "nameKey": "apple",
    "bought": true,
    "createdAt": "2026-02-05T14:32:10.123Z"
  }
}
```

**DELETE** `/delete/:id`

Deletes an item based on the id.

**URL Parameters**
- `id` – The ID of the item to delete

**Response**
```json
{
  "message": "Item deleted",
  "data": {
    "_id": "string",
    "name": "Apple",
    "nameKey": "apple",
    "bought": false,
    "createdAt": "2026-02-05T14:32:10.123Z"
  }
}
