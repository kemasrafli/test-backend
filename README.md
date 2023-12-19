# TEST BACKEND - Merkle Inovation

### Setup Install
```
  npm install
```

### Run Project
```
  nodemon
```

### Import file Postman Collection
```
    Test Backend.postman_collection.json
```

## API Reference

#### 1. Insert Guest

```http
  POST /api/guests
```

| Body Json | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Insert guest name |
| `address` | `string` | **Required**. Insert guest address |
| `phone` | `string` | **Required**. Insert guest phone |
| `notes` | `string` | **Required**. Insert guest notes |

#### 2. Get Guest Notes

```http
  GET /api/notes
```

#### 3. Login Admin

```http
  POST /api/login
```

| Body Json | Type     | Description                | Value    |
| :-------- | :------- | :------------------------- | :------- |
| `username` | `string` | **Required**. Insert username | admin |
| `password` | `string` | **Required**. Insert password | password|

#### 4. Get Data Guests

```http
  GET /api/admin/data
```

| Authorization | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `key` | **Required**. Insert token from login response |