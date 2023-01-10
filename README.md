
## Description

- A NestJs server-side application that allow users to upload a file to the server, 
- the users should be able to share a URL of uploaded file, 
- however this URL should expire after a variable duration, 
- the application should validate the file type and should only accept the following: (▪ PDF ▪ PNG ▪ JPG)
- The application containerized with proper docker file .

## The Architecture Design 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/mohamedlotfe/files-uploader-nestjs/blob/main/public/service-diagram.drawio.png"  alt="Nest Logo" /></a>
</p>


## The soultion Demo
:white_square_button: you can see the local demo of the service and see the GCP Bucket files 
[![Watch the video](https://uploads-ssl.webflow.com/5ec37983b31fa1d20d9b4e04/5f40b876cd7d0925fc8f8209_VF-Blog-Cover-Product-demo-video-guide.jpg)](https://watch.screencastify.com/v/24PzcwHhHwr7eukIIUL1)


## Requirements
 
Done? | Requirement
:---:| ---
✅| Create base project
✅| Add module for media (uploading/downloading)
✅| Add controller, routes for file uploading 
✅| Add config module + .env file
✅| Create GCP project + create storage bucket
✅| Use GCP credentials + add GCP Module
✅| Add saving and retrieving functionality from GCP
✅| Add cache Interceptor to route
✅| Add Authentication (JwtStrategy => PassportStrategy)
✅| Apply Authentication Guards
✅| Create docker file
✅| Attach Postman collection here
⬜️| add swagger documentation  

## Running the app without docker

```bash
# installation 
$ npm install

# watch mode
$ npm run start:dev
```

## Running using docker

```bash
# build an image
$ docker build files-uploader-nest -t molotfy/files-uploader-nest

# check ur image is created & exist
$ docker images

# Run 
$ docker run -p 8080:3000 molotfy/files-uploader-nest
```


## Stay in touch

- Author - [Mohamed Lotfy](https://www.linkedin.com/in/mohamedlotfybasher/)

## License

Nest is [MIT licensed](LICENSE).
