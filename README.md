# the altar

## Available Scripts

### Install node modules in 📁 client & 📁 server

`npm i` installs all defined node modules that are required in `/client/package.json` and `/server/package.json`.

Example for 📁 **client**:

```terminal
$  cd client
$  npm i
```

Example for 📁 **server**:

```terminal
$  cd server
$  npm i
```

### Run Dev Environment

```terminal
$  cd client
$  npm run dev
```

This runs the app in the development mode.
You can open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
An Express Server will be deployed at [http://localhost:8080](http://localhost:8080)

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Edit environment variables

Navigate to `client` directory to edit `.env`

```terminal
├── 📁 client
│   ├── .env
```

Navigate to `server` directory to edit `.env`

```terminal
├── 📁 server
│   ├── .env
```
