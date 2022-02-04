<h3 align="center">Reparify</h3>

<div align="center">The application is built in the MERN stack (Mongo, Express, React, Node). <br/>All coded in Typescript.</div>

<h3 align="center">
  <a href="https://reparify.com/">Live app</a> |
  <a href="https://github.com/JakubMaslanka/Reparify/tree/master/client">Front-end</a> |
  <a href="https://github.com/JakubMaslanka/Reparify/tree/master/server">Back-end</a>
</h3>

## Table of Contents

- [General Info](https://github.com/JakubMaslanka/Reparify#general-information)
- [Technologies Used](https://github.com/JakubMaslanka/Reparify#technologies-used)
- [Presentation](https://github.com/JakubMaslanka/Reparify#presentation)
- [Setup](https://github.com/JakubMaslanka/Reparify#setup)
- [Project Status](https://github.com/JakubMaslanka/Reparify#project-status)
- [Future Plans](https://github.com/JakubMaslanka/Reparify#future-plans)
- [Acknowledgements](https://github.com/JakubMaslanka/Reparify#acknowledgements)
- [License](https://github.com/JakubMaslanka/Reparify#license)
- [Contact](https://github.com/JakubMaslanka/Reparify#contact)

## General Information

Reparify is created for users who own more than one vehicle and/or want to collect repair history for future vehicle sales in one place. Supports notifications of expiring vehicle inspections and insurance. The app allows users to put the vehicle up for sale, thus allowing other users to view the profile of the sold vehicle. Otherwise, users can't access vehicle profiles, which they don't own, unless they have a unique URL containing the vehicle ID. 
Reparify is fully responsive and can be displayed on any device with internet access.



##### The back-end side consists of three services:

- User authentication service

It is based on a session that sends a secured HTTP cookie to the user. The authorization logic is handled by the passport.js library, which provides several strategies. The local one uses GQL mutations and operations to add and get users in/from the database. The Google strategy allows login into an app using the Google services account and a Facebook one that uses a Facebook platform account.

- Picture hosting service

It was created using the graphql-upload. The library helps to upload files by the user in any format into our back-end server and then handle them in GQL mutation resolvers. In the case of my app, the service hosts pictures of vehicles, which the user can add to his vehicle profile. The service processes the uploaded file and saves them in the local memory of the application server machine.  Pictures are available under the endpoint /vehicle_pictures.

- GraphQL service

The wrapper for this complex service is the "apollo-server-express" library. The API of the whole application. It directly communicates with the MongoDB database using mutation and query resolvers. Through them, the application gets and modifies documents in the database. The service is available under the "/graphql" endpoint.



##### The font-end side 
is much less complicated because it simply displays the data provided by the GraphQL API. It is built using the relay approach. The main library allowing to make queries to the API is apollo/client. The entire client app is based on this library. 
Routing is handled by React Router in the recently released version 6. Complex forms are managed by the well-known Formik library.
Client authentication is provided by the Context API, which includes methods to check if the user token stored in the HTTP cookie is valid and to invalidate the token.



The project was coded with the idea of trying new technologies, in this case, Graph Query Language, Apollo tools, and TypeScript. (... and my brother, who owns a small logistics company, a fleet of vehicles, and a mess in documents) I have enjoyed writing code in this technology stack, hence I want to develop it, thus improving Reparify.



> **Credentials for testing account**

> email: github@example.com

> password: secret

## Technologies Used
<br/>
<img align="center" src="https://raw.githubusercontent.com/JakubMaslanka/Reparify/master/client/public/tech-logo.png" alt="Technologies_Logos" />
<br/>
##### Front-end

- React *@17.0.2*
- Apollo client *@3.5.5*
- React Router Dom *@6.0.0*
- Formik *@2.2.9*

##### Styles

- Tailwind CSS *@2.2.19*

##### Back-end 

- Express *@4.17.1*
- Graphql *@15.7.2*
- Apollo Server *@3.5.0*
- Mongoose *@6.0.14*
- Passport *@0.5.0*
- Facebook Oauth *@3.0.0*
- Google Oauth *@2.0.0*

##### Containerization

- Docker
- Docker Compose

##### Reverse Proxy

- Nginx


## Presentation

<small>Presentation gifs are large in size and may take a while to load/be smooth.</small>

##### Login process, show dashboard page, marking the vehicle for sale

[![Gif presentation, may take a long time to load](https://github.com/JakubMaslanka/Reparify/blob/master/client/public/demo1.gif?raw=true)](https://github.com/JakubMaslanka/Reparify/blob/master/client/public/demo1.gif?raw=true)

---

##### Process of creating and editing a vehicle profile

[![Gif presentation, may take a long time to load](https://github.com/JakubMaslanka/Reparify/blob/master/client/public/demo2.gif?raw=true)](https://github.com/JakubMaslanka/Reparify/blob/master/client/public/demo2.gif?raw=true)

---

##### Process of creating and editing a repair entry, show sample workshop pages, application view from a user without vehicles

[![Gif presentation, may take a long time to load](https://github.com/JakubMaslanka/Reparify/blob/master/client/public/demo3.gif?raw=true)](https://github.com/JakubMaslanka/Reparify/blob/master/client/public/demo3.gif?raw=true)


## Setup

- Create a free cloud MongoDB database with MongoDB Atlas services
- `git clone https://github.com/JakubMaslanka/Reparify.git`
- **Create .env file inside server folder with additional params:**
> NODE_ENV=development
> CLIENT_URI=http://localhost:3000
> DOMAIN_NAME=http://localhost:4000
> MONGO_STARTPOINT=mongodb+srv://
> MONGO_USERNAME=`username_with_rights_to_db`
> MONGO_PASSWORD=`password`
> MONGO_ENDPOINT=`remaining_part_of_url_to_db`

- Make sure, you are in project folder and run `yarn run install-dependencies` in terminal
- `yarn run start:server`
- `yarn run start:client` in another terminal tab
- App should now be running on http://localhost:3000/

<small>The App uses OAuth authentication from providers such as Google and Facebook. If any errors occur in the login or user registration process, remove the code related to these two authentication strategies from the `server/src/data/auth.ts` file.</small>


## Project Status

The project is in the **in-progress** state. The current repository shows the alpha version, which provides the main functionality of creating vehicle profiles and adding repair entries to them. However, I have plans to constantly develop new features and improvements.


## Future Plans

Future Plans:

- Add the possibility of creating workshop profiles. An alternative to websites for workshops, they will contain all the necessary information about the company.
- Add a system that verifies user added repairs by requesting some form of repair proof for the app admins/algorithms.
- Possibility to comment and rate workshops by app users. 
- Search vehicles by text for vehicles' VIN number or repair description.
- Add the whole module, allowing to chat between users and workshops.  
- Add e-mail notifications about an upcoming technical check-up and expiring insurance.
- Add confirmation e-mail address process and the possibility of password reminder.
- Add a reCAPTCHA, to vehicles' Vin numbers or some requests to the vehicle owner to provide Vin address.


## Acknowledgements

- Thanks to [@ipenywis](https://github.com/ipenywis) for creating great tutorials that helped me figure out how docker works in practice.
- Many thanks to [@mehowte](https://github.com/mehowte) for creating a [course](https://graphqlmastery.pl/) that got me hooked on GraphQL and showed the power of this technology.


## License

[MIT](https://opensource.org/licenses/MIT)


## Contact

Created by [@JakubMaslanka](https://github.com/JakubMaslanka) - feel free to contact me!