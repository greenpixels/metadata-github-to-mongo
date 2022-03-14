# metadata-github-to-mongo
This is part of my graduation project. The goal of github-to-mongo is to transfer metadata of a repository retrieved from the GitHub-API into a mongoDB. The data will be saved in a condensed format, using only the object-fields needed for my graduation project.

## Information

#### Layout :
A ts-node server starts, retrieving necessary data from the GitHub-API using axios. The data will be put into a local mongoDB-server-installation. Authenticaion and configuration a saved in a .env-file.
#### npm-packages used :
- npm typescript
- npm mongodb
- npm dotenv
- npm ts-node
- npm axios
#### External References :

- [GitHub API Reference](https://docs.github.com/en/rest/reference)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)

