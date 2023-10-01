# School Management API

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## Description

The School Management API is a backend application for managing school-related data, including students, teachers, courses, and more. It provides a RESTful API for interacting with the school's database.

## Table of Contents

- [School Management API](#school-management-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Packages](#packages)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Starting the API](#starting-the-api)
  - [API Documentation](#api-documentation)
  - [Environment Variables](#environment-variables)
  - [Configuration](#configuration)
  - [Testing](#testing)

## Requirements

- node(16.15.1 or later)
- npm

## Packages

- bcryptjs
- dotenv
- express
- express-openapi-validator
- jest
- jsonwebtoken
- mongoose
- morgan
- swagger-ui-express
- yamljs
- supertest

## Installation

To get started with the School Management API, follow these steps:

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/iqbal-dev/school-management-system.git

   ```

2. Navigate to the project directory.

   ```bash
   cd school-management-system

   ```

3. Install the required dependencies using npm.

   ```bash
   npm install
   ```

## Usage

### Starting the API

To start the API server in development mode with auto-reloading:

```bash
npm run dev
```

To start the API server in production mode:

```bash
npm start
```

## API Documentation

The API is documented using Swagger UI. Once the server is running, you can access the API documentation at:

```
http://localhost:4000/api-docs
```

## Environment Variables

Ensure you set up your environment variables by creating a .env file in the project root. You can use the provided .env.example as a template.

## Configuration

The API configuration is stored in the config directory. You can customize various settings, such as database connection, authentication, and more, by editing the appropriate configuration files.

## Testing

To run the unit and integration tests and generate code coverage reports:

```bash
npm test
```
