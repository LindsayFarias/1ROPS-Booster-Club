# 1 ROPS Booster Club
## Purpose
## User Stories
### Navbar 
    * Should have routes to Patches, Treasury, and a Home button
### Homepage
    * Features upcoming events, current booster club chair members, and booster club yearly/monthly toDos
    * Upcoming events should link to details page for event
    * Allows the creation of a new event
### Events Page
    * Shows the details of events: title, date of event and purpose
    * Has a text box to increase the income earned for event
    * Has an option to change the date of event
    * Has the option to add members to the committee
    * Has the option to view the current committee
    * Has the option to view receipts of all transactions made for event
### Patches Page
    * Have all of the current patches as clickable links
    * Have an option to create new patch order
### Individual Patches Page
    * Shows profits from patch, name, and pre-orders
    * Give the option to add members to pre-order
    * Give the option to add re-order information
    * Give the option to update sales information
### Treasury Page
    * Give a balance
    * Show income from patches and events
    * Show receipts
    
## Learning Tool
1. npx create-react-app (app name)
2. Install router so you can enhance the navigation abilities of your app: npm install react-router-dom
3. Install all of your testing framework: npm install --save-dev cypress @testing-library/cypress @testing-library/react @testing-library/user-event @testing-library/dom cypress-jest-adapter
    * npx cypress open will populate a cypress folder with tests and configuration files.
    * make sure you add the following to cypress/support/index.js: import 'cypress-jest-adapter';
    * make sure you add the following to cypress/support/commands.js: import '@testing-library/cypress/add-commands';
    * for jest npm install --save-dev @babel/plugin-syntax-jsx @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime --save @babel/runtime
        * set up a config directory with a CSSStub.js file containing a module.exports of an empty object
        * touch a .babelrc and jest.config.js and input 
        {
            "presets": ["@babel/preset-env", "@babel/preset-react"]
            "plugins": [
                ["@babel/transform-runtime"]
            ]
        }
        module.exports = {
            moduleNameMapper: {
            '\\.(css|less)$': '<rootDir>/config/CSSStub.js'
            }
        };
4. For styling install the following: npm install @material-ui/core @material-ui/icons create-react-class @mui/lab luxon @date-io/luxon

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
