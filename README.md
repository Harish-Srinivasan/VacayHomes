# VacayHomes

A Full Stack Web application for users to reserve and rent properties as well as host new properties. The application has the following functionalities.

* User login and signup: Login/Register a new user to the system.
* Form validation and Check password strength. Store encrypted passwords in database.
* Display properties & search- List all properties and Users will be able to “Search” for a specific city and/or property type.
* Favourites - Users will add properties to their favorite list, access their favorite list and remove properties from the list.
* Rate/Comment - Users will be able to rate a given property. They will also enter their feedback/comments.
* Host Account - Users will be able to sign-up for a host account (Become a host). They will be able to add, update and delete properties them from the system
* Reservations - Users will make reservations and availability is checked
* Cancel Reservations - For users, reservations (both past and future) will be listed along with reservation dates. Cancel the reservation if it is before 48 hours before reservation date/time.


### How to run

Install [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)

For installation in Mac devices, follow these commands

        brew tap mongodb/brew
        brew install mongodb-community@6.0
        sudo mkdir -p /System/Volumes/Data/data/db // create data dir
        sudo chown -R `id -un` /System/Volumes/Data/data/db // giving permission to use folder
        sudo mongod --dbpath /System/Volumes/Data/data/db // this will start the mongod process which listen in default port

Go to the Server folder and run the following commands

        npm i
        nodemon

Go to the client folder and run the following commands

        npm i && npm start
        

### Demo

Watch a [demo](https://drive.google.com/file/d/18VQL4wJmy4q4v6Xxk_n2ido8g2HOH0MY/view?usp=sharing) of the app 




