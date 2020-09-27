![Url Shortener](https://i.ibb.co/c8Gf5yB/logo.png)
# Url Shortener
Url shortener app powered by Node.js + Express and React in TypeScript.

![Url Shortener](https://i.ibb.co/B263MQ4/url-shortener-ss.png)

## Demo
[Demo](https://e11.herokuapp.com/)

## Quick Start
```sh
$ git@github.com:pROFESOR11/url-shortener.git
$ cd url-shortener
$ yarn run heroku-postbuild
```

## Development

* Copy .env.example as .env
* Fill with your own values

* #### Server

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ yarn watch
```
Second Tab:
```sh
$ yarn dev
```

* #### Web
You don't need to explicitly run web, express serves build folder automatically.
To make changes for front-end
```sh
$ cd web && yarn start
```

When changes done, then build to let express serve build folder
```sh
$ cd web && yarn && yarn run build
```

* #### Deployment
To deploy heroku,
- login to heroku from your terminal,
- push root folder to heroku,
- heroku will do the rest by running heroku-postbuild command in package.json

## Technologies
- ### Back end
  - [Express](https://expressjs.com/) - Nodejs framwork for building the REST Apis
  - [Node.js](https://github.com/nodejs/node) - Nodejs framwork for building the REST Apis
  - [Mongodb](http://mongodb.com/) - Document oriented NoSQL database
  - [Mongoose](https://http://mongoosejs.com) - MongoDB object modeling tool
  - [nanoid](https://github.com/ai/nanoid) - URL-friendly, unique string ID generator
  - [yup](https://github.com/jquense/yup) - Javascript object schema validation
    
- ### Front end
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [react-query](https://github.com/tannerlinsley/react-query) - Fetching, caching and updating asynchronous data
  - [Semantic-UI](https://github.com/Semantic-Org/Semantic-UI-React) - Responsive front-end framework
  - [yup](https://github.com/jquense/yup) - Javascript object schema validation

## Roadmap

- [X] Url shortener - server
- [X] Url shortener - web
- [X] Duplicate slug check
- [X] Url validation on front end
- [X] Url validation on back end
- [ ] User authentication
- [ ] User-shortLink relation
- [ ] My link history
- [ ] Count and show how many times a link is used

## License
MIT
