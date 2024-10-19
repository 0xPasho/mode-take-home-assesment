# Mode Mobile Challenge

## Proposed solution

This solution provides a fully integrated platform with a really good design with standarized components with accesibility and armonized UX way of handling To-Do list with integration of Polygon to interact
with specific ERC20 and ERC721 contracts.

## Technologies

- NextJs App Routing(v14)
- Typescript
- Tailwind
- Zustand
- Ethers/Wagmi
- Yarn
- NextJS

## Preview

### How Blockchain logic works

https://www.loom.com/share/8734703e0c7d424db3217a8cae78360c

### How To-Do list Interaction works

https://www.loom.com/share/4a4f8956082841e182c67525b671c669

## Decitions

- Auth: I decided to stick with NextAuth to manage authentifications to be able to keep the authentication feature open for future integrations with Oauth or any other similar solution.
- Design: I decided to use Shadcn atomic components as the base for my atomic components, to have all the ownership of how we want the spec of the design to be, and also they are added to standarize all the project colors, ux and structure. Also with this base structure it's really easy to modify the design system to include dark and light mode. Tailwind is another choise included to its simplicity to have the same semantics of how we write CSS.
- NextJS 14(App Routing): Changes the way of structuring a project, making it straight forward to keep all the server logic where it corresponds, making also the SSR fully typed and really fast to avoid user waiting for the data.
- Routes and platform logic: I decided to keep all the site on just one page, with a really simple and intuitive Drawer that let you modify or create a new To-do item. On a real world To-do app you would want to have all the tasks in the same page and not specifically navigating between different screens as it takes you more time to mantain your list of tasks.
- Future Devs: One thing to keep in mind is how next devs are going to incorporate into the platform, this platform has everythig correctly structured, design correctly aligned and standarized, and the general idea of its core fundamentals are documented. This makes it really easy to onboard new developers into this project.

## Characteristics of this solution

- Fully typed solution
- Standardized(Atomic) components across the platform
- Dark/Light theme integration
- Modularized and well-organized code structure
- Accessibility compliance
- Fully responsive design
- Harmonious design
- Real-time data fetching
- Ready for future feature enhancements
- Easy integration to deploy
- Multiple routes and api endpoints

## Install dependencies

```shell
yarn install
```

## Configure environment variables

.env is currently set with all environment variables needed to run the project. Modify it basedo on needs.

```shell
cp .env .env.local
vim .env
```

## Project Structure

```

/src
  env.mjs            - Contains all variables typed for platform
  constants.ts       - Any global variable for app
  /app               - Contains all API and UI routes, integrated using the new Next.js version
  /components/ui     - Houses all standardized atomic components
  /modules           - Each platform topic is organized into a specific folder
    /some-module
      /components    - Contains components specific to that topic
      /utils         - Contains utilities specific to that topic
      /data          - Contains data specific to that topic
      /store         - Contains state management for that topic
      /types         - Contains type definitions for that topic
```

Set the values of the environment variables in the .env file. Currently, there are no values, but this setup will allow for easy configuration in the future. Ensure integration with src/env.mjs for proper typing.

## Routes

The site includes multiple routes to provide comprehensive access to the platform data:

- /login: Route to login with your wallet
- /: The main route, featuring a dashboard with all the To-Do actions.
- /api/polygon/balance/erc20: Get endpoint to retrieve ERC20 information regarding Polygon wallet
- /api/polygon/balance/erc721: Get endpoint to retrieve ERC721 information regarding Polygon wallet

## Running the project

Make sure you have your .env file correctly set up as mentioned in Configure environment variables section.
To run the project in development mode, use:

```sh
yarn dev
```

<span style="color: red">**IMPORTANT NOTE:** I HAD TO USE ngrok TO BE ABLE TO RUN LOCALLY BOTH THE TODOs AND ALSO THE BLOCKCHAIN WALLET LOGIC. AS I'M USING "RAINBOW" WALLET IT REQUIRE HTTPS ONLY SERVERS. TO BE ABLE TO RUN IT PLEASE USE NGROK TOO.</span>

Command to listen API server and Web app service:

```sh
ngrok http 7979 -- <= for api server
ngrok http 3000 -- <= for webapp server
```

This runs the dev script specified in our package.json and will start a server that reloads the page as files are saved. The server typically runs at http://localhost:3000.

## Creating a production build

To create a production build, run:

```sh
yarn build
```

This will generate an optimized build in the ./dist directory.

To serve the production build, use:

```sh
yarn start
```

This will start a server to view the production build.
