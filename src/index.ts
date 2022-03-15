import { Probot } from "probot";
import Event from "./dto/event.dto";
import MongoService from "./service/mongo.service";
import ProbotService from "./service/probot.service";

const probotservice = new ProbotService();
const mongoservice = new MongoService();

const collection_name = "events";

export = async (app: Probot) => {
  await mongoservice.connect();
  
  app.on("push", async (context) => {
    let ev = probotservice.convertPushContextToEventObject(context);
    mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("create", async (context) => {
    if (context.payload.ref_type != "branch") return;
    let ev = probotservice.convertBranchContextToEventObject(context);
    mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("delete", async (context) => {
    if (context.payload.ref_type != "branch") return;
    let ev = probotservice.convertBranchContextToEventObject(context);
    mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("pull_request", async (context) => {
    let ev = probotservice.convertPullRequestContextToEventObject(context);
    mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("pull_request_review", async (context) => {
    let ev = probotservice.convertPullRequestContextToEventObject(context);
    mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("issues", async (context) => {
    let ev = probotservice.convertIssueContextToEventObject(context);
    mongoservice.addOne<Event>(collection_name, ev);
  });

  app.on("issue_comment", async (context) => {
    let ev = probotservice.convertIssueContextToEventObject(context);
    mongoservice.addOne<Event>(collection_name, ev);
  });


  app.onAny(async (context) => {
    console.log(context.name);
    //console.log(context.payload);
  })
};

