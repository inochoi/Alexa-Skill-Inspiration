# Inspiration - Alexa Skill for Health Conscious 

This Alexa skill is for health conscious. Alexa will calculate how many calories are in food and will calculate calories burned from an exercise.

# Features

This is an Amazon Echo skill using the Alexa Skills Kit (ASK) SDK, and can be easily deployed to AWS Lambda


## Example Calls Using the Echo
Here are some sample conversations that you can have with Alexa.

### Example 1
Alexa, I need to look up calories.  
*Ok, tell me what you're eating?*  
how many calories in BigMac  
*Calories in BigMac: 563*

### Example 2
Alexa, i want to know how many calories i burned.  
*Ok, tell me how many mile you ran or walked.*  
i ran 5 miles and walked 2 miles  
*You burned 572 calories running and burned 163 calories walking. Total of 735 calories. Good job!*

# Technologies Used

* [AWS Lambda](https://aws.amazon.com/lambda/). I deployed the source on Lambda to connect with Alexa Skills Kits.
* [Nutritionix API](https://docs.google.com/document/d/1_q-K-ObMTZvO0qUEAxROrN3bwMujwAN25sLHwJzliK0/edit#). This is used to calculate calories in food and calories burned from exercise. <br />
 ** NOTE: An APP ID and API Key is required to use this service.