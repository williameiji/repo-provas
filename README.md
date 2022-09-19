# <p align = "center"> RepoProvas Backend </p>

Check project frontend [here](https://github.com/williameiji/repo-provas-frontend)


##  :clipboard: Description

A system for sharing tests between students, where anyone can look up old tests from their subjects and teachers or submit old tests

***

## :computer:	 Technologies and Concepts

- REST APIs
- JWTs 
- Node.js
- TypeScript
- SQL with Prisma
- Axios
- Sendgrid
- Bcrypt
- Joi
- Jest
- Supertest
- Nodemon

***

## :rocket: Routes

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body:{
        "email": "lorem@gmail.com,
        "password": "lore",
        "refPassword": "lore"
}
```
    
```yml 
POST /login
    - Route to login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "lore"
    }
```

```yml
POST /tests (authenticated)
    - Route to add a new test
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "Lorem",
        "pdfUrl": "Loremipsum.pdf", (must be a file)
        "category": "loremipsum2", (must be in the system)
        "discipline": "Lorem Ipsum", (must be in the system)
        "teacher": "Ipsum Lorem" (must be in the system)
    }
```
    
```yml 
GET /tests/teachers (authenticated)
    - Route to list all tests separated by teachers
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /tests/disciplines (authenticated)
    - Route to list all tests separated by subjects
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 



## 🏁 Running the application

This project was started with the [Express](https://www.npmjs.com/package/express), so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.


First, clone this repository on your machine:

```
git clone https://github.com/williameiji/repo-provas
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Run the following command to create tables and seed the database

```
npx prisma migrate dev && prisma db seed
```

Finished the process, just start the server
```
npm run dev
```
