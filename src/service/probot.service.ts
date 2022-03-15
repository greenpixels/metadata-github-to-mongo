import { WebhookEvent } from "@octokit/webhooks";
import Event from "../dto/event.dto"

export default class ProbotService {
  public convertPushContextToEventObject(context: WebhookEvent<any>): Event {
    return {
      name: context.name,
      action: "send", //Pull requests by standard don't have an action attribute, so we mock one
      sender: {
        name: context.payload.sender.login,
        type: context.payload.sender.type,
        id: context.payload.sender.id
      },
      branch: {
        name: context.payload.ref.split('/').pop() // Will look like this 'refs/heads/newBranch', so we need to split it apart (Problem when branch name includes "/")
      },
      timestamp: new Date()
    }
  }

  public convertBranchContextToEventObject(context: WebhookEvent<any>): Event {
    return {
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
  }

  public convertPullRequestContextToEventObject(context: WebhookEvent<any>): Event {
    return {
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
    return {
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