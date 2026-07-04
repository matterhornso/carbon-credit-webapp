# Getting Started with Carbon Credit Webapp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## IDE

VS Code

## Extensions

#### 1. ES7+ React/Redux/React-Native snippets

Id: dsznajder.es7-react-js-snippets
Description: Extensions for React, React-Native and Redux in JS/TS with ES7+ syntax. Customizable. Built-in integration with prettier.
Version: 4.4.3
Publisher: dsznajder

#### 2. ESLint
Id: dbaeumer.vscode-eslint

Description: Integrates ESLint JavaScript into VS Code.
Version: 2.2.6
Publisher: Microsoft

#### 3. Prettier - Code formatter

Id: esbenp.prettier-vscode
Description: Code formatter using prettier
Version: 9.5.0
Publisher: Prettier

#### 4. Prettier ESLint

Id: rvest.vs-code-prettier-eslint
Description: A Visual Studio Extension to format JavaScript and Typescript code using prettier-eslint package
Version: 5.0.3
Publisher: Rebecca Vest

#### 5. Tabnine AI
Id: TabNine.tabnine-vscode

Description: 👩‍💻🤖 JavaScript, Python, Java, Typescript & all other languages - AI Code completion plugin. Tabnine makes developers more productive by auto-completing their code.
Version: 3.5.38
Publisher: TabNine


#### 6. GitLens — Git supercharged

Id: eamodio.gitlens
Description: Supercharge the Git capabilities built into Visual Studio Code — Visualize code authorship at a glance via Git blame annotations and code lens, seamlessly navigate and explore Git repositories, gain valuable insights via powerful comparison commands, and so much more
Version: 11.4.1
Publisher: Eric Amodio

#### 7. Code Spell Checker

Id: streetsidesoftware.code-spell-checker
Description: Spelling checker for source code
Version: 2.2.5
Publisher: Street Side Software

## Node & npm 

Node- v18\
npm -v8

## Available Scripts

In the project directory, you can run:

### `npm i --force`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run gc component_name component_type`

Creates component folder in type of component folder with\
test, index, interface and component file.\
Usage -\
`npm run gc TestComponent component`\
-`component_name: string` \
-`component_type: string ('page'| 'component' | 'atom')`


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

## Committing to Gitlab

Code will not be pushed until all test cases pass.
After committing your changes, husky will run to check the linting and test cases. If not passed, will return exit code.

## Main Branch

- main
