import { Probot } from "probot";
import Event from "./dto/event.dto";
import MongoService from "./service/mongo.service";
import ProbotService from "./service/probot.service";

const probotservice = new ProbotService();
const mongoservice = new MongoService();

module.exports = async (app: Probot, _router: any, collection_name: string = "events") => { // Probot overwrites the second parameter with a router-object, so we can only use the third parameter
  await mongoservice.connect();
  app.on("push", async (context: any) => {
    switch (probotservice.disassemblePushContext(context)) {
      case "create":
        let evCreate = probotservice.convertPushContextToBranchEventObject(context, "create");
        await mongoservice.addOne<Event>(collection_name, evCreate);
        break;
      case "delete":
        let evDelete = probotservice.convertPushContextToBranchEventObject(context, "delete");
        await mongoservice.addOne<Event>(collection_name, evDelete);
        break;
    }
    
    let ev = probotservice.convertPushContextToEventObject(context);
    await mongoservice.addOne<Event>(collection_name, ev);
  });

  /*app.on("create", async (context: any) => {
    if (context.payload.ref_type != "branch") return;
    let ev = probotservice.convertBranchContextToEventObject(context);
    await mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("delete", async (context : any) => {
    if (context.payload.ref_type != "branch") return;
    let ev = probotservice.convertBranchContextToEventObject(context);
    await mongoservice.addOne<Event>(collection_name, ev);
  });*/

  app.on("pull_request", async (context : any) => {
    let ev = probotservice.convertPullRequestContextToEventObject(context);
    await mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("pull_request_review", async (context : any) => {
    let ev = probotservice.convertPullRequestContextToEventObject(context);
    await mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("issues", async (context: any) => {
    let ev = probotservice.convertIssueContextToEventObject(context);
    await mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("issue_comment", async (context: any) => {
    let ev = probotservice.convertIssueContextToEventObject(context);
    await mongoservice.addOne<Event>(collection_name, ev);
  });
};