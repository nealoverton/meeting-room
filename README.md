# Meeting Room Reservation App

## Built by Neal Overton (https://github.com/nealoverton) and Cora Marcu (https://github.com/coramarcu)

## Decription

This app is to be used for the booking of a single meeting room or workspace. It is built with React and uses a firebase backend

## Requirements

- Node.js 14.x
- git 2.x
- npm 6.x

## Cloning

In your terminal:

        $ git clone https://github.com/nealoverton/meeting-room.git
        $ cd book-a-meeting
        
## Firebase config

You will need a google firebase account and to create a web app which allows email and password authentication. You should store the credentials for this app in a .env file in the project folder as follows:

        $ REACT_APP_API_KEY =[your api key]
        $ REACT_APP_AUTH_DOMAIN =[your auth domain]
        $ REACT_APP_PROJECT_ID =[your project id]
        $ REACT_APP_STORAGE_BUCKET =[your storage bucket]
        $ REACT_APP_SENDER_ID =[your sender id]
        $ REACT_APP_API_ID =[your api id]

## Running the Application

To initialise in node:

        $ npm install

Once initialised, the project can be run locally with:

        $ npm start

