import { Probot } from "probot";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    console.log(context.payload.sender.login);
    console.log(context.payload.sender.id);
  });
};