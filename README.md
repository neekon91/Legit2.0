[![Stories in Ready](https://badge.waffle.io/HR18-Legit/hrr18-legit.png?label=ready&title=Ready)](https://waffle.io/HR18-Legit/hrr18-legit)
[![Stories in Ready](https://badge.waffle.io/HR18-Legit/hrr18-legit.png?label=ready&title=Ready)](https://waffle.io/HR18-Legit/hrr18-legit)
﻿# hrr18-legit

File structure:

client - all things front-end

    dist - where compiled files are stored

    src - all things react (components, actions, reducers, assets)

        actions - called on certain actions, mainly login, signin, logout, and all form submissions

        assets - contains logo

        components -

            auth - components for login, signup and welcome page (welcome page is what shows when users not logged in)

            dashboard - dashboards are the meat of the front end

                mainDashboard - what users see upon signup or login, shows all user's classes and students

                classDashboard - shows details on a particular class including list of students enrolled and assignments
                for that class

                studentDashboard - shows details on a particular student including list of their assignments

                assignmentDashboard - shows student outcomes for a particular assignment

            forms - all forms to add student, class, assignment, etc.

            headers - two headers, one for when user is logged in and authorized, one for when users are not

            App.jsx - root component, pretty barebones

        constants - hold action type variables, written in separate file to avoid someone mistakenly editing an action type name and breaking the App

        containers - currently empty, containers are components that have access to redux state (dashboard parent components could be moved in here)

        reducers - take care of rendering the new state. After an action is called what gets returned from an action is sent to ALL reducers and if the action type matches a switch case, it's handled there

            -index.js - brings together all reducers to be returned as one large object, rootReducer

        index.js - where our app is rendered using ReactDOM and where we set up our store and middleware

        routes.js - where we handle react-router, set up all our routes and determine which components to load

    styles - holds our css and font awesome

    index.html - links up all our scripts, css and such and barebones html

Server - all things backend

    Config - contains Authentication, middleware, routing for all express requests/response and passport JS strategies

    Database - Controller, Database Config and models

        models - schema for assignment, section, students, and users.

        Controller - the magic happens with database joins! We are using Sequelize as our ORM with PostgreSQL
