# Project structure 🏗

<br>

| File or folder            | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `src/index.ts`            | The entry file. This is where Express and Apollo servers are setups, connects to the database, passport auth initialize, etc... |
| `src/interfaces`          | Interfaces are types of objects that never change and are used in multiple places across the codebase. |
| `src/graphql/typeDefs.ts` | TypeDefs defines what types of data a client can read and write from/to API. |
| `src/graphql/resolvers`   | Resolvers listen to clients' queries and mutations, their works with the database to fetch, add, update, or delete data. |
| `src/data`                | It collects (helper) functions that are used in a couple of places across the codebase. For example, data/dataAccess.ts functions provide a low-level layer that directly performs operations on database documents. It is mainly used by resolvers. |
| `src/ MongoDB/models`     | Models are MongoDB schema definitions, there are responsible for creating and reading documents from the database. |
| `Dist` | Typescript compiled version of the application for js es2018. |