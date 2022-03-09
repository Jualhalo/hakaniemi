# Hakaniemi
This app that displays Hakaniemi market hall's monthly electricity spending from the year 2019.
The data is fetched from an external API to the Express server, from where it's requested and displayed by an Angular client app.
The fetched data from the external API is also saved in a .csv file that can be found in the server directory.

The frontend was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.
The server was generated with Express version 4.17.3.

## Install Server

To install the server, go to the hakaniemiServer directory and run `npm install`.
After it's done installing you can run the server with `nodemon server.ts`

## Install Frontend

To install the frontend, go to the hakaniemiFront directory and run `npm install`.
After it's done installing you can run the client app with `ng serve` and navigating to `http://localhost:4200/`

## Build

Run `ng build` in the frontend directory to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` in the server directory to run all server unit tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
