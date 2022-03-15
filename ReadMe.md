# metadata-github-to-mongo
This is part of my graduation project. The goal of metadata-github-to-mongo is to transfer metadata of a repository retrieved from the GitHub-API (using Probot) into a mongoDB. The data will be saved in a condensed format, using only the object-fields needed for my graduation project.

## Information

#### Layout :
A probot app starts, receiving webhooks for GitHub events and condensing the payload using an Event-interface. The data will be put into a local mongoDB-server-installation. Authenticaion and configuration a saved in a .env-file.
#### npm-packages used :
- typescript
- mongodb
- dotenv
- probot
- babel-jest
- jest
- ts-jest
- smee-client
- @types/node
- @types/jest
- @babel/preset-typescript

#### External References :

- [GitHub API Reference](https://docs.github.com/en/rest/reference)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)

