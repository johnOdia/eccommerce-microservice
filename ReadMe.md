# Description 
This is a demo application for an eccomerce application with backend services powered by Node (Nest) JS, Mongodb, GRPC for synchronous communication between services, Rabbitmq for asynchronous processing, and a microservice architecture.

A frontend running on React JS. And a unified docker implementation to start all services.

# Project Setup and API Instructions

## Prerequisites
Make sure you have **Docker** installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started). This project runs on docker leveraging docker mongo for all database interactions.

## Running the Application
1. Open a terminal in the project root directory.
2. Run the following command to build and start all services:
```bash
docker compose up --build

3. Wait for all services to start up (wait for the logs to end on the docker terminal) before interacting with the endpoints.
4. View documentation and run API requests on http://localhost:4001/api-docs


# Seeded User
email - john@example.com
password - password123

# Seeded Product
productId - 68cb2f43698b94762e9456b9
