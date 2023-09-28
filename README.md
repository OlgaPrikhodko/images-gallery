# Image Gallery

This is the React and Python Flask Full Stack Web Development Bootcamp.

Application consist of the frontend and backend parts.

The frontend built using React. The backend API built using Python Flask.

Image Gallery a simple single application that let you search image (using Unsplash API - https://unsplash.com) and display it as an image card with image, title, description and author information. Also you could save that image to your collection (via api with Python to MongoDB Database) as well as delete from collection.

During developing also were used:

- React - frontend part
- Python Flask framework - API
- MongoDB to save image metadata
- Postman for testing API requests,
- Docker for optimizing developing process

#### API Endpoints

- /new-image GET
- /images GET POST
- /images/<image_id> DELETE
