import { WebhookEvent } from "@octokit/webhooks";
import Event from "../dto/event.dto"


export default class ProbotService {

  disassemblePushContext(context: WebhookEvent) : string {
    // Push is also a 'branch create'
    if (!context.payload.before.split("").some((char : string) => char !== "0")) {
      return "create";
    // Push is also a 'branch delete'
    } else if (!context.payload.after.split("").some((char: string) => char !== "0")) {
      return "delete";
    // default push
    } else {
      return "default";
    }
  }

  private checkForUndefined(values: Array<any>) {
    values.forEach((value) => {
      if (value === undefined) {
        throw new Error(`Undefined value detected in context`);
      }
    })
  }
  public convertPushContextToEventObject(context: WebhookEvent<any>): Event {
    this.checkForUndefined([context.name, context.payload.sender.login, context.payload.sender.type, context.payload.sender.id, context.payload.ref]);
    return {
      name: context.name,
      action: "send", //Pull requests by standard don't have an action attribute, so we mock one
      sender: {
        name: context.payload.sender.login,
        type: context.payload.sender.type,
        id: context.payload.sender.id
      },
      branch: {
        name: context.payload.ref.split('/').pop() // Will look like this 'refs/heads/newBranch', so we need to split it apart (Problem when branch name includes "/") (TODO: refs/heads)
      },
      timestamp: new Date()
    }
  }

  convertPushContextToBranchEventObject(context: WebhookEvent<any>, action : string) {
    return  {
      name: "branch",
      action: action,
      sender: {
        name: context.payload.sender.login,
        type: context.payload.sender.type,
        id: context.payload.sender.id
      },
      branch: {
        name: context.payload.ref.split('/').pop()
      },
      timestamp: new Date()
    }
  }

  /*public convertBranchContextToEventObject(context: WebhookEvent<any>): Event {
    this.checkForUndefined([context.name, context.payload.sender.login, context.payload.sender.type, context.payload.sender.id, context.payload.ref]);
    return  {
      name: "branch", // Context only names this WebhookEvent "create, delete ...", so we need to set it to "branch"
      action: context.name, // In this case, the context-payload-name is actually the action "create, delete ..."
      sender: {
        name: context.payload.sender.login,
        type: context.payload.sender.type,
        id: context.payload.sender.id
      },
      branch: {
        name: context.payload.ref
      },
      timestamp: new Date()
    }
  }*/

  public convertPullRequestContextToEventObject(context: WebhookEvent<any>): Event {
    this.checkForUndefined([context.name, context.payload.sender.login, context.payload.sender.type, context.payload.sender.id, context.payload.pull_request.head.ref ]);
    return  {
      name: context.name,
      action: context.payload.action,
      sender: {
        name: context.payload.sender.login,
        type: context.payload.sender.type,
        id: context.payload.sender.id
      },
      branch: {
        name: context.payload.pull_request.head.ref
      },
      timestamp: new Date()
    }
  }

  public convertIssueContextToEventObject(context: WebhookEvent<any>): Event {
    this.checkForUndefined([context.name, context.payload.sender.login, context.payload.sender.type, context.payload.sender.id]);
    return  {
      name: context.name,
      action: context.payload.action,
      sender: {
        name: context.payload.sender.login,
        type: context.payload.sender.type,
        id: context.payload.sender.id
      },
      timestamp: new Date()
    }
  }
};