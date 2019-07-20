<a href="">
  <img src="https://img.shields.io/badge/Project-ExpressJS-brightgreen.svg"/>
</a>

# Astro Backend 

## Introduction
Experimental Astronaut Clone Backend - Build With AdonisJS

## Table of Contents

- [Introduction](#introduction)
- [Endpoints](#endpoints)
- [Requirements](#requirements)
- [Contributors](#contributors)

## Related Project
* <a href="https://github.com/ariandy/astro-be">React Native - astro-fe</a>

## Endpoints
* `POST /api/v1/user`, store the user information (name, email, phone number).
* `GET /api/v1/questions?number=$number`, to fetch all of the question, one by one.
* `POST /api/v1/answer`, save all of the user answer.

## Requirements
* [`npm`](https://www.npmjs.com/get-npm)
* [`adonisjs`](https://adonisjs.com)


## How To Run

1. Clone this repository
   ```
   $ git clone https://github.com/ariandy/astro-be.git
   ```
2. Install all depedencies on the package.json
   ```
   $ cd astro-be
   $ npm install
   ```
3. Just run the migration and seed
   ```
   $ adonis migration:run
   $ adonis seed
   ```
4. Run the Adonis server
   ```
   $ adonis serve --dev
   ```
