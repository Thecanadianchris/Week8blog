# Tech Blog

Mini Blogging platform built for my week 8 bootcamp challenge.

## Features

Register and log in with a username, email and password
Create, edit and delete your own blog posts
Browse all posts and filter them by category

## How to run it locally

Clone this repository
Copy `.env.example` to `.env` and fill in your MySQL password and a JWT secret
Create the database: open `mysql -u root -p` and run `source db/schema.sql;`
Install the packages: `npm install`
Add the sample data: `npm run seed`
Start the server: `npm start`
Open http://localhost:3001 in your browser
You can log in with the demo account: demo@test.com / password123


