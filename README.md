<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
