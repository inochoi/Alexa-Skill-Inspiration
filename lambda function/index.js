const Alexa = require('ask-sdk-core');
const axios = require('axios');

// headers for calling API
const config = {
  headers: {"x-app-id": "38667cab",
            "x-app-key": "23f58160668160e436782cda31e79b14"}
};

// fetches calories on food through API call
const fetchCalories = async (food) => {
  try {
    const { data } = await axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {query: `${food}`}, config);
    return data.foods[0].nf_calories;
  } catch (error) {
    console.error('cannot fetch results', error);
    return "error"
  }
};

// fetches calories burned on exercise(running and walking) through API call
const fetchActivity = async (run, walk) => {
  try {
    const { data } = await axios.post(`https://trackapi.nutritionix.com/v2/natural/exercise`, {query: `i ran ${run} miles and walked ${walk} miles`}, config);
    return data.exercises;
  } catch (error) {
    console.error('cannot fetch results', error);
    return "error"
  }
};

// fetches calories burned on exercise(walking) through API call
const fetchWalk = async (walk) => {
  try {
    const { data } = await axios.post(`https://trackapi.nutritionix.com/v2/natural/exercise`, {query: `i walked ${walk} miles`}, config);
    return data.exercises;
  } catch (error) {
    console.error('cannot fetch results', error);
    return "error"
  }
};

// fetches calories burned on exercise(running) through API call
const fetchRun = async (run) => {
  try {
    const { data } = await axios.post(`https://trackapi.nutritionix.com/v2/natural/exercise`, {query: `i ran ${run} miles`}, config);
    return data.exercises;
  } catch (error) {
    console.error('cannot fetch results', error);
    return "error"
  }
};

// Launch request
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Hi there! I\'m Krispy, your health assistant. I can get you info on calories in food or run activity calculator. Now, what do you want to do?';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard('team krispy', speechText, "https://source.unsplash.com/random/1200×800/?fitness")
      .getResponse();
  },
};

// Call food calories calculator
const LookupFoodIntentHandler = {
  canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LookupFoodIntent';
  },
  
  handle(handlerInput) {
  const speechText = `Ok, tell me what you're eating?`;
  return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard('team krispy', speechText, "https://source.unsplash.com/random/1200×800/?food")
      .getResponse();
  }
};

// Call activity calories calculator
const LookupExerciseIntentHandler = {
  canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LookupExerciseIntent';
  },
  
  handle(handlerInput) {
  const speechText = `Ok, tell me how many mile you ran or walked?`;
  return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withStandardCard('team krispy', speechText, "https://source.unsplash.com/random/1200×800/?fitness")
      .getResponse();
  }
};

// receives user input and returns result through API data (food calories)
const FoodIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'FoodIntent';
  },
  async handle(handlerInput) {
    try {
      var food = handlerInput.requestEnvelope.request.intent.slots.food.value;
      const response = await fetchCalories(food);
      const speechText = `Calories in ${food}: ${Math.floor(response).toString()}`;


      return handlerInput.responseBuilder
        .speak(speechText)
        .withStandardCard('team krispy', speechText, `https://source.unsplash.com/random/1200×800/?${food}`)
        .getResponse();
    } catch (error) {
      console.error(error);
    }
  },
};

// receives user input and returns result through API data (activity - run & walk calories)
const ExerciseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ExerciseIntent';
  },
  async handle(handlerInput) {
    try {
      var run = handlerInput.requestEnvelope.request.intent.slots.run.value;
      var walk = handlerInput.requestEnvelope.request.intent.slots.walk.value;
      const response = await fetchActivity(run, walk);
      const total = response[0].nf_calories + response[1].nf_calories;
      const speechText = `You burned ${Math.floor(response[0].nf_calories)} calories running and burned ${Math.floor(response[1].nf_calories)} calories walking. Total of ${Math.floor(total)} calories. Good job!`;


      return handlerInput.responseBuilder
        .speak(speechText)
        .withStandardCard('team krispy', speechText, "https://source.unsplash.com/random/1200×800/?fitness")
        .getResponse();
    } catch (error) {
      console.error(error);
    }
  },
};

// receives user input and returns result through API data (activity - walk calories)
const WalkIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WalkIntent';
  },
  async handle(handlerInput) {
    try {
      var walk = handlerInput.requestEnvelope.request.intent.slots.walking.value;
      const response = await fetchWalk(walk);
      const speechText = `You burned ${Math.floor(response[0].nf_calories)} calories walking. Great!`;


      return handlerInput.responseBuilder
        .speak(speechText)
        .withStandardCard('team krispy', speechText, "https://source.unsplash.com/random/1200×800/?fitness")
        .getResponse();
    } catch (error) {
      console.error(error);
    }
  },
};

// receives user input and returns result through API data (activity - run calories)
const RunIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RunIntent';
  },
  async handle(handlerInput) {
    try {
      var run = handlerInput.requestEnvelope.request.intent.slots.running.value;
      const response = await fetchRun(run);
      const speechText = `You burned ${Math.floor(response[0].nf_calories)} calories running. Well done!`;


      return handlerInput.responseBuilder
        .speak(speechText)
        .withStandardCard('team krispy', speechText, "https://source.unsplash.com/random/1200×800/?fitness")
        .getResponse();
    } catch (error) {
      console.error(error);
    }
  },
};

// runs when user asks for help
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask to give calories in food or calculate calories burned from exercise';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('team krispy', speechText)
      .getResponse();
  },
};

// runs when user cancels the operation
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('team krispy', speechText)
      .getResponse();
  },
};

// session end handler
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

// error handler
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    LookupFoodIntentHandler,
    LookupExerciseIntentHandler,
    FoodIntentHandler,
    ExerciseIntentHandler,
    WalkIntentHandler,
    RunIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('cookbook/display-directive/v1')
  .lambda();