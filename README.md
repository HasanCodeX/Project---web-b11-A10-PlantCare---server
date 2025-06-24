# 🌿 Plant Care Tracker - Backend API

A robust Node.js backend service for the Plant Care Tracker application, providing RESTful CRUD operations with MongoDB Atlas integration.

🔗 **Production URL**: [project-web-b11-a10-plant-care-serv.vercel.app](https://project-web-b11-a10-plant-care-serv.vercel.app)

## 🚀 Features

### 🌱 Plant Management
- **Create**: Add new plants with full details
- **Read**: Fetch all plants or individual plants by ID
- **Update**: Modify existing plant records
- **Delete**: Remove plants from collection

### ⚙️ Technical Features
- **MongoDB Atlas** cloud database integration
- **Environment variables** for secure configuration
- **CORS enabled** for cross-origin requests
- **Error handling** for all endpoints
- **ObjectID validation** for MongoDB operations

## 🛠 Tech Stack

| Component       | Technology       |
|----------------|------------------|
| Runtime        | Node.js          |
| Framework      | Express.js       |
| Database       | MongoDB Atlas    |
| Middleware     | CORS, dotenv     |
| Package Manager| npm              |

## 📦 API Endpoints

| Method | Endpoint          | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/plants`        | Add new plant                   |
| GET    | `/plants`        | Get all plants                  |
| GET    | `/plants/:id`    | Get single plant by ID          |
| PUT    | `/plants-update/:id` | Update plant information    |
| DELETE | `/plants/:id`    | Delete plant                    |

## 🏗 Project Structure
plant-care-backend/
├── index.js # Main server configuration
├── .env # Environment variables
├── package.json # Dependency management
└── README.md # Documentation

text

## 🚀 Deployment

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Vercel account (for deployment)

### Local Development
1. Clone repository
```bash
git clone https://github.com/HasanCodeX/Project---web-b11-A10-PlantCare---server
cd plant-care-backend
```

### Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000
NAME=your_mongodb_username
PASS=your_mongodb_password
```

## Start server

```bash
npm start
```

# or for development with nodemon

```npx nodemon index.js```

## Vercel Deployment

Install Vercel CLI

``` bash
npm install -g vercel
```

##Deploy

bash
vercel
📜 Environment Variables
Variable	Required	Description
```
PORT	No	Server port (default:5000)
NAME	Yes	MongoDB username
PASS	Yes	MongoDB password
```
🤝 Contributing
Fork the project

Create your feature branch (```git checkout -b feature/AmazingFeature```)

Commit your changes (```git commit -m 'Add some feature'```)

Push to the branch (```git push origin feature/AmazingFeature```)

Open a Pull Request

📄 License
This project is currently unlicensed. For usage permissions, please contact the maintainer.

📬 Contact
Maintainer: Mehedi Hasan
📧 Email: dev.hasan10@gmail.com
🔗 GitHub: https://github.com/HasanCodeX
