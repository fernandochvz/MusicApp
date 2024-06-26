# Music App
This is a web application for managing a music database. It allows users to search for albums, add new albums, update existing albums, and delete albums from the database.

## Features

Search for albums using the LastFM API

Add new albums to the database

Update existing album information

Delete albums from the database

View stored albums

## Technologies Used
Frontend: HTML, CSS, Bootstrap, JavaScript

Backend: Node.js, Express.js, MongoDB

APIs: LastFM API

Libraries: Axios


### Installation

Clone the repository: 
```bash
git clone https://github.com/fernandochvz/MusicApp.git
```
Navigate to the project directory:
```bash
cd MusicApp
```
Install dependencies: 
```bash
npm install express mongoose body-parser cors path axios
```
Create an .env file and add your own MongoDB connection string as MONGODB_URI

Start the server: 
```bash
node index.js
```
### Usage

1. Navigate to http://localhost:3000 in your web browser
2. Use the search bar to search for albums
3. Click the "Save" button to add an album to your personal library
4. Saved albums can be seen under Stored Albums
5. Edit or delete albums in your personal library as desired

## Course
This is done for the course Full Stack -sovelluskehitys TO00BS65-3006, Project 2 - Create a WEB application using REST API

## URLs
Video: https://video.laurea.fi/media/Fullstack+Project+2+-+Music+App/0_2k45bccx

Render: https://musicapp-ttcw.onrender.com
