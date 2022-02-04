# Project structure 🏗

<br>

| File or folder            | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `src/index.jsx` | The entry file. This is where we configure the apollo client, set up the "Toast" library, add auth context provider, and render the App into the root DOM node. |
| `src/utils` | Utility functions/components that can be used anywhere in the codebase. |
| `src/pages` | Main application routes components that are mounted depend on the current route there are fetch the individual type of data needed for the functioning of the children's components. It also includes additional static pages, such as a landing page or 404 page. |
| `src/hooks` | Hooks that can be used anywhere in the codebase. |
| `src/components`  | Components are split into smaller modules, their name referring to the parent components. They are containing children of "Pages" components and have mainly presentation roles, don't have complicated logic (except the Menu component). |
| `src/api` | API folder includes a "gql" function, which parses a string of queries and mutations into documents understandable by GraphQL. There are used in useQuery and useMutation hooks. |
| `public` | The public folder contains the static HTML file with a custom meta tag and favicon icons. |