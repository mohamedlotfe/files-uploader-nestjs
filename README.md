<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://github.com/mohamedlotfe/files-uploader-nestjs/blob/main/public/service-diagram.drawio.png"  alt="Nest Logo" /></a>
</p>



## Description

A NestJs server-side application that allow users to upload a file to the server, the users should be able to share a URL of uploaded file, however this URL should expire after a variable duration, the application should validate the file type and should only accept the following: ▪ PDF ▪ PNG ▪ JPG
The application containerized with proper docker file .

## Requirements
[√] create base project
[√] add module for media (uploading/downloading) 
[√] add controller, routes for file uploading 
[√] add config module + .env file
[√] create GCP project + create storage bucket +use credentials
[√] add GCP Module 
[√] add saving and retrieving functionality from GCP
[√] add cache Interceptor to route  
[√] add Authentication  
[√] create docker file
[] add unite tests
[] add swagger documantation  
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

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
