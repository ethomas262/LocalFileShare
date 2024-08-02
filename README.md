# File Sharing Application README

## Overview

This file sharing application is designed to provide an easy-to-deploy web app that can run on local devices within a network. It facilitates quick discussions and file sharing on specific topics in a local environment. All data storage and API calls are kept local, ensuring that information remains private. Only the host and admin have the authority to tear down the server and mount the shared files for backups. Future functionality will include additional features such as user login, admin administration, and Docker deployment paths.

## Front End

The application consists of two main components: a lightweight Angular frontend built using the Angular/CLI NPM modules, and backend code for storing and retrieving messages, as well as hosting links to download files from the server.

### Architecture

Data is retrieved from the local database via the message service and file service module. These are custom-built API endpoints that interact with the NodeJS backend server running on localhost via RESTful APIs.

## Backend API Structure

The backend server runs an Express backend using CORS (Cross-Origin Resource Sharing) to handle front-end application API requests for message data and file requests.

### File Upload

File uploads are managed via the POST: `/upload/` API. The file is salted, saved, and a database document is created to reference the location from which users can download the file.

### File Download

Users can download specific files from the application via the file object referenced in the database. Links and filenames are custom generated during runtime, with mitigations against hash collisions and unique file identification. Downloading files involves making an HTTP GET request with the unique identifier of the file to the `/download` API endpoint.

## Database

The File Share application uses the Mongoose MongoDB driver for Express to handle two collections: user messages and file data. Upon user submission, messages are built in the NodeJS backend and sent to the database for persistent storage along with additional information such as the author and timestamp of each message. The file collection stores the name of each file uploaded to the server, the URL link for users to download the file, and the original name of the file before salting to prevent hash collisions.

## API Endpoints

### Messages

- **GET `/api/messages`**: Retrieves messages from the database.
- **POST `/api/messages`**: Adds a new message to the database.
- **GET `/api/oldMessages`**: Retrieves old messages from the database.

### Files

- **GET `/files`**: Retrieves file references from the database.
- **GET `/files/download`**: Downloads a file from the server.
- **POST `/upload`**: Uploads a file to the server.

---


