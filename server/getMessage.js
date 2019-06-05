console.log("in process message");

console.log(process.env);

const dialogflow = require('dialogflow');
const uuid = require('uuid');


async function runSample(userInput, projectId = process.env.PROJECT_ID) {
  console.log("in the runSample func");
  console.log("userinput", userInput)
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: userInput,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  return result.fulfillmentText;

  // if (result.intent) {
  //   console.log(`  Intent: ${result.intent.displayName}`);
  // } else {
  //   console.log(`  No intent matched.`);
  // }
}

// runSample();

module.exports = runSample;
