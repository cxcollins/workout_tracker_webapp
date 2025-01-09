
# Workout Tracker Web Application

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## About the Project

This Workout Tracker is a web application designed to help users monitor and manage their fitness routines effectively, interact with their friends' workout history, and stay motivated. The tech stack is an Angular frontend and PostreSQL backend, using Docker to containerize the app and a scalable microservice architecture to implement each feature.

## Features

- Log and track various types of workouts
- Find friends' workout history
- Analysis for individual exercises, with trend analysis overtime or calculating average load for individual workout
- Calculate powerlifting standards based on user age, weight, and sex
- Motivational quote generator

## Getting Started

To set up the project locally, follow these steps.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
  - You will have to have a database already set up in a container; you can use the same username, password, and database name that I have in my docker-compose.yaml file for simplicity if you would like.
- [ExpressJS](https://expressjs.com)
- [Flask](https://flask.palletsprojects.com)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cxcollins/workout_tracker_webapp.git
   cd workout_tracker_webapp
   ```

2. **Build Docker images and run containers:**
   ```bash
      docker-compose up --build
   ```
   - Open http://localhost:4200 in a web browser.

3. **Run microservices:**
   - Navigate to the erics_microservice directory:
     ```bash
     cd ../erics_microservice
     python calculate_trends_averages.py
     ```
   - Navigate to the percentiles_microservice directory:
     ```bash
     cd ../percentiles_microservice
     python percentiles_microservice.py
     ```
    - Navigate to the quote_generator directory:
     ```bash
     cd ../quote_generator_microservice
     python generator.py
     ```

   The application and all its microservices should now be accessible at `http://localhost:4200`.


## License

This project is licensed under the MIT license.
