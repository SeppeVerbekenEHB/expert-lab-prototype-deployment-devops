# expert-lab-sprint-1

This project is a simple static website built using **HTML** and **CSS**. The project utilizes a **CI/CD pipeline** that automatically builds a Docker image and pushes it to **Docker Hub** upon changes in the repository. Additionally, **Watchtower** is used to automatically update the running Docker container with the latest version of the website.

## Table of Contents

- [expert-lab-sprint-1](#expert-lab-sprint-1)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Technologies Used](#technologies-used)
  - [Folder Structure](#folder-structure)
  - [Docker Setup](#docker-setup)
    - [Dockerfile](#dockerfile)
    - [Docker Compose](#docker-compose)
  - [CI/CD Pipeline](#cicd-pipeline)
  - [Running the Project Locally](#running-the-project-locally)
    - [Using Docker Compose](#using-docker-compose)
  - [Automatic Updates with Watchtower](#automatic-updates-with-watchtower)

## Project Overview

This project serves a simple website using **Nginx** within a Docker container. The project integrates with **GitHub Actions** for CI/CD, automatically building and pushing the Docker image to Docker Hub when changes are pushed to the `main` branch.

A separate service, **Watchtower**, runs in parallel to ensure the Docker container is updated with the latest image from Docker Hub automatically.

## Technologies Used

- **HTML/CSS**: Core front-end languages used to build the website.
- **Docker**: Containerization platform to build, ship, and run the website.
- **Nginx**: Web server used to serve the static content.
- **Watchtower**: Tool for automatically updating Docker containers.
- **GitHub Actions**: For automating the CI/CD pipeline.
- **Jest**: For running tests.

## Folder Structure

```bash
.
├── __tests__/
│   └── sum.test.js
├── github/
│   └── workflows/
│       └── node.js.yml
├── Html/
│   └── index.html
├── Css/
│   └── indexStyle.css
├── sum.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── LICENSE
├── .gitignore
└── README.md
```
## Docker Setup

The project uses **Docker** to containerize the static website, and the **Nginx** web server is configured to serve the content.

### Dockerfile

Here is a simple overview of the **Dockerfile** used to build the project:
```dockerfile
# Use the official Nginx image from Docker Hub
FROM nginx:alpine

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files into the Nginx directory
COPY html/ /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY sum.js /usr/share/nginx/html/sum.js

# Expose port 80 (default Nginx port)
EXPOSE 80
```
This **Dockerfile**:
- Uses the **nginx** image.
- Copies the website files from the **Html/** and **Css/** directories into the appropriate Nginx directory.

### Docker Compose

The project uses Docker Compose to orchestrate running both the **website** and **Watchtower** containers:

```yaml
version: '3'
services:
  app:
    image: seppeverbeken/app:latest
    container_name: my-static-app
    ports:
      - "8080:80"
    restart: always  # Automatically restart the app container if it stops

  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock  # Allow Watchtower to interact with the Docker daemon
    environment:
      - WATCHTOWER_CLEANUP=true  # Clean up old images after updating
      - WATCHTOWER_POLL_INTERVAL=10  # Check for updates every 10 seconds
```
- The **app** service runs the latest Docker image of the website.
- The **Watchtower** service monitors for changes in the image and automatically updates the **app** container.

## CI/CD Pipeline

The project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD). Every time changes are pushed to the `main` branch, the pipeline does the following:

1. Runs tests (if applicable).
2. Builds the Docker image.
3. Pushes the image to Docker Hub as `seppeverbeken/app:latest`.

## Running the Project Locally
To run the project locally using Docker, follow these steps:

1. Pull the latest image from Docker Hub:
   ```bash
   docker pull seppeverbeken/app:latest
   ```
2. Run the container:
   ```bash
   docker run -d -p 8080:80 seppeverbeken/app:latest
   ```
This will start both the **app** and **Watchtower** containers.

### Using Docker Compose

Alternatively, you can run the project and Watchtower together using Docker Compose:

1. Ensure you're in the project directory where **docker-compose.yml** is located.
2. Run the following command:
```bash
docker-compose up -d
```
This will start both the **app** and **Watchtower** containers

## Automatic Updates with Watchtower

Watchtower ensures that the locally running container automatically updates whenever a new image is pushed to Docker Hub.

- **Poll Interval**: Watchtower checks for updates every 10 seconds as configured in **docker-compose.yml**.
- **Image Cleanup**: Old Docker images are automatically cleaned up to save space.

To verify Watchtower logs, you can run:
```bash
docker logs watchtower
```