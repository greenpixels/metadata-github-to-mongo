// Requiring our app implementation
const myProbotApp = require("../index");
const { Probot, ProbotOctokit } = require("probot");
// Requiring our fixtures
const issuesOpenedPayload = require("./fixtures/issues.opened.json");
const branchCreatedPayload = require("./fixtures/branch.created.json");
const pushPayload = require("./fixtures/push.json");
const faultyPushPayload = require("./fixtures/faultyPush.json");

describe("Probot-Testing", () => {
  let probot : typeof Probot;

  beforeEach(async () => {
    probot = new Probot({
      githubToken: "test",
      // Disable throttling & retrying requests for easier testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });
    await myProbotApp(probot, {}, process.env.DB_PROBOT_TESTING_NAME);
  });

  test("Succesfully receive a webhook for an opened issue", async () => {
    expect(probot.receive({ name: "issues", payload: issuesOpenedPayload })).resolves.not.toThrow();
  });

  /*test("Succesfully receive a webhook for a created branch", async () => {
    expect(probot.receive({ name: "create", payload: branchCreatedPayload })).resolves.not.toThrow();
  });*/

  test("Succesfully receive a webhook for a push", async () => {
    expect(probot.receive({ name: "push", payload: pushPayload })).resolves.not.toThrow();
  });

  test("Throw on receiving a faulty push payload", async () => {
    expect(probot.receive({ name: "push", payload: faultyPushPayload })).rejects.toThrow();
  });
});