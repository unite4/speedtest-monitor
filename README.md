# Speedtest Monitor
Single page application that displays Speedtest results as a chart.

# Demo
Go to https://speedtest-monitor.unite.solutions and "Sign in with email" using credentials below:

```
Email: demo@unite.solutions
Password: nohejwykop
```

# Setup
Setup requires several steps to be taken. Before you go through, make sure you have installed tools:

* GIT
* Node.js (https://nodejs.org/en/download/)
* YARN (https://yarnpkg.com/lang/en/docs/install/)

## Firebase
First of all Firebase service needs to be set up. Go to https://console.firebase.google.com and choose existing or create a new project.

### Config
1. Go to: Settings > Tab "GENERAL" > Section "Your apps" > "Add Firebase to your web app".
2. Copy configuration from the newly opened window and paste it to the [src/firebase/config.js](blob/master/src/firebase/config.js) file.

### Authentication

#### Enable authentication services
1. Go to: Authentication > Tab "SIGN-IN METHOD".
2. In the section "Sign-in providers" enable:
  * Email/Password
  * Google

#### Add user
1. Go to: Authentication > Tab "USERS" and "ADD USER" by clicking the button.
2. Fill in the form with email and set a new password (these data will allow you to login in the application).
3. Copy the "User UID" of newly created user from the users table.
4. Go to: Database > Tab "DATA".
5. Add "users"  to your database __if does not exist__.
6. Add your newly created UID with "read" attrbute set as "true".

![Adding user](https://github.com/unite4/speedtest-monitor/blob/master/doc/adding-user.gif?raw=true)

### Database
1. Go to: Database > Tab "RULES".
2. Copy and paste JSON:

```json
{
  "rules": {
    "logs": {
      ".indexOn": "date",
      ".read": "root.child('users').child(auth.uid).child('read').val() === true",
      ".write": true
    },
    "users": {
      ".read": "auth != null",
      ".write": false
    }
  }
}
```

3. Publish changes.

### Hosting
1. Go to: Hosting.
2. Click on the "GET STARTED" button.
3. Go through the setup.

## Application
Install dependencies by:

```bash
yarn install
```

And then...

### Publish page on Firebase...

```bash
yarn deploy
```

_This will deploy your page to the Firebase Hosting. Page will be available under https://your-project-name.firebaseio.com._

or...

### Run dev server...

```bash
yarn dev
```

_This will run a server on your local machine: http://localhost:8080._

or...

### Generate static page...

```bash
yarn build
```

_This will generate `dist/` directory where you will find static page ready to publish on own server._
